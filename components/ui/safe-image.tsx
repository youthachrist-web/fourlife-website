"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Drop-in <Image> that never breaks the layout:
 * - always lives in a fixed-ratio box, so a slow/broken image can't shift or
 *   stretch anything;
 * - on load error it fades to a neutral brand-tinted placeholder instead of a
 *   broken-image icon;
 * - `sizes` is required-by-convention (defaulted) to keep responsive loading sane.
 *
 * Use `ratio` (e.g. "4 / 5", "16 / 9", "1 / 1") for the box; pass `contain` for
 * logos so they are never cropped.
 */
export function SafeImage({
  src,
  alt,
  ratio = "4 / 5",
  contain = false,
  rounded = "rounded-2xl",
  className,
  imgClassName,
  sizes = "(max-width: 768px) 100vw, 33vw",
  priority,
}: {
  src: string;
  alt: string;
  ratio?: string;
  contain?: boolean;
  rounded?: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-surface-2",
        rounded,
        className,
      )}
      style={{ aspectRatio: ratio }}
    >
      {failed ? (
        <div className="absolute inset-0 flex items-center justify-center bg-brand-50 text-brand-300">
          <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" aria-hidden>
            <path
              d="M4 5h16v14H4z M4 15l4-4 4 4 3-3 5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <circle cx="9" cy="9" r="1.6" fill="currentColor" />
          </svg>
          <span className="sr-only">{alt}</span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          onError={() => setFailed(true)}
          className={cn(
            contain ? "object-contain" : "object-cover",
            "transition-opacity duration-500",
            imgClassName,
          )}
        />
      )}
    </div>
  );
}
