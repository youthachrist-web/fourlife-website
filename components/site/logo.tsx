"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { site } from "@/lib/content";

/**
 * FourLife wordmark. If the image ever fails to load it falls back to a styled
 * text lockup so the header/footer is never left blank.
 */
export function Logo({
  variant = "color",
  className,
  priority = false,
}: {
  variant?: "color" | "white";
  className?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const src =
    variant === "white"
      ? "/brand/fourlife-wordmark-white.png"
      : "/brand/fourlife-wordmark.png";

  return (
    <Link
      href="/"
      aria-label={`${site.name} — página inicial`}
      className={cn("inline-flex items-center", className)}
    >
      {failed ? (
        <span
          className={cn(
            "font-display text-xl font-bold tracking-tight",
            variant === "white" ? "text-white" : "text-brand-500",
          )}
        >
          four<span className={variant === "white" ? "text-white" : "text-lime-500"}>Life</span>
        </span>
      ) : (
        <Image
          src={src}
          alt={site.name}
          width={716}
          height={212}
          priority={priority}
          onError={() => setFailed(true)}
          className="h-7 w-auto sm:h-8"
        />
      )}
    </Link>
  );
}
