import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getSettings, setting } from "@/lib/settings";
import { getPriceGroups } from "@/lib/prices";
import { getWorks } from "@/lib/works";
import { LandingTemplate } from "@/components/landing/LandingTemplate";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  path: "/upakovochnaya-lenta",
  title: "Упаковочная лента с логотипом на заказ — сатин, брендированная лента | БИРКИТУТ",
  description:
    "Печать логотипа на упаковочной сатиновой ленте для брендирования подарков, коробок и упаковки одежды. Печать золото, серебро, черный.",
});

export default async function UpakovochnayaLentaPage() {
  const [s, groups, works] = await Promise.all([
    getSettings(),
    getPriceGroups(),
    getWorks(),
  ]);

  const filteredPrices = groups.filter((g) => g.name.toLowerCase().includes("упаковочная лента"));

  return (
    <LandingTemplate
      config={{
        slug: "upakovochnaya-lenta",
        eyebrow: "брендированная лента",
        title: "Упаковочная лента с логотипом на заказ",
        description:
          "Атласная и сатиновая лента с повторяющимся логотипом вашего бренда для оформления заказов, подарков и коробок.",
        features: [
          {
            title: "Премиальный сатиновый блеск",
            text: "Гладкая шелковистая лента придаёт вашей упаковке дорогой эксклюзивный вид.",
          },
          {
            title: "Печать золотом и серебром",
            text: "Нанесение логотипа металлической фольгой (золото, серебро) или четкой черной и цветной краской.",
          },
          {
            title: "В рулонах удобного метража",
            text: "Поставляется в рулонах. Намотка от 50 метров.",
          },
        ],
        prices: filteredPrices,
        works: works.slice(0, 8),
        faqItems: [
          {
            q: "Какая ширина упаковочной ленты популярна?",
            a: "Самые ходовые ширины — 15 мм и 20 мм. Они подходят для обвязки коробок одежды и подарков.",
          },
        ],
        phone: setting(s, "site.phone"),
        email: setting(s, "site.email"),
        address: setting(s, "site.address"),
      }}
    />
  );
}
