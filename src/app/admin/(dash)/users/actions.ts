"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth-helpers";

const createSchema = z.object({
  email: z.string().trim().toLowerCase().email("Неверный email"),
  name: z.string().trim().max(200).optional(),
  role: z.enum(["ADMIN", "MANAGER"]),
  password: z.string().min(8, "Минимум 8 символов"),
});

export async function createUser(
  _prev: string | undefined,
  formData: FormData,
): Promise<string | undefined> {
  await requireAdmin();
  const parsed = createSchema.safeParse({
    email: formData.get("email"),
    name: formData.get("name") || undefined,
    role: formData.get("role"),
    password: formData.get("password"),
  });
  if (!parsed.success) return parsed.error.errors[0]?.message ?? "Проверьте поля";

  const exists = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (exists) return "Пользователь с таким email уже существует";

  await prisma.user.create({
    data: {
      email: parsed.data.email,
      name: parsed.data.name ?? null,
      role: parsed.data.role,
      passwordHash: await bcrypt.hash(parsed.data.password, 12),
    },
  });
  revalidatePath("/admin/users");
  return undefined;
}

export async function setRole(id: string, role: string) {
  await requireAdmin();
  if (role !== "ADMIN" && role !== "MANAGER") return;
  await prisma.user.update({ where: { id }, data: { role } });
  revalidatePath("/admin/users");
}

export async function resetPassword(id: string, password: string) {
  await requireAdmin();
  if (password.length < 8) return;
  await prisma.user.update({
    where: { id },
    data: { passwordHash: await bcrypt.hash(password, 12) },
  });
  revalidatePath("/admin/users");
}

export async function deleteUser(id: string) {
  const session = await requireAdmin();
  if (session.user.id === id) return; // can't delete self
  const admins = await prisma.user.count({ where: { role: "ADMIN" } });
  const target = await prisma.user.findUnique({ where: { id } });
  if (target?.role === "ADMIN" && admins <= 1) return; // keep at least one admin
  await prisma.user.delete({ where: { id } });
  revalidatePath("/admin/users");
}
