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
# NEXT_PUBLIC_* values are inlined into the client bundle by `next build`,
# so they must be present here — passing them at runtime has no effect.
ARG NEXT_PUBLIC_YANDEX_METRIKA_ID=""
ENV NEXT_PUBLIC_YANDEX_METRIKA_ID=$NEXT_PUBLIC_YANDEX_METRIKA_ID
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

# platform-api2.max.ru is signed by the Russian Trusted Root CA, which is in
# neither Alpine's ca-certificates nor Node's bundled store. Without this,
# every notification fails with UNABLE_TO_GET_ISSUER_CERT_LOCALLY.
# NODE_EXTRA_CA_CERTS adds it on top of the defaults rather than replacing them.
COPY certs/russian-trusted-ca.pem /etc/ssl/certs/russian-trusted-ca.pem
ENV NODE_EXTRA_CA_CERTS=/etc/ssl/certs/russian-trusted-ca.pem

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
