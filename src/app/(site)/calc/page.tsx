import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/site/PageHeader";
import { Calculator } from "@/components/calc/Calculator";
import { getPriceGroups } from "@/lib/prices";
import { getCalcConfig } from "@/lib/calc-config";
import { getContent, pick } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  path: "/calc",
  title: "Калькулятор стоимости бирок для одежды | БИРКИТУТ Пермь",
  description:
    "Посчитайте цену бирок за минуту: выберите материал, ширину и тираж — увидите стоимость и сразу отправите заявку. Тираж от 30 шт, изготовление за 2–3 дня.",
});

export default async function CalcPage() {
  const [groups, content, config] = await Promise.all([
    getPriceGroups(),
    getContent(),
    getCalcConfig(),
  ]);

  return (
    <>
      <PageHeader
        eyebrow="калькулятор"
        title={pick(content, "calc.title", "Рассчитайте свой заказ")}
        description={pick(
          content,
          "calc.description",
          "Выберите материал, вариант и тираж — увидите ориентировочную стоимость и сразу отправите заявку.",
        )}
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Calculator groups={groups} config={config} />
      </section>
    </>
  );
}
