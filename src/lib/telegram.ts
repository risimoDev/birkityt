import { env } from "@/lib/env";

export function isTelegramConfigured(): boolean {
  return Boolean(env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID);
}

/**
 * Sends an HTML message to the configured Telegram chat.
 * Returns true on success, false if not configured or on error. Never throws.
 */
export async function sendTelegram(text: string): Promise<boolean> {
  if (!isTelegramConfigured()) return false;
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
      console.error("sendTelegram failed:", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("sendTelegram failed:", (err as Error).message);
    return false;
  }
}
