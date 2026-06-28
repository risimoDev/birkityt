"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/auth-helpers";

const statusEnum = z.enum(["NEW", "IN_PROGRESS", "DONE", "SPAM"]);

export async function setStatus(id: string, status: string) {
  await requireSession();
  const parsed = statusEnum.safeParse(status);
  if (!parsed.success) return;
  await prisma.submission.update({
    where: { id },
    data: { status: parsed.data },
  });
  revalidatePath("/admin/submissions");
  revalidatePath("/admin");
}

export async function saveNote(id: string, note: string) {
  await requireSession();
  await prisma.submission.update({
    where: { id },
    data: { note: note.slice(0, 4000) },
  });
  revalidatePath("/admin/submissions");
}

export async function deleteSubmission(id: string) {
  await requireSession();
  await prisma.submission.delete({ where: { id } });
  revalidatePath("/admin/submissions");
  revalidatePath("/admin");
}
