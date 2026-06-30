"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/auth-helpers";

const groupSchema = z.object({
  id: z.string().min(1),
  name: z.string().trim().min(1, "Название группы обязательно").max(200),
  note: z.string().trim().max(500).optional().or(z.literal("")),
  items: z.array(
    z.object({
      variant: z.string().trim().max(200),
      tiers: z.array(
        z.object({
          maxQty: z.coerce.number().int().min(1).max(10_000_000),
          pricePerUnit: z.coerce.number().int().min(0).max(10_000_000),
        }),
      ),
    }),
  ),
});

export type GroupPayload = z.infer<typeof groupSchema>;

function refresh() {
  revalidatePath("/admin/prices");
  revalidatePath("/price");
  revalidatePath("/calc");
  revalidatePath("/", "layout");
}

export async function createGroup(name: string): Promise<{ ok: boolean; id?: string }> {
  await requireSession();
  const clean = name.trim().slice(0, 200) || "Новая группа";
  const max = await prisma.priceGroup.aggregate({ _max: { sortOrder: true } });
  const g = await prisma.priceGroup.create({
    data: { name: clean, sortOrder: (max._max.sortOrder ?? -1) + 1 },
  });
  refresh();
  return { ok: true, id: g.id };
}

export async function deleteGroup(id: string) {
  await requireSession();
  await prisma.priceGroup.delete({ where: { id } });
  refresh();
}

/** Move a group up or down; persists sortOrder so the public price page reflects it. */
export async function moveGroup(id: string, dir: "up" | "down") {
  await requireSession();
  const groups = await prisma.priceGroup.findMany({
    orderBy: { sortOrder: "asc" },
    select: { id: true },
  });
  const idx = groups.findIndex((g) => g.id === id);
  if (idx === -1) return;
  const swapWith = dir === "up" ? idx - 1 : idx + 1;
  if (swapWith < 0 || swapWith >= groups.length) return;

  const order = groups.map((g) => g.id);
  [order[idx], order[swapWith]] = [order[swapWith], order[idx]];

  // Normalize sortOrder to the new sequential order.
  await prisma.$transaction(
    order.map((gid, i) =>
      prisma.priceGroup.update({ where: { id: gid }, data: { sortOrder: i } }),
    ),
  );
  refresh();
}

export async function saveGroup(payload: GroupPayload): Promise<{ ok: boolean; info?: string }> {
  await requireSession();
  const parsed = groupSchema.safeParse(payload);
  if (!parsed.success) {
    return { ok: false, info: parsed.error.errors[0]?.message ?? "Проверьте поля" };
  }
  const g = parsed.data;

  await prisma.$transaction(async (tx) => {
    await tx.priceGroup.update({
      where: { id: g.id },
      data: { name: g.name, note: g.note || null },
    });
    // replace items + tiers wholesale (simplest correct approach)
    await tx.priceItem.deleteMany({ where: { groupId: g.id } });
    for (let i = 0; i < g.items.length; i++) {
      const item = g.items[i];
      const created = await tx.priceItem.create({
        data: { groupId: g.id, variant: item.variant, sortOrder: i },
      });
      if (item.tiers.length) {
        await tx.priceTier.createMany({
          data: item.tiers.map((t, idx) => ({
            itemId: created.id,
            maxQty: t.maxQty,
            pricePerUnit: t.pricePerUnit,
            sortOrder: idx,
          })),
        });
      }
    }
  });

  refresh();
  return { ok: true };
}
