"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/auth-helpers";
import { CALC_CONFIG_KEY, normalizeCalcConfig } from "@/lib/calc-config";

const schema = z.object({
  lengthEnabled: z.boolean(),
  lengthLabel: z.string().trim().max(64),
  lengthOptions: z.array(
    z.object({
      label: z.string().trim().max(32),
      surcharge: z.coerce.number().int().min(0).max(100000),
    }),
  ),
  frayingEnabled: z.boolean(),
  frayingLabel: z.string().trim().max(64),
  frayingSurcharge: z.coerce.number().int().min(0).max(100000),
  quantityPresets: z.array(z.coerce.number().int().min(1).max(10_000_000)),
  defaultQuantity: z.coerce.number().int().min(1).max(10_000_000),
});

export async function saveCalcConfig(
  input: unknown,
): Promise<{ ok: boolean; info?: string }> {
  await requireSession();
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, info: parsed.error.errors[0]?.message ?? "Проверьте поля" };
  }
  // Normalize (drops empty rows, clamps) before persisting.
  const config = normalizeCalcConfig(parsed.data);

  await prisma.setting.upsert({
    where: { key: CALC_CONFIG_KEY },
    update: { value: JSON.stringify(config) },
    create: { key: CALC_CONFIG_KEY, value: JSON.stringify(config) },
  });

  revalidatePath("/calc");
  revalidatePath("/admin/calc");
  return { ok: true };
}
