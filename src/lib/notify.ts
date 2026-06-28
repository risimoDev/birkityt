import { sendMail } from "@/lib/mailer";
import { sendTelegram } from "@/lib/telegram";
import { formatRub, type Quote } from "@/lib/pricing";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

type Contact = {
  name: string;
  phone: string;
  email?: string | null;
  message?: string | null;
  contactMethod?: string | null;
};

type CalcDetails = {
  group: string;
  variant: string;
  quantity: number;
  length?: string | null;
  fraying: boolean;
  quote: Quote;
};

function rows(pairs: Array<[string, string | null | undefined]>): {
  html: string;
  text: string;
} {
  const visible = pairs.filter(([, v]) => v != null && v !== "");
  const html = visible
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#475569">${esc(k)}</td><td style="padding:4px 0"><b>${esc(String(v))}</b></td></tr>`)
    .join("");
  const text = visible.map(([k, v]) => `${k}: ${v}`).join("\n");
  return { html: `<table>${html}</table>`, text };
}

/** Fire both channels in parallel; resolves to which succeeded. Never throws. */
async function dispatch(subject: string, html: string, tgText: string) {
  const results = await Promise.allSettled([
    sendMail(subject, html),
    sendTelegram(tgText),
  ]);
  return {
    email: results[0].status === "fulfilled" && results[0].value,
    telegram: results[1].status === "fulfilled" && results[1].value,
  };
}

export async function notifyContact(c: Contact) {
  const { html, text } = rows([
    ["Имя", c.name],
    ["Телефон", c.phone],
    ["Почта", c.email],
    ["Способ связи", c.contactMethod],
    ["Сообщение", c.message],
  ]);
  const subject = `🟦 Заявка с сайта — ${c.name}`;
  const emailHtml = `<h2>Новая заявка (контактная форма)</h2>${html}`;
  const tg = `🟦 <b>Заявка с сайта</b>\n\n${text}`;
  return dispatch(subject, emailHtml, tg);
}

export async function notifyCalc(c: Contact, d: CalcDetails) {
  const { html, text } = rows([
    ["Материал", d.group],
    ["Вариант", d.variant],
    ["Тираж", `${d.quantity.toLocaleString("ru-RU")} шт`],
    ["Длина", d.length],
    ["Обработка от осыпания", d.fraying ? "да" : null],
    ["Цена за штуку", formatRub(d.quote.unitTotal)],
    ["Ориентировочно", formatRub(d.quote.total)],
    ["—", "—"],
    ["Имя", c.name],
    ["Телефон", c.phone],
    ["Почта", c.email],
    ["Способ связи", c.contactMethod],
    ["Сообщение", c.message],
  ]);
  const subject = `🧮 Заявка из калькулятора — ${formatRub(d.quote.total)}`;
  const emailHtml = `<h2>Новая заявка (калькулятор)</h2>${html}`;
  const tg = `🧮 <b>Заявка из калькулятора</b>\n\n${text}`;
  return dispatch(subject, emailHtml, tg);
}
