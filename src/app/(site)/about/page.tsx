import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/site/PageHeader";
import { getSettings, setting } from "@/lib/settings";
import { LEGAL } from "@/lib/legal";
import { Guarantees } from "@/components/home/Guarantees";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  path: "/about",
  title: "О компании БИРКИТУТ — производство бирок и этикеток в Перми с 2017 года",
  description:
    "Информация о компании БИРКИТУТ: история с 2017 года, собственное оборудование, стандарты качества, реквизиты ИП, работа по договору и ЭДО.",
});

export default async function AboutPage() {
  const s = await getSettings();
  const address = setting(s, "site.address");
  const phone = setting(s, "site.phone");
  const email = setting(s, "site.email");

  return (
    <>
      <PageHeader
        eyebrow="о компании"
        crumb={{ label: "О компании", href: "/about" }}
        title="О компании БИРКИТУТ"
        description="Собственное производство бирок, этикеток и стикеров для брендов одежды с 2017 года."
      />

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <div className="space-y-10 leading-relaxed text-textColor">
          <div className="rounded-3xl border border-textColorDark/10 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-textColorDark mb-4">Кто мы и чем занимаемся</h2>
            <p className="mb-4">
              БИРКИТУТ — это специализированный производственный цех в Перми по изготовлению тканых,
              сатиновых, силиконовых и картонных бирок для одежды. Мы помогаем как начинающим дизайнерам и
              молодым брендам, так и крупным швейным фабрикам и селлерам маркетплейсов (Wildberries, Ozon).
            </p>
            <p>
              Наша главная задача — сделать так, чтобы каждая деталь маркировки вашей одежды выглядела премиально,
              долго служила и повышала ценность вашего бренда в глазах покупателей.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3 text-center">
            <div className="rounded-2xl border border-textColorDark/10 bg-mainColor p-6">
              <div className="font-mono text-3xl font-extrabold text-textColorDark">с 2017 года</div>
              <div className="mt-1 text-xs text-textColor/70 uppercase font-mono">на рынке печатных бирок</div>
            </div>
            <div className="rounded-2xl border border-textColorDark/10 bg-mainColor p-6">
              <div className="font-mono text-3xl font-extrabold text-textColorDark">от 30 шт</div>
              <div className="mt-1 text-xs text-textColor/70 uppercase font-mono">минимальный тираж</div>
            </div>
            <div className="rounded-2xl border border-textColorDark/10 bg-mainColor p-6">
              <div className="font-mono text-3xl font-extrabold text-textColorDark">2–3 дня</div>
              <div className="mt-1 text-xs text-textColor/70 uppercase font-mono">средний срок печати</div>
            </div>
          </div>

          <div className="rounded-3xl border border-textColorDark/10 bg-white p-8 shadow-sm space-y-4">
            <h2 className="text-2xl font-bold text-textColorDark">Официальное сотрудничество и реквизиты</h2>
            <p>
              Мы работаем строго в соответствии с законодательством РФ. Выполняем заказы по договору,
              принимаем оплату по безналичному расчету от юрлиц и ИП, обмениваемся документами через ЭДО (Диадок / СБИС).
            </p>
            <div className="rounded-xl border border-dashed border-textColorDark/20 bg-mainColor p-4 text-xs font-mono space-y-1">
              <div>Юридическое лицо: {LEGAL.entity}</div>
              <div>ИНН: {LEGAL.inn}</div>
              <div>ОГРНИП: {LEGAL.ogrn}</div>
              <div>Адрес производства: {address}</div>
              <div>Телефон: {phone}</div>
              <div>Email: {email}</div>
            </div>
          </div>
        </div>
      </section>

      <Guarantees />

      <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
        <h2 className="text-2xl font-bold text-textColorDark">Готовы приступить к вашему заказу?</h2>
        <p className="mt-2 text-textColor">Рассчитайте стоимость за пару кликов или проконсультируйтесь с менеджером.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link
            href="/calc"
            className="rounded-full bg-textColorDark px-6 py-3.5 text-sm font-semibold text-mainColor transition-colors hover:bg-onbutton hover:text-white"
          >
            Рассчитать в калькуляторе →
          </Link>
          <Link
            href="/#contact"
            className="rounded-full border border-textColorDark/20 px-6 py-3.5 text-sm font-semibold text-textColorDark transition-colors hover:border-textColorDark"
          >
            Написать менеджеру
          </Link>
        </div>
      </section>
    </>
  );
}
