import { type ContentMap, pick } from "@/lib/content";

export function Advantages({ content }: { content: ContentMap }) {
  const items = [
    {
      n: "01",
      title: pick(content, "index.adv.1.title", "Скорость"),
      text: pick(
        content,
        "index.why.fast",
        "Большинство заказов выполняем за 2–3 рабочих дня после согласования макета.",
      ),
    },
    {
      n: "02",
      title: pick(content, "index.adv.2.title", "Макет под ключ"),
      text: pick(
        content,
        "index.why.design",
        "Дизайнеры подготовят аккуратный макет по вашему брифу — даже если присылаете идею «на салфетке».",
      ),
    },
    {
      n: "03",
      title: pick(content, "index.adv.3.title", "Доставка везде"),
      text: pick(
        content,
        "index.why.delivery",
        "Отправляем СДЭК и Почтой России по всей стране и за её пределы.",
      ),
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mb-12 flex items-end justify-between gap-6">
        <h2 className="max-w-md text-3xl font-extrabold tracking-tight text-textColorDark sm:text-4xl">
          {pick(content, "index.adv.title", "Почему бренды выбирают БИРКИТУТ")}
        </h2>
        <span className="hidden font-mono text-xs uppercase tracking-widest text-textColor/50 sm:block">
          / преимущества
        </span>
      </div>

      <div className="grid gap-px overflow-hidden rounded-3xl border border-textColorDark/10 bg-textColorDark/10 md:grid-cols-3">
        {items.map((it) => (
          <div
            key={it.n}
            className="group relative bg-mainColor p-8 transition-colors hover:bg-white"
          >
            <div className="font-mono text-5xl font-bold text-onbutton/40 transition-colors group-hover:text-onbutton">
              {it.n}
            </div>
            <h3 className="mt-6 text-xl font-bold text-textColorDark">{it.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-textColor">{it.text}</p>
            <span className="absolute right-8 top-8 h-2.5 w-2.5 rounded-full border border-textColorDark/20" />
          </div>
        ))}
      </div>
    </section>
  );
}
