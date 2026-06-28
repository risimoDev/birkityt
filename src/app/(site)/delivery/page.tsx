import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { getContent, pick } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Доставка и как мы работаем | БИРКИТУТ",
  description:
    "Как оформить заказ бирок: от заявки до доставки СДЭК или Почтой России. Этапы работы и сроки.",
};

export default async function DeliveryPage() {
  const content = await getContent();

  const steps = [
    { key: "step1" },
    { key: "step2" },
    { key: "step3" },
    { key: "step4" },
    { key: "finish" },
  ]
    .map(({ key }, i) => ({
      n: String(i + 1).padStart(2, "0"),
      last: key === "finish",
      title: pick(content, `delivery.${key}.title`),
      text: pick(content, `delivery.${key}.text`),
    }))
    .filter((s) => s.title);

  return (
    <>
      <PageHeader
        eyebrow="доставка"
        title={pick(content, "delivery.title", "Как мы работаем")}
        description={pick(
          content,
          "delivery.description",
          "От заявки до готовой продукции у вас на руках — пять понятных шагов. Доставляем СДЭК и Почтой России.",
        )}
      />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <ol className="relative">
          {steps.map((s, i) => (
            <li key={i} className="relative flex gap-6 pb-10 last:pb-0">
              {/* vertical seam */}
              {i < steps.length - 1 && (
                <span
                  aria-hidden
                  className="absolute left-[27px] top-14 h-[calc(100%-2.5rem)] w-px border-l border-dashed border-textColorDark/20"
                />
              )}
              {/* node */}
              <div
                className={
                  "relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-dashed font-mono text-sm font-bold [clip-path:polygon(10px_0,100%_0,100%_100%,0_100%,0_10px)] " +
                  (s.last
                    ? "border-onbutton bg-onbutton text-white"
                    : "border-textColorDark/25 bg-mainColor text-textColorDark")
                }
              >
                <span className="absolute left-2 top-2 h-2 w-2 rounded-full border border-current opacity-50" />
                {s.last ? "✓" : s.n}
              </div>
              {/* body */}
              <div className="pt-1.5">
                <h2 className="text-xl font-bold text-textColorDark">{s.title}</h2>
                <p className="mt-2 leading-relaxed text-textColor">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
