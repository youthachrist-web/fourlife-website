import Image from "next/image";
import { cn } from "@/lib/cn";
import type { Solution } from "@/lib/content";

/**
 * Renders a solution's logo, or a clean monogram when no logo file exists
 * (e.g. SGG). Used in the ecosystem tab strip and cards.
 */
export function LogoBadge({
  solution,
  size = "md",
  className,
}: {
  solution: Pick<Solution, "name" | "logo" | "accent">;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const box = {
    sm: "h-7",
    md: "h-9",
    lg: "h-12",
  }[size];

  if (solution.logo) {
    return (
      <span className={cn("inline-flex items-center", box, className)}>
        <Image
          src={solution.logo}
          alt={`Logo ${solution.name}`}
          width={200}
          height={72}
          className="h-full w-auto max-w-[8.5rem] object-contain"
        />
      </span>
    );
  }

  const tone =
    solution.accent === "lime"
      ? "bg-lime-100 text-lime-700"
      : solution.accent === "slate"
        ? "bg-surface-3 text-slate"
        : "bg-brand-50 text-brand-700";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-lg px-2.5 font-display font-semibold tracking-tight",
        box,
        tone,
        size === "lg" ? "text-lg" : "text-sm",
        className,
      )}
    >
      {solution.name}
    </span>
  );
}
