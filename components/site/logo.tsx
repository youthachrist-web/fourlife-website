import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { site } from "@/lib/content";

export function Logo({
  variant = "color",
  className,
  priority = false,
}: {
  variant?: "color" | "white";
  className?: string;
  priority?: boolean;
}) {
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
      <Image
        src={src}
        alt={site.name}
        width={716}
        height={212}
        priority={priority}
        className="h-7 w-auto sm:h-8"
      />
    </Link>
  );
}
