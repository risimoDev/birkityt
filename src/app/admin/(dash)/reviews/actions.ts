"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/auth-helpers";

function refresh() {
  revalidatePath("/admin/reviews");
  revalidatePath("/");
}

export async function createReview(
  name: string,
  text: string,
  brand?: string,
  brandUrl?: string,
  rating?: number,
): Promise<{ ok: boolean; info?: string }> {
  await requireSession();
  const n = name.trim().slice(0, 100);
  const t = text.trim().slice(0, 2000);
  if (!n || !t) return { ok: false, info: "Укажите имя и текст отзыва" };

  const max = await (prisma as any).review.aggregate({ _max: { sortOrder: true } });
  await (prisma as any).review.create({
    data: {
      name: n,
      text: t,
      brand: brand?.trim() || null,
      brandUrl: brandUrl?.trim() || null,
      rating: rating ?? 5,
      sortOrder: (max._max?.sortOrder ?? -1) + 1,
    },
  });
  refresh();
  return { ok: true };
}

const updateSchema = z.object({
  id: z.string().min(1),
  name: z.string().trim().min(1, "Укажите имя").max(100),
  text: z.string().trim().min(1, "Укажите текст").max(2000),
  brand: z.string().trim().optional().nullable(),
  brandUrl: z.string().trim().optional().nullable(),
  rating: z.number().int().min(1).max(5).optional(),
});

export async function updateReview(
  id: string,
  data: { name: string; text: string; brand?: string; brandUrl?: string; rating?: number },
): Promise<{ ok: boolean; info?: string }> {
  await requireSession();
  const parsed = updateSchema.safeParse({ id, ...data });
  if (!parsed.success) {
    return { ok: false, info: parsed.error.errors[0]?.message ?? "Проверьте поля" };
  }
  await (prisma as any).review.update({
    where: { id },
    data: {
      name: parsed.data.name,
      text: parsed.data.text,
      brand: parsed.data.brand || null,
      brandUrl: parsed.data.brandUrl || null,
      rating: parsed.data.rating ?? 5,
    },
  });
  refresh();
  return { ok: true };
}

export async function deleteReview(id: string) {
  await requireSession();
  await (prisma as any).review.delete({ where: { id } });
  refresh();
}

export async function moveReview(id: string, dir: "up" | "down") {
  await requireSession();
  const rows = await (prisma as any).review.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    select: { id: true },
  });
  const idx = rows.findIndex((r: any) => r.id === id);
  if (idx === -1) return;
  const swapWith = dir === "up" ? idx - 1 : idx + 1;
  if (swapWith < 0 || swapWith >= rows.length) return;

  const order = rows.map((r: any) => r.id);
  [order[idx], order[swapWith]] = [order[swapWith], order[idx]];

  await prisma.$transaction(
    order.map((rid: string, i: number) =>
      (prisma as any).review.update({ where: { id: rid }, data: { sortOrder: i } }),
    ),
  );
  refresh();
}
