import { prisma } from "@/lib/db";
import { VisualContentEditor } from "@/components/admin/VisualContentEditor";
import { CONTENT_SCHEMA, CONTENT_DEFAULTS, SCHEMA_KEYS } from "@/lib/content-schema";

export const dynamic = "force-dynamic";

export default async function ContentPage() {
  const rows = await prisma.content.findMany();
  const db = Object.fromEntries(rows.map((r) => [r.key, r.value]));

  // Schema fields fall back to their defaults when not yet stored.
  const values: Record<string, string> = {};
  for (const key of SCHEMA_KEYS) {
    values[key] = db[key] ?? CONTENT_DEFAULTS[key] ?? "";
  }

  // Anything in the DB that the schema doesn't cover.
  const extras = rows
    .filter((r) => !SCHEMA_KEYS.has(r.key))
    .map((r) => ({ key: r.key, value: r.value }));

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight text-textColorDark">Контент</h1>
      <p className="mt-1 text-textColor">
        Тексты сайта по блокам и страницам. Изменения сразу применяются на сайте.
      </p>
      <div className="mt-6">
        <VisualContentEditor groups={CONTENT_SCHEMA} values={values} extras={extras} />
      </div>
    </div>
  );
}
