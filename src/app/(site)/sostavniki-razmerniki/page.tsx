import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getSettings, setting } from "@/lib/settings";
import { getPriceGroups } from "@/lib/prices";
import { getWorks } from "@/lib/works";
import { LandingTemplate } from "@/components/landing/LandingTemplate";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  path: "/sostavniki-razmerniki",
  title: "Составники и размерники для одежды на заказ — печать от 30 шт | БИРКИТУТ",
  description:
    "Печать составников и размерников для одежды на нейлоне, сатине и силиконе. Значки ухода, состав ткани, размеры XS-3XL. Срок 2–3 дня.",
});

export default async function SostavnikiPage() {
  const [s, groups, works] = await Promise.all([
    getSettings(),
    getPriceGroups(),
    getWorks(),
  ]);

  return (
    <LandingTemplate
      config={{
        slug: "sostavniki-razmerniki",
        eyebrow: "составники и размерники",
        title: "Составники и размерники для одежды",
        description:
          "Вшивные ярлыки с указанием состава ткани, символами ухода и размерами изделий. Изготавливаются из нейлона, премиум-сатина или прозрачного силикона.",
        features: [
          {
            title: "Все размеры в одном тираже",
            text: "Вы можете разбить один общий тираж на несколько линейных размеров (XS, S, M, L, XL) без наценки.",
          },
          {
            title: "Стандартные символы ухода",
            text: "Разместим корректные значки стирки, глажки, сушки и отбеливания в соответствии с ГОСТ и ТР ТС.",
          },
          {
            title: "Мягкий сатин не режет кожу",
            text: "Сатиновые составники гипоаллергенны и не вызывают раздражения на шее и теле при носке.",
          },
        ],
        prices: groups.filter((g) => ["Премиум сатин с тканым краем", "Силикон"].includes(g.name)),
        works: works.slice(0, 8),
        faqItems: [
          {
            q: "Можно ли разбить тираж на разные размеры?",
            a: "Да! Например, в тираж 500 штук вы можете включить по 100 шт каждого размера S, M, L, XL, XXL.",
          },
        ],
        phone: setting(s, "site.phone"),
        email: setting(s, "site.email"),
        address: setting(s, "site.address"),
      }}
    />
  );
}
