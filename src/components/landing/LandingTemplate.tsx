import Link from "next/link";
import { PageHeader } from "@/components/site/PageHeader";
import { GoalLink } from "@/components/site/GoalLink";
import { ContactSection } from "@/components/home/ContactSection";
import { Faq, type FaqItem } from "@/components/home/Faq";
import { Guarantees } from "@/components/home/Guarantees";
import { Gallery } from "@/components/works/Gallery";
import type { PriceGroupDTO } from "@/lib/prices";
import type { WorkDTO } from "@/lib/works";

export type LandingConfig = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  features: { title: string; text: string }[];
  prices?: PriceGroupDTO[];
  works?: WorkDTO[];
  faqItems: FaqItem[];
  phone: string;
  email: string;
  address: string;
  customSection?: React.ReactNode;
};

export function LandingTemplate({ config }: { config: LandingConfig }) {
  return (
    <>
      <PageHeader
        eyebrow={config.eyebrow}
        crumb={{ label: config.title, href: `/${config.slug}` }}
        title={config.title}
        description={config.description}
      />

      {/* Hero CTA & UTP */}
      <section className="mx-auto max-w-6xl px-4 pt-6 pb-12 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-textColorDark/10 bg-white/70 p-6 sm:p-8">
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-md border border-textColorDark/15 bg-onbutton/10 px-2.5 py-1 font-mono text-[11px] font-semibold text-textColorDark">
                ✓ от 30 штук
              </span>
              <span className="rounded-md border border-textColorDark/15 bg-onbutton/10 px-2.5 py-1 font-mono text-[11px] font-semibold text-textColorDark">
                ✓ макет бесплатно
              </span>
              <span className="rounded-md border border-textColorDark/15 bg-onbutton/10 px-2.5 py-1 font-mono text-[11px] font-semibold text-textColorDark">
                ✓ печать 2–3 дня
              </span>
            </div>
            <p className="text-sm text-textColor/80">
              Подготовим аккуратный макет по вашему брифу и отправим СДЭК / Почтой по всей РФ.
            </p>
          </div>
          <GoalLink
            href="/calc"
            goal="calc_open"
            className="rounded-full bg-textColorDark px-6 py-3.5 text-sm font-semibold text-mainColor transition-transform hover:-translate-y-0.5 hover:bg-onbutton hover:text-white"
          >
            Рассчитать этот заказ →
          </GoalLink>
        </div>
      </section>

      {/* Features */}
      {config.features.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <h2 className="text-2xl font-bold text-textColorDark mb-6">Особенности и применение</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {config.features.map((f, i) => (
              <div
                key={i}
                className="rounded-3xl border border-textColorDark/10 bg-white p-6 shadow-sm"
              >
                <div className="font-mono text-sm font-bold text-onbutton">0{i + 1}</div>
                <h3 className="mt-3 text-lg font-bold text-textColorDark">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-textColor">{f.text}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {config.customSection}

      {/* Prices */}
      {config.prices && config.prices.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="text-2xl font-bold text-textColorDark">Стоимость изготовления</h2>
            <Link href="/price" className="text-xs font-semibold text-onbutton hover:underline">
              Полный прайс-лист →
            </Link>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {config.prices.map((g) => (
              <div
                key={g.id}
                className="rounded-3xl border border-textColorDark/10 bg-white p-6 sm:p-7"
              >
                <h3 className="text-xl font-bold text-textColorDark">{g.name}</h3>
                {g.note && (
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-textColor/60">
                    {g.note}
                  </p>
                )}
                <div className="mt-4 space-y-4">
                  {g.items.map((item) => (
                    <div key={item.id}>
                      {item.variant && (
                        <div className="mb-2 text-xs font-semibold text-textColorDark/80">
                          {item.variant}
                        </div>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {item.tiers.map((t, i) => (
                          <div
                            key={i}
                            className="flex items-baseline gap-2 rounded-xl border border-dashed border-textColorDark/15 bg-mainColor px-3 py-1 text-xs"
                          >
                            <span className="font-mono text-[10px] text-textColor/60">
                              от {t.maxQty} шт
                            </span>
                            <span className="font-bold text-textColorDark">
                              {t.pricePerUnit} ₽
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Gallery / Works */}
      {config.works && config.works.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <h2 className="text-2xl font-bold text-textColorDark mb-6">Примеры выполненных работ</h2>
          <Gallery works={config.works} />
        </section>
      )}

      <Guarantees />

      {/* FAQ */}
      {config.faqItems.length > 0 && (
        <Faq
          items={config.faqItems}
          eyebrow="вопросы и ответы"
          heading="Частые вопросы по этому материалу"
          lead="Если останутся вопросы — напишите нам, проконсультируем под вашу задачу."
        />
      )}

      {/* Contact form */}
      <ContactSection
        phone={config.phone}
        email={config.email}
        address={config.address}
        eyebrow="заказ"
        title="Рассчитать и заказать"
        text="Оставьте контакты — менеджер свяжется с вами, уточнит детали макета и подготовит полный расчет."
      />
    </>
  );
}
