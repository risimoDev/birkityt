import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getSettings, setting } from "@/lib/settings";
import { getPriceGroups } from "@/lib/prices";
import { getWorks } from "@/lib/works";
import { LandingTemplate } from "@/components/landing/LandingTemplate";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  path: "/silikonovye-birki",
  title: "Силиконовые бирки для одежды на заказ — эластичные и гипоаллергенные | БИРКИТУТ",
  description:
    "Печать прозрачных и матовых силиконовых бирок для спортивной одежды, купальников, худи и трикотажа от 30 шт. Не боятся воды, гипоаллергенны.",
});

export default async function SilikonovyeBirkiPage() {
  const [s, groups, works] = await Promise.all([
    getSettings(),
    getPriceGroups(),
    getWorks(),
  ]);

  const filteredPrices = groups.filter((g) => g.name.toLowerCase().includes("силикон"));

  return (
    <LandingTemplate
      config={{
        slug: "silikonovye-birki",
        eyebrow: "силиконовые бирки",
        title: "Силиконовые бирки для одежды на заказ",
        description:
          "Современные эластичные бирки из гипоаллергенного силикона. Отличный выбор для спортивной одежды, купальников, худи и верхнего трикотажа.",
        features: [
          {
            title: "Эластичность и прочность",
            text: "Силикон легко тянется вместе с тканью и моментально возвращает форму. Не рвется и не деформируется.",
          },
          {
            title: "100% влагостойкость",
            text: "Не впитывает воду и пот, идеален для купальников, фитнес-одежды, дождевиков и курок.",
          },
          {
            title: "Стильный матовый и прозрачный вид",
            text: "Выглядит технологично и современно. Печать черным, белым или цветным логотипом.",
          },
        ],
        prices: filteredPrices,
        works: works.slice(0, 8),
        faqItems: [
          {
            q: "Как пришиваются силиконовые бирки?",
            a: "Силикон пришивается обычной прямой строчкой по краю или за два верхних угла. Машинка легко пробивает материал.",
          },
          {
            q: "Не вызывает ли силикон аллергию?",
            a: "Мы используем мягкий медицинский и пищевой силикон, который полностью гипоаллергенен и приятен к телу.",
          },
        ],
        phone: setting(s, "site.phone"),
        email: setting(s, "site.email"),
        address: setting(s, "site.address"),
      }}
    />
  );
}
