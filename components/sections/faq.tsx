"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { Section, SectionHeading } from "@/components/ui/section";
import { faq } from "@/lib/content";

export function Faq({ heading = true }: { heading?: boolean }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <Section id="faq" className="bg-surface-2">
      {heading ? (
        <SectionHeading
          eyebrow="Perguntas frequentes"
          title="As 5 dores que mais ouvimos — e o que o ecossistema faz por elas"
        />
      ) : null}

      <div className="mt-10 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-background">
        {faq.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.question}>
              <h3>
                <button
                  type="button"
                  id={`${baseId}-b-${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`${baseId}-p-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left"
                >
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-wide text-primary">
                      {item.pain}
                    </span>
                    <span className="mt-1 block font-medium text-ink">{item.question}</span>
                  </span>
                  <ChevronDown
                    className={cn(
                      "mt-1 h-5 w-5 shrink-0 text-primary transition-transform",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>
              </h3>
              <div
                id={`${baseId}-p-${i}`}
                role="region"
                aria-labelledby={`${baseId}-b-${i}`}
                hidden={!isOpen}
                className="px-5 pb-5 text-sm leading-relaxed text-slate"
              >
                {item.answer}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
