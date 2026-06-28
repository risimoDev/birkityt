/**
 * One-time migration of legacy assets into the new system.
 *
 * - Seeds the WORK category taxonomy.
 * - Copies legacy portfolio images (legacy/public/images/works/*.webp) into
 *   public/images/works and creates a Work row for each (idempotent).
 *
 * Content, settings and prices are migrated by `npm run seed:content`.
 * The legacy `works`/`submissions` rows lived in the production MySQL, which is
 * not bundled here (database.sql is schema-only), so only image files migrate.
 *
 * Run: npm run migrate:legacy
 */
import { readdirSync, existsSync, mkdirSync, copyFileSync } from "node:fs";
import { resolve, basename } from "node:path";
import { PrismaClient, CategoryKind } from "@prisma/client";

const prisma = new PrismaClient();

const WORK_CATEGORIES = [
  { slug: "woven", name: "Тканые бирки" },
  { slug: "silicone", name: "Силиконовые бирки" },
  { slug: "carton", name: "Картонные / навесные" },
  { slug: "stickers", name: "Наклейки" },
  { slug: "other", name: "Прочее" },
];

async function seedCategories() {
  let created = 0;
  for (let i = 0; i < WORK_CATEGORIES.length; i++) {
    const c = WORK_CATEGORIES[i];
    const res = await prisma.category.upsert({
      where: { slug: c.slug },
      update: {},
      create: { slug: c.slug, name: c.name, kind: CategoryKind.WORK, sortOrder: i },
    });
    if (res) created++;
  }
  return created;
}

async function importWorks() {
  const srcDir = resolve(process.cwd(), "legacy/public/images/works");
  const destDir = resolve(process.cwd(), "public/images/works");
  mkdirSync(destDir, { recursive: true });

  // Copy legacy images if the legacy folder is present (dev/host only).
  let copied = 0;
  if (existsSync(srcDir)) {
    const webps = readdirSync(srcDir).filter((f) => f.toLowerCase().endsWith(".webp"));
    for (const f of webps) {
      const dest = resolve(destDir, f);
      if (!existsSync(dest)) {
        copyFileSync(resolve(srcDir, f), dest);
        copied++;
      }
    }
  }

  // Create a Work row per image already in public (idempotent by path).
  // Works without the legacy folder too — public images are baked into the build.
  if (!existsSync(destDir)) return { copied, rows: 0 };
  const allWebps = readdirSync(destDir).filter((f) => f.toLowerCase().endsWith(".webp"));
  const max = await prisma.work.aggregate({ _max: { sortOrder: true } });
  let order = (max._max.sortOrder ?? -1) + 1;
  let rows = 0;
  for (const f of allWebps) {
    const imageWebp = `/images/works/${basename(f)}`;
    const exists = await prisma.work.findFirst({ where: { imageWebp } });
    if (exists) continue;
    await prisma.work.create({ data: { imageWebp, sortOrder: order++ } });
    rows++;
  }
  return { copied, rows };
}

async function main() {
  const cats = await seedCategories();
  const { copied, rows } = await importWorks();
  console.log(
    `✅ Migration done: categories ensured (${cats}), images copied (${copied}), new work rows (${rows}).`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
