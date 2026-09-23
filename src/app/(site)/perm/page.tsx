import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getSettings, setting } from "@/lib/settings";
import { getPriceGroups } from "@/lib/prices";
import { getWorks } from "@/lib/works";
import { LandingTemplate } from "@/components/landing/LandingTemplate";
import { LazyMap } from "@/components/site/LazyMap";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  path: "/perm",
  title: "Изготовление бирок для одежды в Перми на заказ — производство БИРКИТУТ",
  description:
    "Собственное производство тканевых, силиконовых и картонных бирок в Перми. Самовывоз на ул. Кронштадтская 39А, оперативная печать от 2 дней.",
});

export default async function PermPage() {
  const [s, groups, works] = await Promise.all([
    getSettings(),
    getPriceGroups(),
    getWorks(),
  ]);

  const address = setting(s, "site.address");

  return (
    <LandingTemplate
      config={{
        slug: "perm",
        eyebrow: "производство в перми",
        title: "Изготовление бирок для одежды в Перми",
        description:
          "Пермское текстильное производство бирок, этикеток и наклеек с 2017 года. Быстрая печать, согласуем макет лично или в мессенджере, удобный самовывоз в Перми.",
        features: [
          {
            title: "Собственный цех в Перми",
            text: "Печатаем на собственном оборудовании без посредников и наценок. Адрес: ул. Кронштадтская, 39А.",
          },
          {
            title: "Самовывоз или курьер",
            text: "Вы можете забрать готовый заказ самостоятельно в цехе или заказать оперативную курьерскую доставку по Перми.",
          },
          {
            title: "Оплата по счету и наличными",
            text: "Принимаем оплату от юрлиц (ИП/ООО) по безналичному расчету и ЭДО, а также от частных мастеров.",
          },
        ],
        prices: groups.slice(0, 4),
        works: works.slice(0, 8),
        customSection: (
          <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
            <h2 className="text-2xl font-bold text-textColorDark mb-4">Наше производство на карте Перми</h2>
            <div className="overflow-hidden rounded-3xl border border-textColorDark/15">
              <LazyMap
                title={`БИРКИТУТ — производство бирок в Перми, ${address}`}
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A5a9e66ca8e53422be682486f68b65a31f288f536be5e5ccf37730aab74481305&source=constructor"
              />
            </div>
          </section>
        ),
        faqItems: [
          {
            q: "Где забрать заказ в Перми?",
            a: "Самовывоз из нашего цеха по адресу: г. Пермь, ул. Кронштадтская, 39А (Пн-Пт 10:00–18:00).",
          },
        ],
        phone: setting(s, "site.phone"),
        email: setting(s, "site.email"),
        address,
      }}
    />
  );
}
