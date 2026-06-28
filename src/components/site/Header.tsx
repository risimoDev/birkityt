"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/lib/nav";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/site/Logo";

export function Header({
  phone,
  hours,
  telegram,
}: {
  phone: string;
  hours: string;
  telegram: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50">
      {/* utility bar */}
      <div className="hidden bg-textColorDark text-mainColor/80 md:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-1.5 text-xs tracking-wide">
          <span className="font-mono uppercase">label atelier // Пермь · производство бирок</span>
          <div className="flex items-center gap-5">
            <span>{hours}</span>
            <a href={telegram} className="hover:text-white" target="_blank" rel="noopener">
              Telegram
            </a>
            <a href={`tel:${phone.replace(/[^+\d]/g, "")}`} className="font-semibold text-white">
              {phone}
            </a>
          </div>
        </div>
      </div>

      {/* main bar */}
      <div
        className={cn(
          "border-b transition-colors duration-300",
          scrolled
            ? "border-textColorDark/10 bg-mainColor/85 backdrop-blur-md"
            : "border-transparent bg-mainColor",
        )}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-baseline gap-2">
            <Logo />
            <span className="hidden font-mono text-[10px] uppercase text-textColor/60 sm:inline">
              est. 2018
            </span>
          </div>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium transition-colors",
                    active ? "text-textColorDark" : "text-textColor hover:text-textColorDark",
                  )}
                >
                  {item.label}
                  {active && (
                    <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-onbutton" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/calc"
              className="hidden rounded-full bg-textColorDark px-5 py-2.5 text-sm font-semibold text-mainColor transition-transform hover:-translate-y-0.5 hover:bg-onbutton hover:text-white sm:inline-block"
            >
              Рассчитать заказ
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-textColorDark/15 lg:hidden"
              aria-label="Меню"
              aria-expanded={open}
            >
              <span className="relative block h-3.5 w-5">
                <span
                  className={cn(
                    "absolute left-0 top-0 h-0.5 w-5 bg-textColorDark transition-transform",
                    open && "translate-y-1.5 rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-1.5 h-0.5 w-5 bg-textColorDark transition-opacity",
                    open && "opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-3 h-0.5 w-5 bg-textColorDark transition-transform",
                    open && "-translate-y-1.5 -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </div>

        {/* mobile panel */}
        <div
          className={cn(
            "overflow-hidden border-t border-textColorDark/10 lg:hidden",
            open ? "max-h-96" : "max-h-0 border-t-transparent",
            "transition-all duration-300",
          )}
        >
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-xl px-3 py-2.5 text-sm font-medium",
                  pathname === item.href
                    ? "bg-onbutton/15 text-textColorDark"
                    : "text-textColor hover:bg-textColorDark/5",
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/calc"
              className="mt-2 rounded-xl bg-textColorDark px-3 py-3 text-center text-sm font-semibold text-mainColor"
            >
              Рассчитать заказ
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
