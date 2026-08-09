import Image from "next/image";
import { type ContentMap, pick } from "@/lib/content";

const ABOUT_PHOTOS = [
  "/images/banners/0iCWg4QBUkE.jpg",
  "/images/banners/jtouETZBAo0.jpg",
  "/images/banners/UPqlF9J6IHo.jpg",
];

export function About({ content, photos }: { content: ContentMap; photos?: string[] }) {
  const imgs = photos && photos.length === ABOUT_PHOTOS.length ? photos : ABOUT_PHOTOS;

  // Steps previously on the standalone "Доставка" page — now shown next to the
  // three photos, in place of the old descriptive text.
  const steps = ["step1", "step2", "step3", "step4", "finish"]
    .map((key, i) => ({
      n: String(i + 1).padStart(2, "0"),
      last: key === "finish",
      title: pick(content, `delivery.${key}.title`),
      text: pick(content, `delivery.${key}.text`),
    }))
    .filter((s) => s.title);

  return (
    <section className="relative overflow-hidden bg-onbutton/10">
      <div className="mx-auto grid max-w-6xl items-start gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2">
        {/* collage */}
        <div className="relative grid grid-cols-2 gap-4 lg:sticky lg:top-28">
          <Image
            src={imgs[0]}
            alt="Печать на ткани"
            width={400}
            height={500}
            className="aspect-[4/5] w-full rounded-2xl object-cover"
          />
          <Image
            src={imgs[1]}
            alt="Готовые изделия с бирками"
            width={400}
            height={500}
            className="aspect-[4/5] w-full rounded-2xl object-cover"
          />
          <div className="col-span-2">
            <Image
              src={imgs[2]}
              alt="Процесс подготовки макета"
              width={800}
              height={300}
              className="aspect-[16/7] w-full rounded-2xl object-cover"
            />
          </div>
        </div>

        {/* steps (replaces the old descriptive text) */}
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-onbutton">
            / {pick(content, "delivery.eyebrow", "как мы работаем")}
          </span>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-textColorDark sm:text-4xl">
            {pick(content, "delivery.title", "Как мы работаем")}
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-textColor">
            {pick(
              content,
              "delivery.description",
              "От заявки до готовой продукции у вас на руках — пять понятных шагов. Доставляем СДЭК и Почтой России.",
            )}
          </p>

          {steps.length > 0 && (
            <ol className="relative mt-8">
              {steps.map((s, i) => (
                <li key={i} className="relative flex gap-5 pb-8 last:pb-0">
                  {i < steps.length - 1 && (
                    <span
                      aria-hidden
                      className="absolute left-[27px] top-14 h-[calc(100%-2.5rem)] w-px border-l border-dashed border-textColorDark/20"
                    />
                  )}
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
                  <div className="pt-1.5">
                    <h3 className="text-lg font-bold text-textColorDark">{s.title}</h3>
                    <p className="mt-1.5 leading-relaxed text-textColor">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </section>
  );
}
