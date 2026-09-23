import { TagShape } from "@/components/site/Stitch";

export function Guarantees() {
  const items = [
    {
      title: "Гарантия стирки до 60°C",
      text: "Печать на сатине и силиконе устойчива к частым стиркам, термообработке и трению. Логотип не выцветает и не крошится.",
      badge: "стойкость",
    },
    {
      title: "100% перепечатка при браке",
      text: "Каждый тираж проходит контроль перед отгрузкой. Если обнаружится брак — бесплатно перепечатаем и доставим за наш счет.",
      badge: "гарантия",
    },
    {
      title: "Тираж от 30 шт / 1000 ₽",
      text: "Идеально для тестовых коллекций, мелких серий и молодых брендов одежды. Нет гигантских минималок.",
      badge: "доступность",
    },
    {
      title: "Договор, счет и ЭДО",
      text: "Работаем официально с ИП, ООО и самозанятыми по всей России. Предоставляем закрывающие документы через Диадок / СБИС.",
      badge: "надежность",
    },
  ];

  return (
    <section className="bg-onbutton/5 border-y border-textColorDark/10 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-onbutton">
            / почему нам доверяют
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-textColorDark sm:text-4xl">
            Гарантии качества производства БИРКИТУТ
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <div
              key={it.title}
              className="relative flex flex-col justify-between rounded-2xl border border-textColorDark/10 bg-white p-6 shadow-sm"
            >
              <div>
                <TagShape tone="cream" notch={false} className="mb-4 text-[10px] uppercase font-semibold">
                  {it.badge}
                </TagShape>
                <h3 className="text-lg font-bold text-textColorDark">{it.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-textColor">{it.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
