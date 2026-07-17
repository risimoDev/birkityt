import { prisma } from "@/lib/db";

export type MaterialDTO = { id: string; title: string; text: string };

/**
 * Default material cards, used to seed the DB and as a fallback when the
 * Material table is empty (fresh install / Docker build without a DB).
 */
export const DEFAULT_MATERIALS: { title: string; text: string }[] = [
  {
    title: "Силиконовая бирка",
    text: "Лента матовая, полупрозрачная, приятная на ощупь, эластичная и элегантная.",
  },
  {
    title: "Хлопковая бирка",
    text: "Плотный рельефный материал в нескольких оттенках. Стойкая печать методом сублимации.",
  },
  {
    title: "Премиум сатин",
    text: "Высококачественная сатиновая ленточка с тканым краем. Смотрится презентабельно и дорого.",
  },
  {
    title: "Киперная лента",
    text: "Белая киперная лента с выраженной текстурой. Плотная, принимает любую форму. 100% полиэстер.",
  },
  {
    title: "Картонная бирка",
    text: "В одностороннем и двустороннем варианте, для логотипа, состава и ценников.",
  },
];

/**
 * Material cards for the public /materials page and the admin editor.
 * Falls back to DEFAULT_MATERIALS when the table is empty or unavailable.
 */
export async function getMaterials(): Promise<MaterialDTO[]> {
  try {
    const rows = await prisma.material.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });
    if (rows.length) {
      return rows.map((r) => ({ id: r.id, title: r.title, text: r.text }));
    }
  } catch {
    /* fall through to defaults */
  }
  return DEFAULT_MATERIALS.map((m, i) => ({ id: `default-${i}`, ...m }));
}
