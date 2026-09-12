import { MoveHorizontal } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { CountUp } from "@/components/ui/count-up";
import { DragScroll } from "@/components/ui/drag-scroll";
import { healthJourney } from "@/lib/content";

/** "Mês 6" -> [6, 6]; "Meses 2 a 5" -> [2, 5]. Drives the mini timeline bar. */
function monthRange(period: string): [number, number] {
  const range = period.match(/(\d+)\s*a\s*(\d+)/);
  if (range) return [Number(range[1]), Number(range[2])];
  const single = period.match(/(\d+)/);
  const m = single ? Number(single[1]) : 1;
  return [m, m];
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

      {/* Linha do tempo de 6 meses — carrossel de cards "glass" */}
      <div className="mt-12">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Ciclo de 6 meses
        </p>
        <div className="mb-2 mt-3 flex items-center gap-1.5 text-xs font-medium text-muted">
          <MoveHorizontal className="h-3.5 w-3.5" /> arraste para ver as 3 fases
        </div>

        <DragScroll ariaLabel="Ciclo de 6 meses" className="-mx-5 px-5 sm:mx-0 sm:px-0">
          {healthJourney.timeline.map((phase, i) => {
            const [from, to] = monthRange(phase.period);
            return (
              <Reveal
                key={phase.period}
                delay={i * 90}
                className="group relative w-[84%] shrink-0 snap-start overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-brand-800 via-brand-900 to-ink p-6 shadow-[0_1px_2px_rgba(0,0,0,0.4),0_24px_44px_-20px_rgba(0,0,0,0.7)] transition-transform duration-500 hover:-translate-y-1 sm:w-[62%] lg:w-[31%]"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -left-8 -top-10 h-40 w-40 rounded-full bg-brand-300/20 blur-3xl transition-opacity duration-500 group-hover:opacity-80"
                />

                <div className="relative flex items-baseline justify-between gap-3">
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                    {phase.period}
                  </span>
                  <span className="text-xs font-medium uppercase tracking-wide text-white/60">
                    {phase.title}
                  </span>
                </div>

                {/* Mini timeline — 6 meses, com o trecho desta fase aceso */}
                <div className="relative mt-4 flex gap-1 progress-fill">
                  {Array.from({ length: 6 }, (_, m) => m + 1).map((month) => (
                    <span
                      key={month}
                      aria-hidden
                      className={`h-1.5 flex-1 rounded-full ${
                        month >= from && month <= to
                          ? "bg-lime-400 shadow-[0_0_8px_rgba(166,206,60,0.7)]"
                          : "bg-white/10"
                      }`}
                    />
                  ))}
                </div>
                <p className="relative mt-1.5 text-[11px] text-white/50">
                  Mês 1 → Mês 6
                </p>

                <ul className="relative mt-4 space-y-2 border-t border-white/10 pt-4 text-sm text-white/80">
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
              </Reveal>
            );
          })}
        </DragScroll>
      </div>
    </Section>
  );
}
