"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Horizontal scroller that works everywhere:
 * - touch / trackpad: native horizontal scroll
 * - mouse on desktop: click-and-drag to pan, plus prev/next buttons
 * The scrollbar stays hidden; the drag + buttons are the affordance.
 */
export function DragScroll({
  children,
  className,
  ariaLabel,
}: {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: 0 });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  function updateArrows() {
    const el = ref.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }

  useEffect(() => {
    updateArrows();
    const el = ref.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, []);

  function onPointerDown(e: React.PointerEvent) {
    // Let touch use native momentum scrolling; only hijack mouse.
    if (e.pointerType === "touch") return;
    const el = ref.current;
    if (!el) return;
    drag.current = {
      active: true,
      startX: e.clientX,
      startLeft: el.scrollLeft,
      moved: 0,
    };
    el.setPointerCapture(e.pointerId);
    el.style.cursor = "grabbing";
    el.style.scrollSnapType = "none";
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!drag.current.active) return;
    const el = ref.current;
    if (!el) return;
    const dx = e.clientX - drag.current.startX;
    drag.current.moved = Math.abs(dx);
    el.scrollLeft = drag.current.startLeft - dx;
  }

  function endDrag(e: React.PointerEvent) {
    if (!drag.current.active) return;
    drag.current.active = false;
    const el = ref.current;
    if (el) {
      el.style.cursor = "";
      el.style.scrollSnapType = "";
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    }
  }

  function nudge(dir: 1 | -1) {
    const el = ref.current;
    if (!el) return;
    const step = Math.max(240, el.clientWidth * 0.8);
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }

  return (
    <div className="group relative">
      <div
        ref={ref}
        role="group"
        aria-label={ariaLabel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={(e) => {
          // Swallow the click that ends a drag so cards aren't "clicked".
          if (drag.current.moved > 6) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
        className={cn(
          "flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:cursor-grab",
          className,
        )}
      >
        {children}
      </div>

      <button
        type="button"
        aria-label="Anterior"
        onClick={() => nudge(-1)}
        className={cn(
          "absolute left-1 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-background/95 text-ink shadow-[var(--shadow-card)] transition-opacity md:flex",
          canPrev ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        aria-label="Próximo"
        onClick={() => nudge(1)}
        className={cn(
          "absolute right-1 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-background/95 text-ink shadow-[var(--shadow-card)] transition-opacity md:flex",
          canNext ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
