import type { ReviewDTO } from "@/lib/reviews";

export function Reviews({ reviews }: { reviews: ReviewDTO[] }) {
  if (!reviews || reviews.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mb-12 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-onbutton">
            / отзывы клиентов
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-textColorDark sm:text-4xl">
            Что говорят бренды о работе с БИРКИТУТ
          </h2>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-textColor/60">
          <span className="text-amber-500 text-base">★★★★★</span>
          <span>Средняя оценка 5.0 на основе откликов клиентов</span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {reviews.map((r) => (
          <article
            key={r.id}
            className="flex flex-col justify-between rounded-3xl border border-textColorDark/10 bg-white p-7 shadow-sm transition-shadow hover:shadow-md"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex text-amber-500 text-sm">
                  {"★".repeat(r.rating || 5)}
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-textColor/40">
                  проверено
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-textColor">{r.text}</p>
            </div>

            <div className="mt-6 border-t border-textColorDark/10 pt-4">
              <div className="font-bold text-textColorDark">{r.name}</div>
              {r.brand && (
                <div className="font-mono text-xs text-onbutton mt-0.5">
                  {r.brand}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
