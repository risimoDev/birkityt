"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/auth-helpers";

const schema = z.array(
  z.object({
    key: z.string().trim().min(1).max(200),
    value: z.string().max(20000),
  }),
);

export async function saveContent(
  entries: { key: string; value: string }[],
): Promise<{ ok: boolean; info?: string }> {
  await requireSession();
  const parsed = schema.safeParse(entries);
  if (!parsed.success) return { ok: false, info: "Проверьте ключи (не пустые)" };

  // Deduplicate by key (last wins).
  const map = new Map<string, string>();
  for (const { key, value } of parsed.data) map.set(key, value);

  await prisma.$transaction(async (tx) => {
    const keep = [...map.keys()];
    await tx.content.deleteMany({
      where: keep.length ? { key: { notIn: keep } } : {},
    });
    for (const [key, value] of map) {
      await tx.content.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      });
    }
  });

  revalidatePath("/admin/content");
  // public pages read content — refresh them too
  revalidatePath("/", "layout");
  return { ok: true };
}
