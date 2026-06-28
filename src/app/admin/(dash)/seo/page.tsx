import { prisma } from "@/lib/db";
import { SettingsForm, type Group } from "@/components/admin/SettingsForm";

export const dynamic = "force-dynamic";

const GROUPS: Group[] = [
  {
    title: "Контакты",
    fields: [
      { key: "site.phone", label: "Телефон" },
      { key: "site.email", label: "Email" },
      { key: "site.address", label: "Адрес" },
      { key: "site.hours", label: "Часы работы" },
    ],
  },
  {
    title: "Соцсети",
    fields: [
      { key: "social.telegram", label: "Telegram (ссылка)" },
      { key: "social.vk", label: "VK (ссылка)" },
      { key: "social.whatsapp", label: "WhatsApp (ссылка)" },
    ],
  },
  {
    title: "SEO",
    fields: [
      { key: "seo.title", label: "Title", multiline: true },
      { key: "seo.description", label: "Description", multiline: true },
      { key: "seo.keywords", label: "Keywords", multiline: true },
      { key: "seo.canonical", label: "Canonical URL" },
      { key: "seo.themeColor", label: "Theme color" },
    ],
  },
];

export default async function SeoPage() {
  const rows = await prisma.setting.findMany();
  const initial = Object.fromEntries(rows.map((r) => [r.key, r.value]));

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight text-textColorDark">
        Настройки и SEO
      </h1>
      <p className="mt-1 text-textColor">
        Контакты, соцсети и мета-теги. Меняются на всех страницах сайта.
      </p>
      <div className="mt-6">
        <SettingsForm groups={GROUPS} initial={initial} />
      </div>
    </div>
  );
}
