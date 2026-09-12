import { MoveHorizontal } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { CountUp } from "@/components/ui/count-up";
import { DragScroll } from "@/components/ui/drag-scroll";
import { BatteryGauge } from "@/components/ui/battery-gauge";
import { healthJourney } from "@/lib/content";

/** "Mês 6" -> 6; "Meses 2 a 5" -> 5 (the phase's last month). */
function endMonth(period: string): number {
  const range = period.match(/(\d+)\s*a\s*(\d+)/);
  if (range) return Number(range[2]);
  const single = period.match(/(\d+)/);
  return single ? Number(single[1]) : 1;
}

export function HealthJourney({
  className = "bg-background",
}: {
  className?: string;
}) {
  return (
    <Section id="jornada" className={className}>
      <SectionHeading
        eyebrow={healthJourney.eyebrow}
        title={healthJourney.title}
        body={healthJourney.body}
      />

      {/* Quatro etapas do ciclo */}
      <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {healthJourney.stages.map((stage, i) => (
          <Reveal
            as="li"
            key={stage.name}
            delay={i * 60}
            className="relative flex flex-col rounded-2xl border border-line bg-surface p-5 shadow-[var(--shadow-card)]"
          >
            <span className="font-display text-sm font-semibold text-brand-400">
              <CountUp value={String(i + 1).padStart(2, "0")} duration={900} />
            </span>
            <span className="mt-2 font-display text-base font-semibold text-ink">
              {stage.name}
            </span>
            <span className="mt-2 text-sm leading-relaxed text-slate">
              {stage.detail}
            </span>
          </Reveal>
        ))}
      </ol>

      {/* Linha do tempo de 6 meses — carrossel, progresso em forma de bateria */}
      <div className="mt-12">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Ciclo de 6 meses
        </p>
        <div className="mb-2 mt-3 flex items-center gap-1.5 text-xs font-medium text-muted">
          <MoveHorizontal className="h-3.5 w-3.5" /> arraste para ver as 3 fases
        </div>

        <DragScroll ariaLabel="Ciclo de 6 meses" className="-mx-5 px-5 sm:mx-0 sm:px-0">
          {healthJourney.timeline.map((phase, i) => (
            <Reveal
              key={phase.period}
              delay={i * 90}
              className="group w-[84%] shrink-0 snap-start overflow-hidden rounded-2xl border border-line bg-background shadow-[var(--shadow-card)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] sm:w-[62%] lg:w-[31%]"
            >
              <div className="h-1.5 w-full bg-gradient-to-r from-brand-400 to-lime-400" />
              <div className="p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                    {phase.period}
                  </span>
                  <span className="text-xs font-medium uppercase tracking-wide text-muted">
                    {phase.title}
                  </span>
                </div>

                <BatteryGauge
                  className="mt-4"
                  value={Math.round((endMonth(phase.period) / 6) * 100)}
                  label={`Carga da jornada até o mês ${endMonth(phase.period)} de 6`}
                />

                <ul className="mt-4 space-y-2 border-t border-line pt-4 text-sm text-slate">
                  {phase.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span
                        aria-hidden
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lime-400"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </DragScroll>
      </div>
    </Section>
  );
}
