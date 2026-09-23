"use server";

import { z } from "zod";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

const publicReviewSchema = z.object({
  name: z.string().trim().min(2, "Укажите ваше имя (минимум 2 символа)").max(100),
  brand: z.string().trim().max(100).optional().nullable(),
  text: z.string().trim().min(5, "Текст отзыва должен содержать минимум 5 символов").max(2000),
  rating: z.number().int().min(1).max(5),
  consent: z.boolean().refine((val) => val === true, "Необходимо согласие на обработку данных"),
  company: z.string().max(0).optional(), // Honeypot
});

export async function submitPublicReview(data: {
  name: string;
  brand?: string;
  text: string;
  rating: number;
  consent: boolean;
  company?: string;
}): Promise<{ ok: boolean; info?: string }> {
  // Honeypot anti-spam check
  if (data.company) {
    return { ok: true }; // Silently ignore bot submission
  }

  const parsed = publicReviewSchema.safeParse(data);
  if (!parsed.success) {
    return { ok: false, info: parsed.error.errors[0]?.message ?? "Пожалуйста, проверьте введённые данные" };
  }

  try {
    const max = await (prisma as any).review.aggregate({ _max: { sortOrder: true } });
    await (prisma as any).review.create({
      data: {
        name: parsed.data.name,
        brand: parsed.data.brand || null,
        text: parsed.data.text,
        rating: parsed.data.rating,
        isPublished: false, // Moderation required: published only after admin approval
        sortOrder: (max._max?.sortOrder ?? -1) + 1,
      },
    });

    revalidatePath("/admin/reviews");
    return { ok: true };
  } catch (err) {
    console.error("Failed to submit review:", err);
    return { ok: false, info: "Не удалось отправить отзыв. Попробуйте позже." };
  }
}
