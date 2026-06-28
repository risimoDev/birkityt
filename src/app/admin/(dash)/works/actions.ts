"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/auth-helpers";
import { saveWorkImage, deleteUpload } from "@/lib/uploads";

const MAX_BYTES = 12 * 1024 * 1024;

function refresh() {
  revalidatePath("/admin/works");
  revalidatePath("/works");
}

export async function uploadWork(
  _prev: string | undefined,
  formData: FormData,
): Promise<string | undefined> {
  await requireSession();

  const file = formData.get("image");
  const title = String(formData.get("title") ?? "").trim().slice(0, 200);
  const description = String(formData.get("description") ?? "").trim().slice(0, 500);
  const categoryId = String(formData.get("categoryId") ?? "").trim() || null;

  if (!(file instanceof File) || file.size === 0) return "Выберите изображение";
  if (!file.type.startsWith("image/")) return "Файл должен быть изображением";
  if (file.size > MAX_BYTES) return "Файл слишком большой (макс. 12 МБ)";

  try {
    const { webpPath } = await saveWorkImage(file);
    const max = await prisma.work.aggregate({ _max: { sortOrder: true } });
    await prisma.work.create({
      data: {
        title: title || null,
        description: description || null,
        imageWebp: webpPath,
        categoryId,
        sortOrder: (max._max.sortOrder ?? -1) + 1,
      },
    });
  } catch (e) {
    return "Не удалось обработать изображение: " + (e as Error).message;
  }

  refresh();
  return undefined;
}

const updateSchema = z.object({
  id: z.string().min(1),
  title: z.string().trim().max(200),
  description: z.string().trim().max(500),
  categoryId: z.string().nullable(),
});

export async function updateWork(
  id: string,
  title: string,
  description: string,
  categoryId: string | null,
) {
  await requireSession();
  const parsed = updateSchema.safeParse({ id, title, description, categoryId });
  if (!parsed.success) return;
  await prisma.work.update({
    where: { id },
    data: {
      title: parsed.data.title || null,
      description: parsed.data.description || null,
      categoryId: parsed.data.categoryId || null,
    },
  });
  refresh();
}

export async function deleteWork(id: string) {
  await requireSession();
  const work = await prisma.work.findUnique({ where: { id } });
  if (!work) return;
  await prisma.work.delete({ where: { id } });
  await deleteUpload(work.imageWebp); // no-op for seeded /images/works files
  refresh();
}
