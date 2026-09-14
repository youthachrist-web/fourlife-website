import { cn } from "@/lib/cn";

const RING_R = 16;
const RING_C = 2 * Math.PI * RING_R;

/**
 * Small donut chart that encodes a real 0–100 value (not just a decorative
 * "position in set" ring like the one in Differentials/HealthJourney). Draws
 * in together with the nearest ancestor <Reveal> via the shared `.chart-ring`
 * CSS in globals.css. Pure/static — no client JS needed.
 */
export function StatRing({
  percent,
  label,
  tone = "brand",
  className,
}: {
  /** 0–100 */
  percent: number;
  /** Accessible description, e.g. "74% dos colaboradores afetados". */
  label: string;
  tone?: "brand" | "lime" | "error";
  className?: string;
}) {
  const clamped = Math.max(0, Math.min(100, percent));
  const offset = RING_C * (1 - clamped / 100);
  const stroke =
    tone === "lime" ? "var(--lime-400)" : tone === "error" ? "var(--error)" : "var(--brand-500)";

  return (
    <span
      role="img"
      aria-label={label}
      className={cn("relative inline-flex h-14 w-14 shrink-0 items-center justify-center", className)}
    >
      <svg viewBox="0 0 40 40" className="h-14 w-14 -rotate-90">
        <circle cx="20" cy="20" r={RING_R} fill="none" stroke="var(--line)" strokeWidth="4" />
        <circle
          cx="20"
          cy="20"
          r={RING_R}
          fill="none"
          stroke={stroke}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={RING_C}
          className="chart-ring"
          style={
            {
              "--ring-circumference": RING_C,
              "--ring-offset": offset,
            } as React.CSSProperties
          }
        />
      </svg>
      <span aria-hidden className="absolute font-display text-[11px] font-semibold text-ink">
        {Math.round(clamped)}%
      </span>
    </span>
  );
}
