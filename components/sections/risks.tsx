import { EyeOff, UserX, UserMinus, MoveHorizontal, AlertTriangle } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { DragScroll } from "@/components/ui/drag-scroll";
import { cn } from "@/lib/cn";
import { currentScenario, identifiedRisks } from "@/lib/content";

const riskIcons = [EyeOff, UserX, UserMinus];

export function Risks() {
  return (
    <Section id="riscos" className="bg-surface-2">
      <SectionHeading
        eyebrow={currentScenario.eyebrow}
        title={currentScenario.title}
        body={currentScenario.body}
      />

      <p className="mt-10 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-error">
        <AlertTriangle className="h-3.5 w-3.5" /> Riscos identificados
      </p>

      <div className="mb-2 mt-3 flex items-center gap-1.5 text-xs font-medium text-muted">
        <MoveHorizontal className="h-3.5 w-3.5" /> arraste para ver os riscos
      </div>

      <DragScroll ariaLabel="Riscos identificados" className="-mx-5 px-5 sm:mx-0 sm:px-0">
        {identifiedRisks.map((risk, i) => {
          const Icon = riskIcons[i];
          const critical = risk.severity === "Crítica";
          return (
            <Reveal
              key={risk.title}
              delay={i * 90}
              className="w-[82%] shrink-0 snap-start rounded-2xl border border-line bg-background p-6 shadow-[var(--shadow-card)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] sm:w-[55%] lg:w-[31%]"
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  className={cn(
                    "icon-pop flex h-11 w-11 items-center justify-center rounded-xl",
                    critical ? "bg-error/10 text-error" : "bg-warning/10 text-warning",
                  )}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide",
                    critical ? "bg-error/10 text-error" : "bg-warning/10 text-warning",
                  )}
                >
                  {risk.severity}
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-ink">{risk.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">{risk.detail}</p>
            </Reveal>
          );
        })}
      </DragScroll>
    </Section>
  );
}
