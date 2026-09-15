import { Banknote, Users, Gavel, Scale, MoveHorizontal } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { CountUp } from "@/components/ui/count-up";
import { DragScroll } from "@/components/ui/drag-scroll";
import { StatRing } from "@/components/ui/stat-ring";
import { cn } from "@/lib/cn";
import { invisibleCost } from "@/lib/content";

const pointIcons = [Banknote, Users, Gavel, Scale];

export function InvisibleCost() {
  return (
    <Section id="custo-invisivel" className="bg-background">
      <SectionHeading
        eyebrow={invisibleCost.eyebrow}
        title={invisibleCost.title}
        body={invisibleCost.body}
      />

      <div className="mb-2 mt-10 flex items-center gap-1.5 text-xs font-medium text-muted">
        <MoveHorizontal className="h-3.5 w-3.5" /> arraste para ver os indicadores
      </div>

      <DragScroll ariaLabel="O custo invisível nas empresas" className="-mx-5 px-5 sm:mx-0 sm:px-0">
        {invisibleCost.points.map((point, i) => {
          const Icon = pointIcons[i];
          return (
            <Reveal
              key={point.label}
              delay={i * 80}
              className="w-[78%] shrink-0 snap-start rounded-2xl border border-line bg-surface p-6 shadow-[var(--shadow-card)] sm:w-[48%] lg:w-[calc((100%-3rem)/4)]"
            >
              <div className="flex items-start justify-between gap-3">
                <span
                  className={cn(
                    "icon-pop flex h-11 w-11 items-center justify-center rounded-xl",
                    point.critical ? "bg-error/10 text-error" : "bg-brand-50 text-brand-700",
                  )}
                >
                  <Icon className="h-5 w-5" />
                </span>
                {point.ringPercent != null ? (
                  <StatRing
                    percent={point.ringPercent}
                    label={`${point.ringPercent}% — ${point.label}`}
                  />
                ) : null}
              </div>
              <p
                className={cn(
                  "mt-4 font-display text-3xl font-semibold",
                  point.critical ? "text-error" : "text-ink",
                )}
              >
                <CountUp value={point.value} />
              </p>
              <p className="mt-1 text-sm leading-snug text-slate">{point.label}</p>
            </Reveal>
          );
        })}
      </DragScroll>

      <p className="mt-6 text-xs text-muted">Fontes: {invisibleCost.sources}.</p>
    </Section>
  );
}
