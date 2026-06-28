import Link from "next/link";
import Image from "next/image";
import { type ContentMap, pick } from "@/lib/content";
import { TagShape } from "@/components/site/Stitch";

const SAMPLES = [
  "/images/works/work_693a32b58034e5.65048226.webp",
  "/images/works/work_693a32b6aafd39.89489493.webp",
  "/images/works/work_693a32b798b680.91423171.webp",
];

export function Hero({ content }: { content: ContentMap }) {
  const eyebrow = pick(content, "index.hero.eyebrow", "тканые · силиконовые · картонные");
  const title = pick(content, "index.hero.title", "Бирки, которые<br>делают бренд");
  const text = pick(
    content,
    "index.hero.text",
    "Тканые, силиконовые и картонные этикетки для одежды. Подготовим макет, напечатаем и отправим по всему миру.",
  );
  const ctaPrimary = pick(content, "index.hero.cta.primary", "Рассчитать стоимость");
  const ctaSecondary = pick(content, "index.hero.cta.secondary", "Смотреть работы");
  const stats = [
    [pick(content, "index.hero.stat1.value", "7 лет"), pick(content, "index.hero.stat1.label", "на рынке")],
    [pick(content, "index.hero.stat2.value", "20+"), pick(content, "index.hero.stat2.label", "видов продукции")],
    [pick(content, "index.hero.stat3.value", "2–3 дня"), pick(content, "index.hero.stat3.label", "срок печати")],
  ];

  return (
    <section className="relative overflow-hidden">
      {/* large faint typographic watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-6 top-10 select-none font-mono text-[18vw] font-extrabold leading-none text-textColorDark/[0.03] sm:text-[12rem]"
      >
        TAG
      </span>

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:pb-28 lg:pt-20">
        {/* left */}
        <div className="relative z-10">
          <TagShape tone="cream" className="mb-7 text-xs font-semibold uppercase tracking-wide">
            {eyebrow}
          </TagShape>

          <h1
            className="text-[2.6rem] font-extrabold leading-[1.02] tracking-tight text-textColorDark sm:text-6xl"
            dangerouslySetInnerHTML={{ __html: title }}
          />

          <p className="mt-6 max-w-md text-lg leading-relaxed text-textColor">{text}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/calc"
              className="group inline-flex items-center gap-2 rounded-full bg-textColorDark px-6 py-3.5 text-sm font-semibold text-mainColor transition-transform hover:-translate-y-0.5 hover:bg-onbutton hover:text-white"
            >
              {ctaPrimary}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href="/works"
              className="inline-flex items-center gap-2 rounded-full border border-textColorDark/15 px-6 py-3.5 text-sm font-semibold text-textColorDark transition-colors hover:border-textColorDark/40"
            >
              {ctaSecondary}
            </Link>
          </div>

          {/* micro stat row */}
          <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
            {stats.map(([v, l]) => (
              <div key={l}>
                <dt className="text-2xl font-bold text-textColorDark">{v}</dt>
                <dd className="font-mono text-[11px] uppercase tracking-wider text-textColor/60">
                  {l}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* right: physical pile of sample tags */}
        <div className="relative h-[360px] sm:h-[460px] lg:h-[520px]">
          <div className="bg-grain absolute inset-0 rounded-[2rem] border border-dashed border-textColorDark/15 bg-onbutton/10" />
          {SAMPLES.map((src, i) => {
            const rot = [-8, 5, -2][i];
            const pos = [
              "left-6 top-10 sm:left-10",
              "right-8 top-24 sm:right-12",
              "left-1/2 bottom-8 -translate-x-1/2",
            ][i];
            return (
              <figure
                key={src}
                className={`absolute ${pos} w-40 sm:w-52`}
                style={{ rotate: `${rot}deg` }}
              >
                <div className="relative rounded-2xl border border-textColorDark/10 bg-white p-2 shadow-xl [clip-path:polygon(16px_0,100%_0,100%_100%,0_100%,0_16px)]">
                  {/* eyelet */}
                  <span className="absolute left-3 top-3 z-10 h-3 w-3 rounded-full border-2 border-textColorDark/30 bg-mainColor" />
                  <Image
                    src={src}
                    alt="Пример бирки"
                    width={208}
                    height={208}
                    className="aspect-square w-full rounded-xl object-cover"
                  />
                </div>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
