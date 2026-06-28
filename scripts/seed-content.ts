/**
 * Dev helper: load text content from legacy/content/content.json into the
 * Content table, and seed default site Settings (contacts + SEO).
 * Safe to re-run (upserts). Run: npm run seed:content
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { PrismaClient } from "@prisma/client";
import { CONTENT_DEFAULTS } from "../src/lib/content-schema";

const prisma = new PrismaClient();

/** Read a seed file from the committed seed-data dir, falling back to legacy/. */
function readSeedFile(seedName: string, legacyRel: string): string | null {
  const candidates = [
    resolve(process.cwd(), "prisma/seed-data", seedName),
    resolve(process.cwd(), legacyRel),
  ];
  for (const p of candidates) {
    if (existsSync(p)) return readFileSync(p, "utf-8");
  }
  return null;
}

const SETTINGS: Record<string, string> = {
  // Contacts
  "site.phone": "+7 (952) 645-22-71",
  "site.phoneRaw": "79526452271",
  "site.email": "k.redkousov@inbox.ru",
  "site.address": "г. Пермь, ул. Кронштадтская, 39А",
  "site.hours": "Пн–Пт 10:00–18:00 (Пермь)",
  "social.telegram": "https://t.me/Birkityt",
  "social.vk": "https://vk.com/birkityt",
  "social.whatsapp": "https://api.whatsapp.com/send?phone=79526452271",
  // SEO defaults
  "seo.title": "БИРКИТУТ — изготовление бирок для одежды на заказ",
  "seo.description":
    "Изготовление бирок для одежды на различных тканях и силиконе. Картонные бирки для одежды. Высокое качество и индивидуальный подход. Закажите бирки на birkityt.ru.",
  "seo.keywords":
    "бирки для одежды, тканевые бирки, силиконовые бирки, картонные бирки, изготовление бирок, бирки на заказ, birkityt.ru",
  "seo.canonical": "https://birkityt.ru",
  "seo.ogImage": "https://birkityt.ru/og.jpg",
  "seo.themeColor": "#A1B5D8",
  "analytics.yandexMetrika": "99360339",
};

async function main() {
  // --- Content (from seed-data, fallback legacy) ---
  let contentCount = 0;
  try {
    const raw = readSeedFile("content.json", "legacy/content/content.json");
    if (raw) {
      const data = JSON.parse(raw) as Record<string, string>;
      for (const [key, value] of Object.entries(data)) {
        await prisma.content.upsert({
          where: { key },
          update: { value: String(value) },
          create: { key, value: String(value) },
        });
        contentCount++;
      }
    }
  } catch (e) {
    console.warn("⚠️  Could not load content.json:", (e as Error).message);
  }

  // --- Content defaults for keys the legacy file didn't have ---
  // create-only: never clobber values already present (legacy or admin-edited)
  for (const [key, value] of Object.entries(CONTENT_DEFAULTS)) {
    await prisma.content.upsert({
      where: { key },
      update: {},
      create: { key, value },
    });
  }
  const totalContent = await prisma.content.count();

  // --- Settings ---
  for (const [key, value] of Object.entries(SETTINGS)) {
    await prisma.setting.upsert({
      where: { key },
      update: {}, // do not overwrite values already tuned in admin
      create: { key, value },
    });
  }

  // --- Prices (groups -> items -> tiers) ---
  let groupCount = 0;
  try {
    const raw = readSeedFile("prices.json", "legacy/data/prices.json");
    if (!raw) throw new Error("prices.json not found");
    const data = JSON.parse(raw) as Record<
      string,
      Record<string, [number, number][] | string>
    >;

    let g = 0;
    for (const [groupName, variants] of Object.entries(data)) {
      const note =
        typeof variants["__note"] === "string" ? (variants["__note"] as string) : null;

      const existing = await prisma.priceGroup.findUnique({
        where: { name: groupName },
      });
      if (existing) continue; // don't clobber admin-edited prices

      const group = await prisma.priceGroup.create({
        data: { name: groupName, note, sortOrder: g++ },
      });
      groupCount++;

      let it = 0;
      for (const [variant, tiers] of Object.entries(variants)) {
        if (variant === "__note" || !Array.isArray(tiers)) continue;
        const item = await prisma.priceItem.create({
          data: { groupId: group.id, variant, sortOrder: it++ },
        });
        await prisma.priceTier.createMany({
          data: tiers.map(([maxQty, pricePerUnit], idx) => ({
            itemId: item.id,
            maxQty,
            pricePerUnit,
            sortOrder: idx,
          })),
        });
      }
    }
  } catch (e) {
    console.warn("⚠️  Could not load legacy prices.json:", (e as Error).message);
  }

  // --- Sample works (only if table is empty) ---
  let workCount = 0;
  try {
    const existing = await prisma.work.count();
    if (existing === 0) {
      const dir = resolve(process.cwd(), "public/images/works");
      if (existsSync(dir)) {
        const files = readdirSync(dir).filter((f) => f.endsWith(".webp"));
        const titles = [
          "Тканые бирки",
          "Силиконовые бирки",
          "Премиум сатин",
          "Картонные бирки",
          "Навесные бирки",
          "Этикетки на сатине",
        ];
        let i = 0;
        for (const f of files) {
          await prisma.work.create({
            data: {
              title: titles[i % titles.length],
              imageWebp: `/images/works/${f}`,
              sortOrder: i,
            },
          });
          workCount++;
          i++;
        }
      }
    }
  } catch (e) {
    console.warn("⚠️  Could not seed sample works:", (e as Error).message);
  }

  console.log(
    `✅ Content: ${contentCount} from legacy, ${totalContent} total keys · ${Object.keys(SETTINGS).length} settings · ${groupCount} price groups · ${workCount} works.`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
