"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/auth-helpers";
import { saveWorkImage, deleteUpload } from "@/lib/uploads";
import { ALL_MEDIA_SLOTS } from "@/lib/media";

const MAX_BYTES = 12 * 1024 * 1024;
const VALID_KEYS = new Set(ALL_MEDIA_SLOTS.map((s) => s.key));

function refresh() {
  revalidatePath("/admin/media");
  revalidatePath("/", "layout");
}

export async function uploadMedia(
  _prev: string | undefined,
  formData: FormData,
): Promise<string | undefined> {
  await requireSession();

  const key = String(formData.get("key") ?? "");
  const file = formData.get("image");
  if (!VALID_KEYS.has(key)) return "Неизвестный слот изображения";
  if (!(file instanceof File) || file.size === 0) return "Выберите изображение";
  if (!file.type.startsWith("image/")) return "Файл должен быть изображением";
  if (file.size > MAX_BYTES) return "Файл слишком большой (макс. 12 МБ)";

  try {
    // Remove the previously uploaded file for this slot (no-op for defaults).
    const prev = await prisma.setting.findUnique({ where: { key } });
    const { webpPath } = await saveWorkImage(file);
    await prisma.setting.upsert({
      where: { key },
      update: { value: webpPath },
      create: { key, value: webpPath },
    });
    if (prev?.value) await deleteUpload(prev.value);
  } catch (e) {
    return "Не удалось обработать изображение: " + (e as Error).message;
  }

  refresh();
  return undefined;
}

/** Reset a slot back to the bundled default (removes the override + upload). */
export async function resetMedia(key: string) {
  await requireSession();
  if (!VALID_KEYS.has(key)) return;
  const prev = await prisma.setting.findUnique({ where: { key } });
  if (prev) {
    await prisma.setting.delete({ where: { key } });
    await deleteUpload(prev.value);
  }
  refresh();
}
