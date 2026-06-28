/**
 * Single source of truth for editable site copy.
 * Drives the visual admin content editor (grouped, labelled fields) and
 * provides default values used by the public pages and the content seed.
 */

export type FieldType = "text" | "textarea" | "html";

export type ContentField = {
  key: string;
  label: string;
  type?: FieldType;
  help?: string;
  default: string;
};

export type ContentGroup = {
  id: string;
  title: string;
  description?: string;
  fields: ContentField[];
};

export const CONTENT_SCHEMA: ContentGroup[] = [
  {
    id: "home-hero",
    title: "Главная · Первый экран",
    description: "Крупный блок наверху главной страницы.",
    fields: [
      { key: "index.hero.eyebrow", label: "Надпись над заголовком", default: "тканые · силиконовые · картонные" },
      { key: "index.hero.title", label: "Заголовок", type: "html", help: "Можно перенос строки <br>", default: "Бирки, которые<br>делают бренд" },
      { key: "index.hero.text", label: "Подзаголовок", type: "textarea", default: "Тканые, силиконовые и картонные этикетки для одежды. Подготовим макет, напечатаем и отправим по всему миру." },
      { key: "index.hero.cta.primary", label: "Кнопка (основная)", default: "Рассчитать стоимость" },
      { key: "index.hero.cta.secondary", label: "Кнопка (вторая)", default: "Смотреть работы" },
      { key: "index.hero.stat1.value", label: "Цифра 1 — значение", default: "7 лет" },
      { key: "index.hero.stat1.label", label: "Цифра 1 — подпись", default: "на рынке" },
      { key: "index.hero.stat2.value", label: "Цифра 2 — значение", default: "20+" },
      { key: "index.hero.stat2.label", label: "Цифра 2 — подпись", default: "видов продукции" },
      { key: "index.hero.stat3.value", label: "Цифра 3 — значение", default: "2–3 дня" },
      { key: "index.hero.stat3.label", label: "Цифра 3 — подпись", default: "срок печати" },
    ],
  },
  {
    id: "home-advantages",
    title: "Главная · Преимущества",
    fields: [
      { key: "index.adv.title", label: "Заголовок блока", default: "Почему бренды выбирают БИРКИТУТ" },
      { key: "index.adv.1.title", label: "Преимущество 1 — заголовок", default: "Скорость" },
      { key: "index.why.fast", label: "Преимущество 1 — текст", type: "textarea", default: "Большинство заказов выполняем за 2–3 рабочих дня после согласования макета." },
      { key: "index.adv.2.title", label: "Преимущество 2 — заголовок", default: "Макет под ключ" },
      { key: "index.why.design", label: "Преимущество 2 — текст", type: "textarea", default: "Дизайнеры подготовят аккуратный макет по вашему брифу — даже если присылаете идею «на салфетке»." },
      { key: "index.adv.3.title", label: "Преимущество 3 — заголовок", default: "Доставка везде" },
      { key: "index.why.delivery", label: "Преимущество 3 — текст", type: "textarea", default: "Отправляем СДЭК и Почтой России по всей стране и за её пределы." },
    ],
  },
  {
    id: "home-about",
    title: "Главная · О производстве",
    fields: [
      { key: "index.about.eyebrow", label: "Надпись над заголовком", default: "о производстве" },
      { key: "index.about.title", label: "Заголовок", default: "Уже 7 лет печатаем бирки для брендов одежды" },
      { key: "index.about.text", label: "Текст", type: "textarea", default: "В ассортименте более 20 видов продукции. Каждый второй клиент — поставщик на маркетплейсы. Разрабатываем логотипы, готовим макеты и доставляем по всему миру." },
      { key: "index.about.stat1.value", label: "Цифра 1 — значение", default: "1000+" },
      { key: "index.about.stat1.label", label: "Цифра 1 — подпись", default: "брендов с нами" },
      { key: "index.about.stat2.value", label: "Цифра 2 — значение", default: "5 дней" },
      { key: "index.about.stat2.label", label: "Цифра 2 — подпись", default: "до готового комплекта" },
    ],
  },
  {
    id: "home-faq",
    title: "Главная · Вопросы и ответы",
    fields: [
      { key: "faq.eyebrow", label: "Надпись над заголовком", default: "частые вопросы" },
      { key: "faq.heading", label: "Заголовок блока", default: "Коротко о том, как мы работаем" },
      { key: "faq.lead", label: "Подзаголовок", type: "textarea", default: "Не нашли ответ? Напишите нам — подскажем по вашему заказу." },
      { key: "faq.q1", label: "Вопрос 1", default: "Как быстро вы делаете заказ?" },
      { key: "faq.a1", label: "Ответ 1", type: "html", default: "Обычно укладываемся в 2–3 рабочих дня, сложные заказы — по согласованию." },
      { key: "faq.q2", label: "Вопрос 2", default: "Можете помочь с дизайном?" },
      { key: "faq.a2", label: "Ответ 2", type: "html", default: "Да, дизайнеры подготовят макет по вашему брифу и рекомендациям." },
      { key: "faq.q3", label: "Вопрос 3", default: "Какой минимальный тираж?" },
      { key: "faq.a3", label: "Ответ 3", type: "html", default: "Зависит от материала: чаще всего от 100–200 шт." },
      { key: "faq.q4", label: "Вопрос 4", default: "Доставляете в мой город?" },
      { key: "faq.a4", label: "Ответ 4", type: "html", default: "Отправляем по всей России (СДЭК/Почта) и за пределы РФ по запросу." },
      { key: "faq.q5", label: "Вопрос 5", default: "Как рассчитать стоимость?" },
      { key: "faq.a5", label: "Ответ 5", type: "html", default: "Используйте калькулятор на странице, цена зависит от материала, ширины и тиража." },
      { key: "faq.q6", label: "Вопрос 6", default: "Есть ли скидки при большом тираже?" },
      { key: "faq.a6", label: "Ответ 6", type: "html", default: "Да, прайс предусматривает снижения цены по диапазонам количества." },
    ],
  },
  {
    id: "home-contact",
    title: "Главная · Блок контактов",
    fields: [
      { key: "contact.eyebrow", label: "Надпись над заголовком", default: "связаться" },
      { key: "contact.title", label: "Заголовок", default: "Расскажите про ваш заказ" },
      { key: "contact.text", label: "Текст", type: "textarea", default: "Оставьте контакты — менеджер свяжется, поможет с материалом, тиражом и макетом." },
    ],
  },
  {
    id: "page-price",
    title: "Страница «Стоимость»",
    fields: [
      { key: "price.title", label: "Заголовок", default: "Стоимость" },
      { key: "price.description", label: "Описание", type: "textarea", default: "Цена за штуку зависит от материала, ширины и тиража. Чем больше тираж — тем ниже цена." },
    ],
  },
  {
    id: "page-calc",
    title: "Страница «Калькулятор»",
    fields: [
      { key: "calc.title", label: "Заголовок", default: "Рассчитайте свой заказ" },
      { key: "calc.description", label: "Описание", type: "textarea", default: "Выберите материал, вариант и тираж — увидите ориентировочную стоимость и сразу отправите заявку." },
    ],
  },
  {
    id: "page-works",
    title: "Страница «Наши работы»",
    fields: [
      { key: "works.title", label: "Заголовок", default: "Наши работы" },
      { key: "works.description", label: "Описание", type: "textarea", default: "Подборка выполненных проектов и примеров материалов. Нажмите на работу, чтобы рассмотреть детальнее." },
    ],
  },
  {
    id: "page-materials",
    title: "Страница «Материалы»",
    fields: [
      { key: "materials.title", label: "Заголовок", default: "Материалы" },
      { key: "materials.description", label: "Описание", type: "textarea", default: "Выбирайте основу под задачу: от мягкого силикона до плотного картона. Поможем подобрать материал под вашу одежду." },
      { key: "materials.silicone.title", label: "Силикон — заголовок", default: "Силиконовая бирка" },
      { key: "materials.silicone.text", label: "Силикон — текст", type: "textarea", default: "Лента матовая, полупрозрачная, приятная на ощупь, эластичная и элегантная." },
      { key: "materials.cotton.title", label: "Хлопок — заголовок", default: "Хлопковая бирка" },
      { key: "materials.cotton.text", label: "Хлопок — текст", type: "textarea", default: "Плотный рельефный материал в нескольких оттенках. Стойкая печать методом сублимации." },
      { key: "materials.satin.title", label: "Сатин — заголовок", default: "Премиум сатин" },
      { key: "materials.satin.text", label: "Сатин — текст", type: "textarea", default: "Высококачественная сатиновая ленточка с тканым краем. Смотрится презентабельно и дорого." },
      { key: "materials.kiper.title", label: "Кипер — заголовок", default: "Киперная лента" },
      { key: "materials.kiper.text", label: "Кипер — текст", type: "textarea", default: "Белая киперная лента с выраженной текстурой. Плотная, принимает любую форму. 100% полиэстер." },
      { key: "materials.card.title", label: "Картон — заголовок", default: "Картонная бирка" },
      { key: "materials.card.text", label: "Картон — текст", type: "textarea", default: "В одностороннем и двустороннем варианте, для логотипа, состава и ценников." },
    ],
  },
  {
    id: "page-delivery",
    title: "Страница «Доставка»",
    fields: [
      { key: "delivery.title", label: "Заголовок", default: "Как мы работаем" },
      { key: "delivery.description", label: "Описание", type: "textarea", default: "От заявки до готовой продукции у вас на руках — пять понятных шагов. Доставляем СДЭК и Почтой России." },
      { key: "delivery.step1.title", label: "Шаг 1 — заголовок", default: "Шаг 1" },
      { key: "delivery.step1.text", label: "Шаг 1 — текст", type: "textarea", default: "Оставляете заявку на сайте или звоните нам напрямую — мы принимаем заказ." },
      { key: "delivery.step2.title", label: "Шаг 2 — заголовок", default: "Шаг 2" },
      { key: "delivery.step2.text", label: "Шаг 2 — текст", type: "textarea", default: "Оплачиваете заказ, после чего ожидаете макет от наших специалистов." },
      { key: "delivery.step3.title", label: "Шаг 3 — заголовок", default: "Шаг 3" },
      { key: "delivery.step3.text", label: "Шаг 3 — текст", type: "textarea", default: "Начинаем производство, время изготовления подскажет менеджер." },
      { key: "delivery.step4.title", label: "Шаг 4 — заголовок", default: "Шаг 4" },
      { key: "delivery.step4.text", label: "Шаг 4 — текст", type: "textarea", default: "Когда продукция готова — отправляем СДЭК или отдаём самовывозом из офиса в Перми." },
      { key: "delivery.finish.title", label: "Финал — заголовок", default: "Готово!" },
      { key: "delivery.finish.text", label: "Финал — текст", type: "textarea", default: "Продукция у вас. Не забывайте оставлять отзывы!" },
    ],
  },
];

/** Flat map of key -> default, for seeding and fallbacks. */
export const CONTENT_DEFAULTS: Record<string, string> = Object.fromEntries(
  CONTENT_SCHEMA.flatMap((g) => g.fields.map((f) => [f.key, f.default])),
);

/** Keys covered by the structured schema (used to separate "other" keys). */
export const SCHEMA_KEYS = new Set(Object.keys(CONTENT_DEFAULTS));
