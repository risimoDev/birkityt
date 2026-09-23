import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getSettings, setting } from "@/lib/settings";
import { getPriceGroups } from "@/lib/prices";
import { getWorks } from "@/lib/works";
import { LandingTemplate } from "@/components/landing/LandingTemplate";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  path: "/tkanevye-birki",
  title: "Тканевые бирки для одежды на заказ — премиум сатин, репс, хлопок | БИРКИТУТ",
  description:
    "Изготовление тканевых бирок и этикеток для брендов одежды от 30 шт. Премиум сатин с тканым краем, хлопковая текстура, репсовая лента. Печать за 2–3 дня.",
});

export default async function TkanevyeBirkiPage() {
  const [s, groups, works] = await Promise.all([
    getSettings(),
    getPriceGroups(),
    getWorks(),
  ]);

  const filteredPrices = groups.filter((g) =>
    ["Премиум сатин с тканым краем", "Матовый сатин", "Хлопок", "Репсовая лента"].some((name) =>
      g.name.includes(name),
    ),
  );

  return (
    <LandingTemplate
      config={{
        slug: "tkanevye-birki",
        eyebrow: "тканевые бирки",
        title: "Тканевые бирки для одежды на заказ",
        description:
          "Тканые, сатиновые и хлопковые этикетки премиального качества для брендирования любой одежды. Подготовим макет, напечатаем и отгрузим за 2–3 дня.",
        features: [
          {
            title: "Мягкость и комфорт",
            text: "Сатиновые и хлопковые ленты с обработанным или тканым краем не колят кожу и идеально подходят для нательного белья и повседневной одежды.",
          },
          {
            title: "Стойкость печати",
            text: "Специальная технология термотрансферной печати сохраняет четкость мелких шрифтов и логотипов даже при многократных стирках при 60°C.",
          },
          {
            title: "Любая ширина и тип нарезки",
            text: "Ширина ленты от 10 мм до 40 мм. Возможна поставка в рулоне или готовой нарезкой под вшивку в шов или флажком.",
          },
        ],
        prices: filteredPrices,
        works: works.slice(0, 8),
        faqItems: [
          {
            q: "Какая лента лучше всего подходит для вшивки в шов?",
            a: "Для вшивки в воротник или боковой шов лучше всего подходит премиум-сатин с тканым краем — он не осыпается и очень приятен к телу.",
          },
          {
            q: "Минимальный тираж тканевых бирок?",
            a: "Минимальный тираж составляет всего от 30 штук на позицию. Минимальная сумма заказа — 1000 ₽.",
          },
        ],
        phone: setting(s, "site.phone"),
        email: setting(s, "site.email"),
        address: setting(s, "site.address"),
      }}
    />
  );
}
