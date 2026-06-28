import { Hero } from "@/components/home/Hero";
import { MaterialsMarquee } from "@/components/home/MaterialsMarquee";
import { Advantages } from "@/components/home/Advantages";
import { About } from "@/components/home/About";
import { Faq, type FaqItem } from "@/components/home/Faq";
import { ContactSection } from "@/components/home/ContactSection";
import { getContent, pick } from "@/lib/content";
import { getSettings, setting } from "@/lib/settings";
import { prisma } from "@/lib/db";

// Content/prices come from the DB and are editable in admin — render per request
// (also avoids needing a DB during the Docker build step).
export const dynamic = "force-dynamic";

async function getMarqueeItems(): Promise<string[]> {
  try {
    const groups = await prisma.priceGroup.findMany({
      orderBy: { sortOrder: "asc" },
      select: { name: true },
    });
    if (groups.length) return groups.map((g) => g.name);
  } catch {
    /* fall through to defaults */
  }
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
  const [content, settings, marquee] = await Promise.all([
    getContent(),
    getSettings(),
    getMarqueeItems(),
  ]);

  return (
    <>
      <Hero content={content} />
      <MaterialsMarquee items={marquee} />
      <Advantages content={content} />
      <About content={content} />
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
