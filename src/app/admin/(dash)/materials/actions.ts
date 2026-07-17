"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/auth-helpers";

function refresh() {
  revalidatePath("/admin/materials");
  revalidatePath("/materials");
}

export async function createMaterial(
  title: string,
  text: string,
): Promise<{ ok: boolean; info?: string }> {
  await requireSession();
  const t = title.trim().slice(0, 200);
  const body = text.trim().slice(0, 2000);
  if (!t) return { ok: false, info: "Введите название" };
  const max = await prisma.material.aggregate({ _max: { sortOrder: true } });
  await prisma.material.create({
    data: { title: t, text: body, sortOrder: (max._max.sortOrder ?? -1) + 1 },
  });
  refresh();
  return { ok: true };
}

const updateSchema = z.object({
  id: z.string().min(1),
  title: z.string().trim().min(1, "Введите название").max(200),
  text: z.string().trim().max(2000),
});

export async function updateMaterial(
  id: string,
  title: string,
  text: string,
): Promise<{ ok: boolean; info?: string }> {
  await requireSession();
  const parsed = updateSchema.safeParse({ id, title, text });
  if (!parsed.success) {
    return { ok: false, info: parsed.error.errors[0]?.message ?? "Проверьте поля" };
  }
  await prisma.material.update({
    where: { id },
    data: { title: parsed.data.title, text: parsed.data.text },
  });
  refresh();
  return { ok: true };
}

export async function deleteMaterial(id: string) {
  await requireSession();
  await prisma.material.delete({ where: { id } });
  refresh();
}

/** Move a material card up or down; persists sortOrder for the public page. */
export async function moveMaterial(id: string, dir: "up" | "down") {
  await requireSession();
  const rows = await prisma.material.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    select: { id: true },
  });
  const idx = rows.findIndex((r) => r.id === id);
  if (idx === -1) return;
  const swapWith = dir === "up" ? idx - 1 : idx + 1;
  if (swapWith < 0 || swapWith >= rows.length) return;

  const order = rows.map((r) => r.id);
  [order[idx], order[swapWith]] = [order[swapWith], order[idx]];

  await prisma.$transaction(
    order.map((rid, i) =>
      prisma.material.update({ where: { id: rid }, data: { sortOrder: i } }),
    ),
  );
  refresh();
}

/**
 * Seed the Material table from DEFAULT_MATERIALS if it's empty. Lets the admin
 * start from the current 5 cards instead of a blank slate.
 */
export async function seedDefaultMaterials(): Promise<{ ok: boolean }> {
  await requireSession();
  const { DEFAULT_MATERIALS } = await import("@/lib/materials");
  const count = await prisma.material.count();
  if (count === 0) {
    await prisma.material.createMany({
      data: DEFAULT_MATERIALS.map((m, i) => ({ ...m, sortOrder: i })),
    });
  }
  refresh();
  return { ok: true };
}
