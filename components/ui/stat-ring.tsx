"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const RADIUS = 42;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * Animated radial progress gauge — a glass, dashboard-style stat card.
 * The ring sweeps in and the number counts up together, the first time it
 * scrolls into view. `value` is a 0–100 percentage; respects reduced motion.
 */
export function StatRing({
  value,
  label,
  suffix = "%",
  duration = 1600,
  tone = "lime",
  className,
}: {
  value: number;
  label: string;
  suffix?: string;
  duration?: number;
  tone?: "lime" | "brand";
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

  const offset = CIRCUMFERENCE * (1 - fraction);
  const ringColor = tone === "lime" ? "var(--lime-400)" : "var(--brand-300)";

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex flex-col items-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-brand-800 via-brand-900 to-ink p-6 text-center shadow-[0_1px_2px_rgba(0,0,0,0.4),0_20px_40px_-20px_rgba(0,0,0,0.65)]",
        className,
      )}
    >
      {/* Glass sheen + glow accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-lime-400/20 blur-3xl"
      />

      <svg viewBox="0 0 100 100" className="relative h-24 w-24">
        <circle
          cx="50"
          cy="50"
          r={RADIUS}
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="8"
        />
        <circle
          cx="50"
          cy="50"
          r={RADIUS}
          fill="none"
          stroke={ringColor}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          transform="rotate(-90 50 50)"
          style={{
            filter: `drop-shadow(0 0 6px ${ringColor})`,
            transition: "stroke-dashoffset 80ms linear",
          }}
        />
        <text
          x="50"
          y="55"
          textAnchor="middle"
          className="fill-white font-display text-[22px] font-semibold"
        >
          {display}
          {suffix}
        </text>
      </svg>

      <p className="relative mt-3 text-sm leading-snug text-white/80">{label}</p>
    </div>
  );
}
