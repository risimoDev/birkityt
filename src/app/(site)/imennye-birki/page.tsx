import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getSettings, setting } from "@/lib/settings";
import { getPriceGroups } from "@/lib/prices";
import { LandingTemplate } from "@/components/landing/LandingTemplate";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  path: "/imennye-birki",
  title: "Именные бирки для детского сада и школы на заказ — комплекты | БИРКИТУТ",
  description:
    "Готовые комплекты именных бирок на одежду и обувь в детский сад и школу. Гипоаллергенно, стойко к стирке. Готовый комплект от 510 ₽.",
});

export default async function ImennyeBirkiPage() {
  const [s, groups] = await Promise.all([
    getSettings(),
    getPriceGroups(),
  ]);

  const filteredPrices = groups.filter((g) => g.name.toLowerCase().includes("именных"));

  return (
    <LandingTemplate
      config={{
        slug: "imennye-birki",
        eyebrow: "для детского сада",
        title: "Именные бирки для детского сада и школы",
        description:
          "Персональные вшивные и термоклеевые бирки с именем и фамилией ребёнка, чтобы одежда и вещи не терялись в детском саду, секциях и школе.",
        features: [
          {
            title: "Не теряется одежда",
            text: "Воспитатели и педагоги сразу видят, кому принадлежит кофта, куртка, обувь или спортивная форма.",
          },
          {
            title: "Гипоаллергенная хлопковая основа",
            text: "Не раздражает нежную детскую кожу, не вызывает зуда и дискомфорта.",
          },
          {
            title: "Выдерживает 50+ стирок",
            text: "Надпись не тускнеет и не размазывается в стиральной машине.",
          },
        ],
        prices: filteredPrices,
        faqItems: [
          {
            q: "Что входит в комплект именных бирок?",
            a: "Комплект включает набор именных бирок с фамилией, именем ребенка и картинкой на выбор.",
          },
        ],
        phone: setting(s, "site.phone"),
        email: setting(s, "site.email"),
        address: setting(s, "site.address"),
      }}
    />
  );
}
