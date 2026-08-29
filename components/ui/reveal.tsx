"use client";

import { useEffect, useState, type ElementType } from "react";
import { cn } from "@/lib/cn";

/**
 * Slides + fades children in the first time they scroll into view. The hiding
 * style in globals.css only applies under `@media (scripting: enabled)`, so
 * no-JS visitors always see the content, and a safety timer reveals anything
 * the observer somehow misses.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div" as ElementType,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
}) {
  const [node, setNode] = useState<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!node || shown) return;

    // Only skip the animation for content that is *already on screen* at mount
    // (above the fold). Everything else waits until it is actually scrolled to.
    const rect = node.getBoundingClientRect();
    const onScreen = rect.top < window.innerHeight * 0.88 && rect.bottom > 0;
    if (onScreen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot mount sync
      setShown(true);
      return;
    }

    let done = false;
    const reveal = () => {
      if (done) return;
      done = true;
      setShown(true);
    };

    const io =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            (entries) => {
              if (entries.some((e) => e.isIntersecting)) {
                reveal();
                io?.disconnect();
              }
            },
            // Element must come ~14% into the viewport before it animates.
            { rootMargin: "0px 0px -14% 0px", threshold: 0.1 },
          )
        : null;
    io?.observe(node);

    // Safety net (long, so it can't pre-fire far-below content).
    const timer = window.setTimeout(reveal, 6000);

    return () => {
      io?.disconnect();
      window.clearTimeout(timer);
    };
  }, [node, shown]);

  return (
    <Tag
      ref={setNode}
      data-shown={shown}
      className={cn("reveal", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
