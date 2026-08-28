"use client";

import { buttonClass } from "@/components/ui/button";
import { useLeadModal } from "./lead-modal";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

/** A CTA button that opens the lead-capture modal instead of navigating. */
export function LeadCta({
  children,
  variant,
  size,
  className,
  interest,
}: {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  interest?: string;
}) {
  const { open } = useLeadModal();
  return (
    <button
      type="button"
      className={buttonClass({ variant, size, className })}
      onClick={() => open(interest)}
    >
      {children}
    </button>
  );
}
