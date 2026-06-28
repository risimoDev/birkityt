import { prisma } from "@/lib/db";
import type { Prisma } from "@prisma/client";

export type WorkDTO = {
  id: string;
  title: string;
  description: string | null;
  image: string;
  categoryId: string | null;
  categoryName: string | null;
  categorySlug: string | null;
};

export async function getWorks(opts?: { categorySlug?: string }): Promise<WorkDTO[]> {
  try {
    const where: Prisma.WorkWhereInput | undefined = opts?.categorySlug
      ? { category: { slug: opts.categorySlug } }
      : undefined;
    const works = await prisma.work.findMany({
      where,
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      include: { category: true },
    });
    return works.map((w) => ({
      id: w.id,
      title: w.title ?? "",
      description: w.description,
      image: w.imageWebp || w.imageOriginal || "",
      categoryId: w.categoryId,
      categoryName: w.category?.name ?? null,
      categorySlug: w.category?.slug ?? null,
    }));
  } catch {
    return [];
  }
}
