import { cn } from "@/lib/cn";

/**
 * Brand motif: a clothing-tag shape with a punched eyelet and a stitched
 * (dashed) border. Used as a recurring visual signature across the site.
 */
export function TagShape({
  className,
  children,
  tone = "blue",
}: {
  className?: string;
  children?: React.ReactNode;
  tone?: "blue" | "cream" | "ink";
}) {
  const tones = {
    blue: "bg-onbutton text-white border-white/40",
    cream: "bg-mainColor text-textColorDark border-textColorDark/20",
    ink: "bg-textColorDark text-mainColor border-mainColor/30",
  } as const;

  return (
    <div
      className={cn(
        "relative inline-flex items-center rounded-2xl border border-dashed px-5 py-3",
        // notched top-left corner via clip-path
        "[clip-path:polygon(14px_0,100%_0,100%_100%,0_100%,0_14px)]",
        tones[tone],
        className,
      )}
    >
      {/* eyelet */}
      <span className="absolute left-3 top-3 h-2.5 w-2.5 rounded-full border border-current opacity-60" />
      <span className="pl-3">{children}</span>
    </div>
  );
}

/** A thin dashed "seam" divider. */
export function Seam({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "h-px w-full border-t border-dashed border-textColorDark/15",
        className,
      )}
    />
  );
}
