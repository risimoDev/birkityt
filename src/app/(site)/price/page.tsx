import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/site/PageHeader";
import { GoalLink } from "@/components/site/GoalLink";
import { getPriceGroups } from "@/lib/prices";
import { JsonLd } from "@/components/site/JsonLd";
import { priceListJsonLd } from "@/lib/jsonld";
import { getContent, pick } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  path: "/price",
  title: "Стоимость бирок для одежды — прайс-лист | БИРКИТУТ",
  description:
    "Цены на тканевые, силиконовые и картонные бирки для одежды: стоимость за штуку по материалу, ширине и тиражу. Тираж от 30 шт, скидка от объёма, печать 2–3 дня.",
});

function tierLabel(maxQty: number): string {
  return `от ${maxQty.toLocaleString("ru-RU")} шт`;
}

export default async function PricePage() {
  const [groups, content] = await Promise.all([getPriceGroups(), getContent()]);
  // Generated from `groups` — the same rows the table below renders.
  const priceList = await priceListJsonLd(groups);

  return (
    <>
      {priceList && <JsonLd data={priceList} />}
      <PageHeader
        eyebrow="прайс-лист"
        crumb={{ label: "Стоимость", href: "/price" }}
        title={pick(content, "price.title", "Стоимость")}
        description={pick(
          content,
          "price.description",
          "Цена за штуку зависит от материала, ширины и тиража. Чем больше тираж — тем ниже цена.",
        )}
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        {groups.length === 0 ? (
          <p className="text-textColor">Прайс временно недоступен.</p>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {groups.map((g) => (
              <article
                key={g.id}
                className="relative rounded-3xl border border-textColorDark/10 bg-white/70 p-6 sm:p-7"
              >
                <span className="absolute right-6 top-6 h-2.5 w-2.5 rounded-full border border-textColorDark/20" />
                <h2 className="pr-8 text-xl font-bold text-textColorDark">{g.name}</h2>
                {g.note && (
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-textColor/60">
                    {g.note}
                  </p>
                )}

                <div className="mt-5 space-y-5">
                  {g.items.map((item) => (
                    <div key={item.id}>
                      {item.variant && (
                        <div className="mb-2 text-sm font-semibold text-textColorDark/80">
                          {item.variant}
                        </div>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {item.tiers.map((t, i) => (
                          <div
                            key={i}
                            className="flex items-baseline gap-2 rounded-xl border border-dashed border-textColorDark/15 bg-mainColor px-3 py-1.5"
                          >
                            <span className="font-mono text-[11px] uppercase text-textColor/60">
                              {tierLabel(t.maxQty)}
                            </span>
                            <span className="text-base font-bold text-textColorDark">
                              {t.pricePerUnit} ₽
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-12 flex flex-col items-start gap-4 rounded-3xl bg-textColorDark p-8 text-mainColor sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-2xl font-bold">Не хотите считать вручную?</h3>
            <p className="mt-2 text-mainColor/70">
              Калькулятор подберёт цену по тиражу и материалу за пару кликов.
            </p>
          </div>
          <GoalLink
            href="/calc"
            goal="calc_open"
            className="shrink-0 rounded-full bg-onbutton px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-textColorDark"
          >
            Открыть калькулятор →
          </GoalLink>
        </div>
      </section>
    </>
  );
}
