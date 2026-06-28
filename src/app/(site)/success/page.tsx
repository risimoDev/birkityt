import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Заявка принята | БИРКИТУТ",
  robots: { index: false },
};

export default function SuccessPage() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
      <div className="relative grid h-20 w-20 place-items-center rounded-3xl border border-dashed border-onbutton bg-onbutton/15 text-3xl text-onbutton [clip-path:polygon(14px_0,100%_0,100%_100%,0_100%,0_14px)]">
        <span className="absolute left-3 top-3 h-3 w-3 rounded-full border border-current opacity-50" />
        ✓
      </div>
      <h1 className="mt-8 text-3xl font-extrabold tracking-tight text-textColorDark sm:text-4xl">
        Заявка принята!
      </h1>
      <p className="mt-4 max-w-md text-lg text-textColor">
        Спасибо! Мы получили вашу заявку и свяжемся с вами в рабочее время.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-textColorDark px-6 py-3.5 text-sm font-semibold text-mainColor transition-colors hover:bg-onbutton hover:text-white"
        >
          На главную
        </Link>
        <Link
          href="/works"
          className="rounded-full border border-textColorDark/15 px-6 py-3.5 text-sm font-semibold text-textColorDark transition-colors hover:border-textColorDark/40"
        >
          Смотреть работы
        </Link>
      </div>
    </section>
  );
}
