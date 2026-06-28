import { redirect } from "next/navigation";
import { auth } from "@/auth";
import type { Role } from "@prisma/client";

/** Ensure a user is signed in; redirect to login otherwise. */
export async function requireSession() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");
  return session;
}

/** Ensure the signed-in user is an ADMIN; throw otherwise. */
export async function requireAdmin() {
  const session = await requireSession();
  if (session.user.role !== ("ADMIN" satisfies Role)) {
    throw new Error("Forbidden: требуется роль ADMIN");
  }
  return session;
}
