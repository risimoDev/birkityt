import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { UsersManager, type UserView } from "@/components/admin/UsersManager";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");
  if (session.user.role !== "ADMIN") {
    return (
      <div className="rounded-2xl border border-dashed border-textColorDark/20 p-10 text-center text-textColor">
        Доступ только для роли ADMIN.
      </div>
    );
  }

  const users = await prisma.user.findMany({ orderBy: { createdAt: "asc" } });
  const view: UserView[] = users.map((u) => ({
    id: u.id,
    email: u.email,
    name: u.name,
    role: u.role,
    createdAt: u.createdAt.toISOString(),
    self: u.id === session.user.id,
  }));

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight text-textColorDark">
        Пользователи
      </h1>
      <p className="mt-1 text-textColor">Доступ в панель и роли.</p>
      <div className="mt-6">
        <UsersManager users={view} />
      </div>
    </div>
  );
}
