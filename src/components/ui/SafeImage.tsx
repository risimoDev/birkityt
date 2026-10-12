"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";

interface SafeImageProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string;
}

export function SafeImage({
  src,
  alt,
  fallbackSrc = "/images/og-cover.jpg",
  className,
  ...rest
}: SafeImageProps) {
  const [errorCount, setErrorCount] = useState(0);
  const isFailedCompletely = errorCount >= 2;

  // If initial src is falsy or completely failed, show placeholder UI
  if (!src || isFailedCompletely) {
    return (
      <div
        className={`flex items-center justify-center bg-textColorDark/5 text-textColorDark/30 ${className ?? ""}`}
        role="img"
        aria-label={alt || "Изображение"}
      >
        <svg
          className="h-8 w-8 opacity-40"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
      </div>
    );
  }

  const currentSrc = errorCount === 0 ? src : fallbackSrc;

  return (
    <Image
      {...rest}
      src={currentSrc}
      alt={alt}
      className={className}
      onError={() => {
        setErrorCount((prev) => prev + 1);
      }}
    />
  );
}
