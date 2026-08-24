"use server";

import { requireSession } from "@/lib/auth-helpers";
import { getMaxBotInfo, sendMax } from "@/lib/max";

/**
 * Sends a test message to the configured MAX chat and reports what actually
 * happened. Without it the only way to check the integration is to submit a
 * fake order and hope.
 */
export async function sendTestMax(): Promise<{
  ok: boolean;
  message: string;
}> {
  const session = await requireSession();
  const who = session.user.email || "админка";

  // Check the token first: "chat not found" and "bad token" are very different
  // problems, and the raw send cannot tell them apart.
  const info = await getMaxBotInfo();
  if (!info.ok) {
    return { ok: false, message: `Токен не принят: ${info.error}` };
  }

  const res = await sendMax(
    `🔔 <b>Проверка уведомлений</b>\n\nЕсли вы видите это сообщение, заявки с сайта будут приходить сюда.\n\nОтправлено из админки: ${who}`,
  );

  const bot = info.bot.username ? `@${info.bot.username}` : (info.bot.name ?? "бот");
  return res.ok
    ? { ok: true, message: `Отправлено от имени ${bot} — проверьте чат в MAX.` }
    : { ok: false, message: res.error ?? "Не удалось отправить сообщение" };
}
