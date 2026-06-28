import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

async function getStats() {
  try {
    const [newCount, total, works, groups] = await Promise.all([
      prisma.submission.count({ where: { status: "NEW" } }),
      prisma.submission.count(),
      prisma.work.count(),
      prisma.priceGroup.count(),
    ]);
    return { newCount, total, works, groups };
  } catch {
    return { newCount: 0, total: 0, works: 0, groups: 0 };
  }
}

export default async function AdminHome() {
  const s = await getStats();
  const cards = [
    { label: "Новые заявки", value: s.newCount, href: "/admin/submissions?status=NEW", accent: true },
    { label: "Всего заявок", value: s.total, href: "/admin/submissions" },
    { label: "Работ в портфолио", value: s.works, href: "/admin/works" },
    { label: "Групп в прайсе", value: s.groups, href: "/admin/prices" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight text-textColorDark">Обзор</h1>
      <p className="mt-1 text-textColor">Сводка по сайту и быстрые переходы.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className={`rounded-2xl border p-5 transition-colors ${
              c.accent
                ? "border-onbutton bg-onbutton/10 hover:bg-onbutton/20"
                : "border-textColorDark/10 bg-white/70 hover:bg-white"
            }`}
          >
            <div className="text-3xl font-extrabold text-textColorDark">{c.value}</div>
            <div className="mt-1 font-mono text-[11px] uppercase tracking-wider text-textColor/60">
              {c.label}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
