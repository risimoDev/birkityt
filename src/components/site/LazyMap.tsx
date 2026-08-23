"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Yandex.Maps widget that mounts only once it scrolls into view.
 *
 * The widget pulls a heavy script of its own, and the contacts block sits at
 * the very bottom of the homepage — loading it eagerly cost every visitor the
 * traffic whether or not they ever reached the map.
 */
export function LazyMap({ src, title }: { src: string; title: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Without IntersectionObserver (very old browsers) just show the map.
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      // Start loading slightly before the map is actually on screen.
      { rootMargin: "200px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="h-56 w-full">
      {visible ? (
        <iframe
          title={title}
          className="h-56 w-full"
          loading="lazy"
          src={src}
          style={{ filter: "grayscale(1) contrast(1.1) opacity(0.75)" }}
        />
      ) : (
        <div
          aria-hidden
          className="flex h-56 w-full items-center justify-center bg-mainColor/5"
        >
          <span className="font-mono text-[11px] uppercase tracking-widest text-mainColor/40">
            карта загружается
          </span>
        </div>
      )}
    </div>
  );
}
