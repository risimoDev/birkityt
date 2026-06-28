import Link from "next/link";
import { prisma } from "@/lib/db";
import { SubmissionCard, type SubmissionView } from "@/components/admin/SubmissionCard";
import { cn } from "@/lib/cn";

export const dynamic = "force-dynamic";

const FILTERS = [
  { value: "", label: "Все" },
  { value: "NEW", label: "Новые" },
  { value: "IN_PROGRESS", label: "В работе" },
  { value: "DONE", label: "Выполнены" },
  { value: "SPAM", label: "Спам" },
];

const VALID = new Set(["NEW", "IN_PROGRESS", "DONE", "SPAM"]);

export default async function SubmissionsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const filter = status && VALID.has(status) ? status : undefined;

  const rows = await prisma.submission.findMany({
    where: filter ? { status: filter as never } : undefined,
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  const items: SubmissionView[] = rows.map((r) => ({
    id: r.id,
    type: r.type,
    name: r.name,
    phone: r.phone,
    email: r.email,
    message: r.message,
    payload: (r.payload as Record<string, unknown> | null) ?? null,
    status: r.status,
    note: r.note,
    createdAt: r.createdAt.toISOString(),
  }));

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight text-textColorDark">Заявки</h1>
      <p className="mt-1 text-textColor">Заявки с форм и калькулятора.</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const active = (f.value || undefined) === filter;
          return (
            <Link
              key={f.value}
              href={f.value ? `/admin/submissions?status=${f.value}` : "/admin/submissions"}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                active
                  ? "border-textColorDark bg-textColorDark text-mainColor"
                  : "border-textColorDark/15 bg-white text-textColorDark hover:border-textColorDark/40",
              )}
            >
              {f.label}
            </Link>
          );
        })}
      </div>

      {items.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-dashed border-textColorDark/20 p-10 text-center text-textColor">
          Заявок нет.
        </p>
      ) : (
        <div className="mt-5 grid gap-4">
          {items.map((s) => (
            <SubmissionCard key={s.id} s={s} />
          ))}
        </div>
      )}
    </div>
  );
}
