# syntax=docker/dockerfile:1

# --- Dependencies ---
FROM node:22-alpine AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat openssl
COPY package.json package-lock.json* ./
COPY prisma ./prisma
RUN npm ci

# --- Builder ---
FROM node:22-alpine AS builder
WORKDIR /app
RUN apk add --no-cache libc6-compat openssl
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Build-time placeholders so env validation passes during `next build`.
# Real values are injected at runtime via docker-compose.
ENV DATABASE_URL="postgresql://build:build@localhost:5432/build?schema=public" \
    AUTH_SECRET="build-time-placeholder-override-at-runtime" \
    NODE_ENV="production"
RUN npx prisma generate
RUN npm run build

# --- Tools (one-off migrations & seeding; has dev deps, scripts, seed-data) ---
FROM builder AS tools
ENV NODE_ENV=production
CMD ["npx", "prisma", "migrate", "deploy"]

# --- Runner ---
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN apk add --no-cache openssl \
  && addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# Prisma Client runtime (generated client + query engine). The Prisma CLI and
# migrations are not needed here — they run in the `tools` container.
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/package.json ./package.json

RUN mkdir -p /app/uploads && chown -R nextjs:nodejs /app/uploads

USER nextjs
EXPOSE 3000
ENV PORT=3000 HOSTNAME=0.0.0.0

# Start the standalone server. Database migrations are applied separately by
# the `tools` container (see scripts/install.sh and scripts/deploy.sh).
CMD ["node", "server.js"]
