import { env } from "@/lib/env";

export function isTelegramConfigured(): boolean {
  return Boolean(env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID);
}

/** Why a send failed, so the admin diagnostic can show something useful. */
export type SendResult = { ok: boolean; error?: string };

/**
 * Sends an HTML message to the configured Telegram chat.
 * Never throws — a notification must not break the request that triggered it.
 */
export async function sendTelegram(text: string): Promise<SendResult> {
  if (!isTelegramConfigured()) {
    return { ok: false, error: "TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID не заданы" };
  }
  try {
    const res = await fetch(
      `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: env.TELEGRAM_CHAT_ID,
          text,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
        // don't let a slow Telegram API hang the request forever
        signal: AbortSignal.timeout(8000),
      },
    );
    if (!res.ok) {
      const body = await res.text();
      console.error("sendTelegram failed:", res.status, body);
      // Telegram answers with JSON carrying a human-readable description.
      let detail = body;
      try {
        const parsed = JSON.parse(body) as { description?: string };
        if (parsed.description) detail = parsed.description;
      } catch {
        /* not JSON — keep the raw body */
      }
      return { ok: false, error: `Telegram ответил ${res.status}: ${detail}` };
    }
    return { ok: true };
  } catch (err) {
    const message = (err as Error).message;
    console.error("sendTelegram failed:", message);
    return { ok: false, error: `Сеть или таймаут: ${message}` };
  }
}
