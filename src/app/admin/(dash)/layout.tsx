import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { AdminNav } from "@/components/admin/AdminNav";

export const dynamic = "force-dynamic";

export default async function DashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-mainColor md:flex">
      <AdminNav role={session.user.role} email={session.user.email ?? ""} />
      <div className="min-w-0 flex-1">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-8">{children}</div>
      </div>
    </div>
  );
}
