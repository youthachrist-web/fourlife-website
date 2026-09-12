"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const BODY_X = 4;
const BODY_Y = 6;
const BODY_W = 104;
const BODY_H = 40;
const FILL_PAD = 4;

/**
 * A battery that charges up to `value` (0–100) the first time it scrolls
 * into view — the deck's own "presenteísmo" battery icons, brought to life.
 * Used to show progress through the 6-month FourLife cycle.
 */
export function BatteryGauge({
  value,
  label,
  duration = 1500,
  className,
}: {
  value: number;
  label?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [fraction, setFraction] = useState(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let raf = 0;
    let done = false;

    const run = () => {
      if (done) return;
      done = true;

      if (prefersReducedMotion()) {
        setFraction(Math.min(1, value / 100));
        setDisplay(value);
        return;
      }
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setFraction(Math.min(1, eased * (value / 100)));
        setDisplay(Math.round(eased * value));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const rect = node.getBoundingClientRect();
    const onScreen = rect.top < window.innerHeight * 0.85 && rect.bottom > 0;
    if (onScreen) {
      run();
      return;
    }
    if (typeof IntersectionObserver === "undefined") {
      run();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.5, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(node);
    const failsafe = window.setTimeout(run, 7000);
    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  const fillWidth = (BODY_W - FILL_PAD * 2) * fraction;
  const tone = fraction >= 0.99 ? "var(--lime-400)" : "var(--brand-400)";

  return (
    <div ref={ref} className={cn("flex items-center gap-3", className)}>
      <svg viewBox="0 0 120 54" className="h-9 w-[72px] shrink-0" aria-hidden>
        <rect
          x={BODY_X}
          y={BODY_Y}
          width={BODY_W}
          height={BODY_H}
          rx={8}
          fill="none"
          stroke="var(--line)"
          strokeWidth="3"
        />
        <rect x={110} y={18} width={8} height={18} rx={2} fill="var(--line)" />
        <rect
          x={BODY_X + FILL_PAD}
          y={BODY_Y + FILL_PAD}
          width={Math.max(0, fillWidth)}
          height={BODY_H - FILL_PAD * 2}
          rx={5}
          fill={tone}
          style={{
            filter: `drop-shadow(0 0 5px ${tone})`,
            transition: "width 80ms linear",
          }}
        />
      </svg>
      <div>
        <p className="font-display text-lg font-semibold text-ink">{display}%</p>
        {label ? <p className="text-xs leading-snug text-muted">{label}</p> : null}
      </div>
    </div>
  );
}
