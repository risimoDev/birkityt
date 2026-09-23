import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getSettings, setting } from "@/lib/settings";
import { getPriceGroups } from "@/lib/prices";
import { getWorks } from "@/lib/works";
import { LandingTemplate } from "@/components/landing/LandingTemplate";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  path: "/navesnye-birki",
  title: "Навесные картонные бирки для одежды на заказ — белые и крафтовые | БИРКИТУТ",
  description:
    "Печать навесных бирок и ярлыков из плотного картона с люверсами и биркодержателями от 30 шт. Односторонняя и двусторонняя печать за 2–3 дня.",
});

export default async function NavesnyeBirkiPage() {
  const [s, groups, works] = await Promise.all([
    getSettings(),
    getPriceGroups(),
    getWorks(),
  ]);

  const filteredPrices = groups.filter((g) =>
    ["Картон", "Бирко-держатель"].some((n) => g.name.includes(n)),
  );

  return (
    <LandingTemplate
      config={{
        slug: "navesnye-birki",
        eyebrow: "картонные ярлыки",
        title: "Навесные картонные бирки на заказ",
        description:
          "Плотные фирменные карточки с отверстием для крепежа на шнурке или пластиковом биркодержателе. Завершающий штрих презентации вашей одежды.",
        features: [
          {
            title: "Плотный картон 300–350 г/м²",
            text: "Белый или крафтовый картон с четкой печатью. Держат форму и приятно ощущаются в руках покупателя.",
          },
          {
            title: "С отверстием и биркодержателями",
            text: "Поставляем бирки с уже вырубленным отверстием под люверс или микропломбу. Комплектуем держателями.",
          },
          {
            title: "Односторонняя и двусторонняя печать",
            text: "На лицевой стороне — логотип бренда, на обороте — состав, артикул, штрихкод Wildberries / Ozon и цена.",
          },
        ],
        prices: filteredPrices,
        works: works.slice(0, 8),
        faqItems: [
          {
            q: "Есть ли в наличии биркодержатели?",
            a: "Да, вы можете сразу заказать пластиковые пломбы-держатели (черные или белые) к вашему тиражу картонных бирок.",
          },
        ],
        phone: setting(s, "site.phone"),
        email: setting(s, "site.email"),
        address: setting(s, "site.address"),
      }}
    />
  );
}
