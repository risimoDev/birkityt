import { Hero } from "@/components/home/Hero";
import { MaterialsMarquee } from "@/components/home/MaterialsMarquee";
import { Advantages } from "@/components/home/Advantages";
import { About } from "@/components/home/About";
import { Faq, type FaqItem } from "@/components/home/Faq";
import { ContactSection } from "@/components/home/ContactSection";
import { getContent, pick } from "@/lib/content";
import { getSettings, setting } from "@/lib/settings";
import { mediaSrcs, HERO_SLOTS, ABOUT_SLOTS } from "@/lib/media";
import { getPriceGroups, type PriceGroupDTO } from "@/lib/prices";
import { JsonLd } from "@/components/site/JsonLd";
import { faqJsonLd, localBusinessJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();
  return pageMetadata({
    path: "/",
    title: setting(s, "seo.title"),
    description: setting(s, "seo.description"),
  });
}

// Content/prices come from the DB and are editable in admin — render per request
// (also avoids needing a DB during the Docker build step).
export const dynamic = "force-dynamic";

function getMarqueeItems(groups: PriceGroupDTO[]): string[] {
  if (groups.length) return groups.map((g) => g.name);
  return [
    "Силикон",
    "Премиум сатин",
    "Хлопок",
    "Киперная лента",
    "Картон",
    "Наклейки",
  ];
}

function getFaq(content: Record<string, string>): FaqItem[] {
  const items: FaqItem[] = [];
  for (let i = 1; i <= 6; i++) {
    const q = pick(content, `faq.q${i}`);
    const a = pick(content, `faq.a${i}`);
    if (q) items.push({ q, a });
  }
  return items;
}

export default async function HomePage() {
  const [content, settings, groups] = await Promise.all([
    getContent(),
    getSettings(),
    getPriceGroups(),
  ]);
  const marquee = getMarqueeItems(groups);
  // The FAQ block is generated from the same faq.* content keys the page
  // renders below, so the two cannot drift apart.
  const [localBusiness, faq] = await Promise.all([
    localBusinessJsonLd(),
    faqJsonLd(content),
  ]);

  return (
    <>
      <JsonLd data={localBusiness} />
      {faq && <JsonLd data={faq} />}
      <Hero content={content} samples={mediaSrcs(settings, HERO_SLOTS)} />
      <MaterialsMarquee items={marquee} />
      <Advantages content={content} />
      <About content={content} photos={mediaSrcs(settings, ABOUT_SLOTS)} />
      <Faq
        items={getFaq(content)}
        eyebrow={pick(content, "faq.eyebrow", "частые вопросы")}
        heading={pick(content, "faq.heading", "Коротко о том, как мы работаем")}
        lead={pick(content, "faq.lead", "Не нашли ответ? Напишите нам — подскажем по вашему заказу.")}
      />
      <ContactSection
        phone={setting(settings, "site.phone")}
        email={setting(settings, "site.email")}
        address={setting(settings, "site.address")}
        eyebrow={pick(content, "contact.eyebrow", "связаться")}
        title={pick(content, "contact.title", "Расскажите про ваш заказ")}
        text={pick(content, "contact.text", "Оставьте контакты — менеджер свяжется, поможет с материалом, тиражом и макетом.")}
      />
    </>
  );
}
