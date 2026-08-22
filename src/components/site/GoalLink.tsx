"use client";

import Link from "next/link";
import { reachGoal, type Goal } from "@/lib/metrika";

/**
 * Link variants that report a Metrika goal on click. They exist so that server
 * components (Footer, Hero, /price) can track clicks without becoming client
 * components themselves.
 */

export function GoalLink({
  href,
  goal,
  className,
  children,
}: {
  href: string;
  goal: Goal;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={className} onClick={() => reachGoal(goal)}>
      {children}
    </Link>
  );
}

export function GoalAnchor({
  href,
  goal,
  external,
  className,
  children,
}: {
  href: string;
  goal: Goal;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener" } : {})}
      className={className}
      onClick={() => reachGoal(goal)}
    >
      {children}
    </a>
  );
}
