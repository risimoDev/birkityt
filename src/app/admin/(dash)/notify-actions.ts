"use server";

import { requireSession } from "@/lib/auth-helpers";
import { sendTelegram } from "@/lib/telegram";

/**
 * Sends a test message to the configured Telegram chat and reports what
 * actually happened. Without it the only way to check the integration is to
 * submit a fake order and hope.
 */
export async function sendTestTelegram(): Promise<{
  ok: boolean;
  message: string;
}> {
  const session = await requireSession();
  const who = session.user.email || "админка";

  const res = await sendTelegram(
    `🔔 <b>Проверка уведомлений</b>\n\nЕсли вы видите это сообщение, заявки с сайта будут приходить сюда.\n\nОтправлено из админки: ${who}`,
  );

  return res.ok
    ? { ok: true, message: "Сообщение отправлено — проверьте чат в Telegram." }
    : { ok: false, message: res.error ?? "Не удалось отправить сообщение" };
}
