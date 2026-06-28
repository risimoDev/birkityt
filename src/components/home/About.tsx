import Image from "next/image";
import { type ContentMap, pick } from "@/lib/content";

export function About({ content }: { content: ContentMap }) {
  const stat1v = pick(content, "index.about.stat1.value", "1000+");
  const stat1l = pick(content, "index.about.stat1.label", "брендов с нами");
  const stat2v = pick(content, "index.about.stat2.value", "5 дней");
  const stat2l = pick(content, "index.about.stat2.label", "до готового комплекта");
  return (
    <section className="relative overflow-hidden bg-onbutton/10">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2">
        {/* collage */}
        <div className="relative grid grid-cols-2 gap-4">
          <Image
            src="/images/banners/0iCWg4QBUkE.jpg"
            alt="Печать на ткани"
            width={400}
            height={500}
            className="mt-8 aspect-[4/5] w-full rounded-2xl object-cover"
          />
          <Image
            src="/images/banners/jtouETZBAo0.jpg"
            alt="Готовые изделия с бирками"
            width={400}
            height={500}
            className="aspect-[4/5] w-full rounded-2xl object-cover"
          />
          <div className="col-span-2">
            <Image
              src="/images/banners/UPqlF9J6IHo.jpg"
              alt="Процесс подготовки макета"
              width={800}
              height={300}
              className="aspect-[16/7] w-full rounded-2xl object-cover"
            />
          </div>
        </div>

        {/* text */}
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-onbutton">
            / {pick(content, "index.about.eyebrow", "о производстве")}
          </span>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-textColorDark sm:text-4xl">
            {pick(content, "index.about.title", "Уже 7 лет печатаем бирки для брендов одежды")}
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-textColor">
            {pick(
              content,
              "index.about.text",
              "В ассортименте более 20 видов продукции. Каждый второй клиент — поставщик на маркетплейсы. Разрабатываем логотипы, готовим макеты и доставляем по всему миру.",
            )}
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:max-w-md">
            {[
              [stat1v, stat1l],
              [stat2v, stat2l],
            ].map(([v, l]) => (
              <div
                key={l}
                className="rounded-2xl border border-dashed border-textColorDark/20 bg-mainColor/60 p-5"
              >
                <div className="text-2xl font-bold text-textColorDark">{v}</div>
                <div className="mt-1 font-mono text-[11px] uppercase tracking-wider text-textColor/60">
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
