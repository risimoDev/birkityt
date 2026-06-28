"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export type FaqItem = { q: string; a: string };

export function Faq({
  items,
  eyebrow,
  heading,
  lead,
}: {
  items: FaqItem[];
  eyebrow: string;
  heading: string;
  lead: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-onbutton">
            / {eyebrow}
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-textColorDark sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-4 text-textColor">{lead}</p>
        </div>

        <div className="divide-y divide-textColorDark/10 border-y border-textColorDark/10">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={i}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-mono text-xs text-textColor/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-lg font-semibold text-textColorDark">
                    {it.q}
                  </span>
                  <span
                    className={cn(
                      "grid h-7 w-7 shrink-0 place-items-center rounded-full border border-textColorDark/20 text-textColorDark transition-transform",
                      isOpen && "rotate-45 border-onbutton bg-onbutton text-white",
                    )}
                  >
                    +
                  </span>
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300",
                    isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]",
                  )}
                >
                  <p
                    className="overflow-hidden pl-9 text-textColor"
                    dangerouslySetInnerHTML={{ __html: it.a }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
