/**
 * Fixed-window rate limiter, in process memory.
 *
 * The site runs as a single web container, so a shared store would be extra
 * moving parts for no gain. The trade-off is that counters reset on deploy —
 * acceptable for slowing down brute force and form spam, not a substitute for
 * a WAF.
 */

type Entry = { count: number; resetAt: number };

const buckets = new Map<string, Entry>();

/** Drop expired entries so a flood of unique keys cannot grow the map forever. */
function sweep(now: number) {
  if (buckets.size < 5000) return;
  for (const [key, entry] of buckets) {
    if (entry.resetAt <= now) buckets.delete(key);
  }
}

export type RateLimitResult = {
  ok: boolean;
  /** Seconds until the window resets; 0 when the request is allowed. */
  retryAfter: number;
};

export function rateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number },
): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const entry = buckets.get(key);
  if (!entry || entry.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }

  entry.count += 1;
  if (entry.count > limit) {
    return { ok: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }
  return { ok: true, retryAfter: 0 };
}

/** Forget a key — used after a successful login, so one typo costs nothing. */
export function resetRateLimit(key: string): void {
  buckets.delete(key);
}

/**
 * Caller IP as seen behind Caddy. Caddy sets X-Forwarded-For and appends to
 * any client-supplied value, so the LAST entry is the one it observed and the
 * only one a client cannot forge.
 */
export function clientIp(headers: Headers): string {
  const xff = headers.get("x-forwarded-for");
  if (xff) {
    const parts = xff.split(",").map((p) => p.trim()).filter(Boolean);
    if (parts.length > 0) return parts[parts.length - 1];
  }
  return headers.get("x-real-ip") ?? "unknown";
}
