"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/**
 * Animates a numeric value from 0 to its target the first time it scrolls into
 * view. Non-numeric values (e.g. "ROI") just fade in. Respects reduced motion.
 *
 * `value` accepts an optional non-digit prefix and suffix, e.g. "34%", "546 mil",
 * "360º", "+12".
 */
export function CountUp({
  value,
  duration = 1400,
  className,
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const match = value.match(/^(\D*)([\d.,]+)(.*)$/);
  const target = match ? Number(match[2].replace(/[.,]/g, "")) : NaN;
  const prefix = match?.[1] ?? "";
  const suffix = match?.[3] ?? "";
  const hasNumber = Number.isFinite(target);

  const [display, setDisplay] = useState<string>(hasNumber ? `${prefix}0${suffix}` : value);
  const [shown, setShown] = useState(!hasNumber);

  useEffect(() => {
    const node = ref.current;
    if (!node || !hasNumber) return;

    let raf = 0;
    let started = false;

    const run = () => {
      if (started) return;
      started = true;
      setShown(true);

      if (prefersReducedMotion()) {
        setDisplay(`${prefix}${target.toLocaleString("pt-BR")}${suffix}`);
        return;
      }
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        const current = Math.round(eased * target);
        setDisplay(`${prefix}${current.toLocaleString("pt-BR")}${suffix}`);
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    if (node.getBoundingClientRect().top < window.innerHeight * 1.1) {
      run();
    } else if (typeof IntersectionObserver !== "undefined") {
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            run();
            io.disconnect();
          }
        },
        { threshold: 0.4 },
      );
      io.observe(node);
      const failsafe = window.setTimeout(run, 2000);
      return () => {
        io.disconnect();
        window.clearTimeout(failsafe);
        cancelAnimationFrame(raf);
      };
    } else {
      run();
    }

    return () => cancelAnimationFrame(raf);
  }, [hasNumber, prefix, suffix, target, duration]);

  return (
    <span
      ref={ref}
      className={cn(
        "tabular-nums transition-opacity duration-500",
        shown ? "opacity-100" : "opacity-0",
        className,
      )}
    >
      {display}
    </span>
  );
}
