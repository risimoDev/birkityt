"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Role } from "@prisma/client";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/site/Logo";
import { logoutAction } from "@/app/admin/(dash)/actions";

const LINKS: { href: string; label: string; adminOnly?: boolean }[] = [
  { href: "/admin", label: "Обзор" },
  { href: "/admin/submissions", label: "Заявки" },
  { href: "/admin/content", label: "Контент" },
  { href: "/admin/prices", label: "Цены" },
  { href: "/admin/calc", label: "Калькулятор" },
  { href: "/admin/works", label: "Работы" },
  { href: "/admin/seo", label: "SEO" },
  { href: "/admin/users", label: "Пользователи", adminOnly: true },
];

export function AdminNav({ role, email }: { role: Role; email: string }) {
  const pathname = usePathname();

  return (
    <aside className="flex shrink-0 flex-col gap-1 border-b border-textColorDark/10 bg-white/60 p-4 md:h-screen md:w-60 md:border-b-0 md:border-r">
      <div className="mb-4 px-2">
        <Logo className="h-8" />
        <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-textColor/50">
          панель
        </div>
      </div>

      <nav className="flex flex-row flex-wrap gap-1 md:flex-col">
        {LINKS.filter((l) => !l.adminOnly || role === "ADMIN").map((l) => {
          const active = l.href === "/admin" ? pathname === l.href : pathname.startsWith(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-textColorDark text-mainColor"
                  : "text-textColor hover:bg-textColorDark/5 hover:text-textColorDark",
              )}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto hidden border-t border-textColorDark/10 pt-3 md:block">
        <div className="px-2 text-xs text-textColor/70">{email}</div>
        <div className="px-2 font-mono text-[10px] uppercase tracking-wider text-onbutton">
          {role}
        </div>
        <form action={logoutAction} className="mt-2">
          <button className="w-full rounded-xl border border-textColorDark/15 px-3 py-2 text-sm text-textColorDark hover:border-textColorDark/40">
            Выйти
          </button>
        </form>
      </div>
    </aside>
  );
}
