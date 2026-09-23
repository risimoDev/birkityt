import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getSettings, setting } from "@/lib/settings";
import { getPriceGroups } from "@/lib/prices";
import { getWorks } from "@/lib/works";
import { LandingTemplate } from "@/components/landing/LandingTemplate";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  path: "/etiketki-dlya-odezhdy",
  title: "Этикетки и лейблы для одежды на заказ — печать от 30 шт | БИРКИТУТ",
  description:
    "Фирменные тканевые, силиконовые и картонные этикетки для бренда одежды. Индивидуальный дизайн, быстрая печать за 2–3 дня.",
});

export default async function EtiketkiPage() {
  const [s, groups, works] = await Promise.all([
    getSettings(),
    getPriceGroups(),
    getWorks(),
  ]);

  return (
    <LandingTemplate
      config={{
        slug: "etiketki-dlya-odezhdy",
        eyebrow: "этикетки и лейблы",
        title: "Этикетки и лейблы для одежды на заказ",
        description:
          "Полный спектр брендирования швейной продукции: тканые лейблы, сатиновые и силиконовые этикетки, картонные ярлыки и составники.",
        features: [
          {
            title: "Под любой тип одежды",
            text: "Для худи, футболок, нижнего белья, верхней одежды, спецодежды и детских вещей.",
          },
          {
            title: "Соответствие ГОСТ и маркетплейсам",
            text: "Разместим обязательную информацию по уходу, знаки стирки, штрихкоды Честного Знака / WB / Ozon.",
          },
          {
            title: "Помощь с макетом",
            text: "Если у вас нет готового вектора — наш дизайнер подготовит правильный технический макет бесплатно при заказе.",
          },
        ],
        prices: groups.slice(0, 4),
        works: works.slice(0, 8),
        faqItems: [
          {
            q: "Как заказать комплект этикеток?",
            a: "Вы можете заказать сразу составники, размерники и картонные навесные бирки в едином стиле вашего бренда.",
          },
        ],
        phone: setting(s, "site.phone"),
        email: setting(s, "site.email"),
        address: setting(s, "site.address"),
      }}
    />
  );
}
