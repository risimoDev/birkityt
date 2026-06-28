import { prisma } from "@/lib/db";
import { cache } from "react";

export type SettingMap = Record<string, string>;

const DEFAULTS: SettingMap = {
  "site.phone": "+7 (952) 645-22-71",
  "site.phoneRaw": "79526452271",
  "site.email": "k.redkousov@inbox.ru",
  "site.address": "г. Пермь, ул. Кронштадтская, 39А",
  "site.hours": "Пн–Пт 10:00–18:00 (Пермь)",
  "social.telegram": "https://t.me/Birkityt",
  "social.vk": "https://vk.com/birkityt",
  "social.whatsapp": "https://api.whatsapp.com/send?phone=79526452271",
  "seo.title": "БИРКИТУТ — изготовление бирок для одежды на заказ",
  "seo.description":
    "Изготовление бирок для одежды на тканях и силиконе. Картонные бирки. Высокое качество и индивидуальный подход.",
  "seo.keywords":
    "бирки для одежды, тканевые бирки, силиконовые бирки, картонные бирки, изготовление бирок",
  "seo.canonical": "https://birkityt.ru",
  "seo.themeColor": "#A1B5D8",
};

export const getSettings = cache(async (): Promise<SettingMap> => {
  try {
    const rows = await prisma.setting.findMany();
    const map = Object.fromEntries(rows.map((r) => [r.key, r.value]));
    return { ...DEFAULTS, ...map };
  } catch {
    return { ...DEFAULTS };
  }
});

export function setting(map: SettingMap, key: string, fallback = ""): string {
  const v = map[key] ?? DEFAULTS[key];
  return v === undefined || v === "" ? fallback : v;
}
