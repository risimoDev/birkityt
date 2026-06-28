import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * The original CorelDRAW wordmark (single-colour black SVG).
 * On dark surfaces pass `variant="light"` to invert it to cream/white.
 */
export function Logo({
  variant = "dark",
  className,
  href = "/",
}: {
  variant?: "dark" | "light";
  className?: string;
  href?: string | null;
}) {
  const img = (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src="/images/logo.svg"
      alt="БИРКИТУТ"
      className={cn(
        "h-9 w-auto sm:h-10",
        variant === "light" && "[filter:brightness(0)_invert(1)]",
        className,
      )}
    />
  );

  if (href === null) return img;
  return (
    <Link href={href} aria-label="БИРКИТУТ — на главную" className="inline-flex">
      {img}
    </Link>
  );
}
