"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import type { WorkDTO } from "@/lib/works";
import { cn } from "@/lib/cn";

export function Gallery({ works }: { works: WorkDTO[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + works.length) % works.length)),
    [works.length],
  );
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % works.length)),
    [works.length],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, prev, next]);

  if (works.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-textColorDark/20 bg-onbutton/5 px-6 py-20 text-center">
        <p className="text-textColor">
          Работы скоро появятся здесь. Загляните позже!
        </p>
      </div>
    );
  }

  const active = index !== null ? works[index] : null;

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {works.map((w, i) => (
          <button
            key={w.id}
            type="button"
            onClick={() => setIndex(i)}
            className="group relative aspect-square overflow-hidden rounded-2xl border border-textColorDark/10 bg-white"
          >
            <Image
              src={w.image}
              alt={w.title || "Работа"}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute left-3 top-3 h-3 w-3 rounded-full border-2 border-white/70 bg-white/20" />
            <div className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-textColorDark/80 to-transparent p-3 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
              {w.title && (
                <div className="truncate text-sm font-semibold text-white">{w.title}</div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* lightbox */}
      <div
        className={cn(
          "fixed inset-0 z-[60] flex items-center justify-center bg-textColorDark/95 p-4 transition-opacity",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={close}
      >
        {active && (
          <>
            <button
              type="button"
              onClick={close}
              className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-mainColor/30 text-xl text-mainColor hover:bg-mainColor/10"
              aria-label="Закрыть"
            >
              ✕
            </button>
            {works.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                  className="absolute left-4 grid h-11 w-11 place-items-center rounded-full border border-mainColor/30 text-2xl text-mainColor hover:bg-mainColor/10"
                  aria-label="Предыдущее"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                  className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-mainColor/30 text-2xl text-mainColor hover:bg-mainColor/10"
                  aria-label="Следующее"
                >
                  ›
                </button>
              </>
            )}
            <figure
              className="relative max-h-[85vh] w-auto max-w-[92vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={active.image}
                alt={active.title || "Работа"}
                width={1200}
                height={1200}
                className="max-h-[80vh] w-auto rounded-2xl object-contain"
              />
              {(active.title || active.description) && (
                <figcaption className="mt-3 text-center text-mainColor/80">
                  {active.title && <span className="font-semibold">{active.title}</span>}
                  {active.description && (
                    <span className="block text-sm text-mainColor/60">
                      {active.description}
                    </span>
                  )}
                </figcaption>
              )}
            </figure>
          </>
        )}
      </div>
    </>
  );
}
