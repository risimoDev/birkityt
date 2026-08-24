import { env } from "@/lib/env";

/**
 * MAX Bot API — https://dev.max.ru/docs-api
 *
 * Two details differ from most bot APIs and are easy to get wrong:
 *  - the token goes in a bare `Authorization` header, with no "Bearer" prefix,
 *    and query-parameter auth is no longer supported;
 *  - the recipient (`chat_id`) is a QUERY parameter, while the text lives in
 *    the JSON body.
 */

const API_BASE = "https://platform-api2.max.ru";

/** MAX rejects anything longer; leave room for the header line we prepend. */
const MAX_TEXT_LENGTH = 4000;

export function isMaxConfigured(): boolean {
  return Boolean(env.MAX_BOT_TOKEN && env.MAX_CHAT_ID);
}

/** Why a send failed, so the admin diagnostic can show something useful. */
export type SendResult = { ok: boolean; error?: string };

/**
 * Sends an HTML-formatted message to the configured MAX chat.
 * Never throws — a notification must not break the request that triggered it.
 */
export async function sendMax(text: string): Promise<SendResult> {
  if (!isMaxConfigured()) {
    return { ok: false, error: "MAX_BOT_TOKEN или MAX_CHAT_ID не заданы" };
  }

  const body = text.length > MAX_TEXT_LENGTH
    ? text.slice(0, MAX_TEXT_LENGTH - 1) + "…"
    : text;

  try {
    const url = new URL("/messages", API_BASE);
    url.searchParams.set("chat_id", String(env.MAX_CHAT_ID));
    url.searchParams.set("disable_link_preview", "true");

    const res = await fetch(url, {
      method: "POST",
      headers: {
        // No "Bearer" — MAX expects the raw token.
        Authorization: String(env.MAX_BOT_TOKEN),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: body, format: "html", notify: true }),
      // Do not let a slow API hang the visitor's form submission.
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      const raw = await res.text();
      console.error("sendMax failed:", res.status, raw);
      let detail = raw;
      try {
        const parsed = JSON.parse(raw) as { message?: string; code?: string };
        if (parsed.message) detail = parsed.message;
      } catch {
        /* not JSON — keep the raw body */
      }
      return { ok: false, error: `MAX ответил ${res.status}: ${detail}` };
    }
    return { ok: true };
  } catch (err) {
    const message = (err as Error).message;
    console.error("sendMax failed:", message);
    return { ok: false, error: `Сеть или таймаут: ${message}` };
  }
}

export type BotInfo = { name?: string; username?: string };

/** GET /me — used by the admin diagnostic to prove the token is valid. */
export async function getMaxBotInfo(): Promise<
  { ok: true; bot: BotInfo } | { ok: false; error: string }
> {
  if (!env.MAX_BOT_TOKEN) {
    return { ok: false, error: "MAX_BOT_TOKEN не задан" };
  }
  try {
    const res = await fetch(new URL("/me", API_BASE), {
      headers: { Authorization: String(env.MAX_BOT_TOKEN) },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      return { ok: false, error: `MAX ответил ${res.status}` };
    }
    const bot = (await res.json()) as BotInfo;
    return { ok: true, bot };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}
