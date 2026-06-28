"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/auth-helpers";

export async function saveSettings(
  values: Record<string, string>,
): Promise<{ ok: boolean }> {
  await requireSession();
  const entries = Object.entries(values).filter(([k]) => k.length > 0 && k.length < 200);

  await prisma.$transaction(
    entries.map(([key, value]) =>
      prisma.setting.upsert({
        where: { key },
        update: { value: String(value).slice(0, 20000) },
        create: { key, value: String(value).slice(0, 20000) },
      }),
    ),
  );

  revalidatePath("/", "layout");
  revalidatePath("/admin/seo");
  return { ok: true };
}
