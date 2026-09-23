import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getSettings, setting } from "@/lib/settings";
import { getPriceGroups } from "@/lib/prices";
import { getWorks } from "@/lib/works";
import { LandingTemplate } from "@/components/landing/LandingTemplate";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  path: "/nakleyki",
  title: "Наклейки и стикеры с логотипом на заказ — виниловые, матовые, глянцевые | БИРКИТУТ",
  description:
    "Изготовление наклеек и стикеров с логотипом бренда для упаковки и одежды. Любые формы: круг, квадрат, фигурная плоттерная резка.",
});

export default async function NakleykiPage() {
  const [s, groups, works] = await Promise.all([
    getSettings(),
    getPriceGroups(),
    getWorks(),
  ]);

  const filteredPrices = groups.filter((g) => g.name.toLowerCase().includes("наклейки"));

  return (
    <LandingTemplate
      config={{
        slug: "nakleyki",
        eyebrow: "стикеры и наклейки",
        title: "Наклейки и стикеры с логотипом на заказ",
        description:
          "Фирменные виниловые и бумажные наклейки для запечатывания упаковки, брендирования коробок, пакетов и подарков клиентам.",
        features: [
          {
            title: "Фигурная контурная резка",
            text: "Изготовим наклейки любой формы: круглые стикерпаки, прямоугольники, овалы или по сложному контуру логотипа.",
          },
          {
            title: "Водостойкий винил и бумага",
            text: "Виниловые стикеры не боятся влаги и механических повреждений, наклеиваются на любую гладкую поверхность.",
          },
          {
            title: "Золотое и серебряное тиснение",
            text: "Печать черным, цветным или фольгированным нанесением (золото/серебро/голография) на белом, крафтовом или прозрачном фоне.",
          },
        ],
        prices: filteredPrices,
        works: works.slice(0, 8),
        faqItems: [
          {
            q: "Какой минимальный размер наклейки?",
            a: "Мы изготавливаем наклейки диаметром от 2х2 см для упаковок и крафт-пакетов.",
          },
        ],
        phone: setting(s, "site.phone"),
        email: setting(s, "site.email"),
        address: setting(s, "site.address"),
      }}
    />
  );
}
