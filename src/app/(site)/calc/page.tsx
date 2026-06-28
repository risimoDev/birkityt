import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { Calculator } from "@/components/calc/Calculator";
import { getPriceGroups } from "@/lib/prices";
import { getCalcConfig } from "@/lib/calc-config";
import { getContent, pick } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Калькулятор стоимости бирок | БИРКИТУТ",
  description:
    "Рассчитайте стоимость бирок по материалу, ширине и тиражу онлайн и оставьте заявку.",
};

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
