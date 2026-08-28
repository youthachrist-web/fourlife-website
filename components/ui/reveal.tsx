"use client";

import { useEffect, useState, type ElementType } from "react";
import { cn } from "@/lib/cn";

/**
 * Fades + lifts children into view once. Progressive enhancement: the hiding
 * style in globals.css only applies under `@media (scripting: enabled)`, so
 * no-JS visitors always see the content. A hard fallback also reveals the
 * content if the IntersectionObserver never fires for any reason.
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

    // Reveal immediately if already within (or above) the viewport.
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight * 1.15) {
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
            { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
          )
        : null;
    io?.observe(node);

    // Safety net: never leave content hidden.
    const timer = window.setTimeout(reveal, 1600);

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
