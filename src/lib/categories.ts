import { prisma } from "@/lib/db";

export type CategoryDTO = { id: string; slug: string; name: string };

export async function getWorkCategories(): Promise<CategoryDTO[]> {
  try {
    const cats = await prisma.category.findMany({
      where: { kind: "WORK" },
      orderBy: { sortOrder: "asc" },
      select: { id: true, slug: true, name: true },
    });
    return cats;
  } catch {
    return [];
  }
}
