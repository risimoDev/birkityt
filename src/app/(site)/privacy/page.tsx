/* TODO: проверить юристом перед публикацией */
import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { getSettings, setting } from "@/lib/settings";
import { LEGAL } from "@/lib/legal";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Политика обработки персональных данных | БИРКИТУТ",
  description:
    "Как БИРКИТУТ собирает, хранит и обрабатывает персональные данные посетителей сайта birkityt.ru, и как отозвать согласие.",
};

/** Date the current wording was published. Bump it when the text changes. */
const PUBLISHED = "23 августа 2026 г.";

export default async function PrivacyPage() {
  const s = await getSettings();
  const phone = setting(s, "site.phone");
  const email = setting(s, "site.email");
  const address = setting(s, "site.address");
  const tel = phone.replace(/[^+\d]/g, "");

  return (
    <>
      {/* TODO: проверить юристом перед публикацией */}
      <PageHeader
        eyebrow="документы"
        title="Политика обработки персональных данных"
        description={`Редакция от ${PUBLISHED}. Документ описывает, какие данные мы получаем через сайт birkityt.ru, зачем они нужны и как их удалить.`}
      />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <div className="space-y-10">
          <Block n="01" title="Оператор персональных данных">
            <p>
              Оператором является {LEGAL.entity}, ИНН {LEGAL.inn}, ОГРНИП{" "}
              {LEGAL.ogrn}, адрес: {address}.
            </p>
            <p>
              Контакты для обращений по вопросам обработки персональных данных:{" "}
              <A href={`mailto:${email}`}>{email}</A>, телефон{" "}
              <A href={`tel:${tel}`}>{phone}</A>.
            </p>
          </Block>

          <Block n="02" title="Какие данные мы собираем">
            <p>Через формы на сайте — те данные, которые вы указываете сами:</p>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>имя;</li>
              <li>номер телефона;</li>
              <li>адрес электронной почты, если вы его указали;</li>
              <li>предпочтительный способ связи и текст сообщения к заявке;</li>
              <li>параметры расчёта в калькуляторе: материал, вариант, тираж.</li>
            </ul>
            <p>
              Автоматически, средствами Яндекс.Метрики, — обезличенные данные о
              посещении: файлы cookie, IP-адрес, сведения о браузере и устройстве
              (User-Agent), источник перехода, просмотренные страницы, действия
              на странице и записи сессий (вебвизор).
            </p>
            <p>
              Аналитика включается только после того, как вы нажали «Принять» в
              баннере о cookie. До этого момента счётчик на страницы не
              загружается и данные не собираются. Если вы нажали «Отказаться»,
              аналитические cookie не устанавливаются.
            </p>
          </Block>

          <Block n="03" title="Зачем мы обрабатываем данные">
            <ul className="list-disc space-y-1.5 pl-5">
              <li>связаться с вами по оставленной заявке и рассчитать заказ;</li>
              <li>согласовать макет, тираж, сроки и доставку;</li>
              <li>выполнить обязательства по договору и оформить документы;</li>
              <li>
                оценить работу сайта и качество рекламы — в обезличенном виде, по
                статистике посещений.
              </li>
            </ul>
            <p>
              Мы не продаём данные и не передаём их третьим лицам для их
              собственного маркетинга, а также не принимаем решений исключительно
              автоматизированной обработкой.
            </p>
          </Block>

          <Block n="04" title="Правовые основания">
            <p>
              Обработка ведётся на основании Федерального закона от 27.07.2006
              № 152-ФЗ «О персональных данных»: с вашего согласия, которое вы
              даёте при отправке формы и при принятии баннера о cookie, а также
              для исполнения договора, стороной которого вы являетесь, и для
              соблюдения требований законодательства.
            </p>
          </Block>

          <Block n="05" title="Кому передаются данные">
            <p>
              Данные обрабатываются на территории Российской Федерации. К
              обработке привлекаются:
            </p>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>
                ООО «ЯНДЕКС» — сервис Яндекс.Метрика, статистика посещений сайта;
              </li>
              <li>
                хостинг-провайдер, на серверах которого размещён сайт и база
                заявок;
              </li>
              <li>
                службы доставки (СДЭК, Почта России) — имя, телефон и адрес
                получателя, только для отправки готового заказа.
              </li>
            </ul>
          </Block>

          <Block n="06" title="Сроки хранения">
            <p>
              Заявки и переписку по ним мы храним до 3 лет с момента последнего
              обращения — этот срок нужен для сопровождения повторных заказов и
              претензионной работы. Бухгалтерские документы по исполненным
              заказам — в сроки, установленные законодательством. Данные
              Яндекс.Метрики хранятся в соответствии с политикой сервиса. По
              истечении срока или по вашему требованию данные удаляются.
            </p>
          </Block>

          <Block n="07" title="Ваши права и отзыв согласия">
            <p>
              Вы вправе запросить сведения об обработке ваших данных, потребовать
              их уточнения, блокирования или удаления, а также в любой момент
              отозвать согласие.
            </p>
            <p>
              Для этого напишите на <A href={`mailto:${email}`}>{email}</A> с
              темой «Отзыв согласия» или позвоните по телефону {phone}. Мы
              обработаем обращение в течение 30 дней.
            </p>
            <p>
              Отозвать согласие на аналитические cookie можно самостоятельно:
              очистите данные сайта в настройках браузера — при следующем
              посещении баннер появится снова, и вы сможете выбрать «Отказаться».
              Полностью отключить сбор статистики Яндекс.Метрикой можно через{" "}
              <A
                href="https://yandex.ru/support/metrica/general/opt-out.html"
                external
              >
                официальное дополнение Яндекса
              </A>
              .
            </p>
          </Block>

          <Block n="08" title="Защита данных">
            <p>
              Сайт работает по протоколу HTTPS. Доступ к базе заявок ограничен
              учётными записями сотрудников и защищён паролем. Мы принимаем
              правовые, организационные и технические меры для защиты данных от
              неправомерного доступа, копирования и распространения.
            </p>
          </Block>

          <Block n="09" title="Изменения политики">
            <p>
              Мы можем обновлять этот документ. Актуальная редакция всегда
              размещена по адресу birkityt.ru/privacy, дата редакции указана в
              начале страницы.
            </p>
          </Block>
        </div>

        <div className="mt-14 rounded-3xl border border-dashed border-textColorDark/20 bg-onbutton/10 p-8 text-center">
          <p className="text-lg text-textColorDark">
            Остались вопросы по обработке данных?
          </p>
          <Link
            href="/#contact"
            className="mt-4 inline-block rounded-full bg-textColorDark px-6 py-3 text-sm font-semibold text-mainColor transition-colors hover:bg-onbutton hover:text-white"
          >
            Написать нам
          </Link>
        </div>
      </section>
    </>
  );
}

function Block({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="relative border-l border-dashed border-textColorDark/20 pl-6">
      <span className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full border-2 border-textColorDark/20 bg-mainColor" />
      <span className="font-mono text-[11px] uppercase tracking-widest text-onbutton">
        {n}
      </span>
      <h2 className="mt-2 text-xl font-bold text-textColorDark sm:text-2xl">
        {title}
      </h2>
      <div className="mt-4 space-y-4 leading-relaxed text-textColor">
        {children}
      </div>
    </article>
  );
}

function A({
  href,
  external,
  children,
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener" } : {})}
      className="underline decoration-onbutton underline-offset-4 transition-colors hover:text-textColorDark"
    >
      {children}
    </a>
  );
}
