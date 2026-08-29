"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/**
 * Animates a numeric value from 0 to its target the first time it scrolls into
 * view. Preserves the original formatting — prefix, suffix and zero-padding
 * (so "01" counts up to "01", not "1"). Non-numeric values (e.g. "ROI") just
 * fade in. Respects reduced motion.
 */
export function CountUp({
  value,
  duration = 1900,
  className,
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const match = value.match(/^(\D*)([\d.,]+)(.*)$/);
  const digits = match ? match[2].replace(/[.,]/g, "") : "";
  const target = match ? Number(digits) : NaN;
  const prefix = match?.[1] ?? "";
  const suffix = match?.[3] ?? "";
  const pad = digits.length > 1 && digits.startsWith("0") ? digits.length : 0;
  const hasNumber = Number.isFinite(target);

  const fmt = (n: number) =>
    `${prefix}${pad ? String(n).padStart(pad, "0") : n.toLocaleString("pt-BR")}${suffix}`;

  const [display, setDisplay] = useState<string>(hasNumber ? fmt(0) : value);
  const [shown, setShown] = useState(!hasNumber);
  const [finished, setFinished] = useState(!hasNumber);

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
        setDisplay(fmt(target));
        setFinished(true);
        return;
      }
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay(fmt(Math.round(eased * target)));
        if (t < 1) {
          raf = requestAnimationFrame(tick);
        } else {
          setFinished(true);
        }
      };
      raf = requestAnimationFrame(tick);
    };

    const rect = node.getBoundingClientRect();
    const onScreen = rect.top < window.innerHeight * 0.85 && rect.bottom > 0;
    if (onScreen) {
      run();
    } else if (typeof IntersectionObserver !== "undefined") {
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            run();
            io.disconnect();
          }
        },
        { threshold: 0.6, rootMargin: "0px 0px -10% 0px" },
      );
      io.observe(node);
      // Long failsafe only — must not pre-fire numbers far below the fold.
      const failsafe = window.setTimeout(run, 7000);
      return () => {
        io.disconnect();
        window.clearTimeout(failsafe);
        cancelAnimationFrame(raf);
      };
    } else {
      run();
    }

    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasNumber, prefix, suffix, target, duration, pad]);

  return (
    <span
      ref={ref}
      data-shown={finished}
      className={cn(
        "count-pop inline-block tabular-nums transition-opacity duration-500",
        shown ? "opacity-100" : "opacity-0",
        className,
      )}
    >
      {display}
    </span>
  );
}
