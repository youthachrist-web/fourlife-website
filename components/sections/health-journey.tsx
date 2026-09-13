import {
  Stethoscope,
  HeartHandshake,
  Activity,
  TrendingUp,
  Syringe,
  UsersRound,
  ClipboardCheck,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { healthJourney } from "@/lib/content";

const stageIcons = [Stethoscope, HeartHandshake, Activity, TrendingUp];
const phaseIcons = [Syringe, UsersRound, ClipboardCheck];

/** "Mês 6" -> 6; "Meses 2 a 5" -> 5 (the phase's last month). */
function endMonth(period: string): number {
  const range = period.match(/(\d+)\s*a\s*(\d+)/);
  if (range) return Number(range[2]);
  const single = period.match(/(\d+)/);
  return single ? Number(single[1]) : 1;
}

/** Position along the Mês 1 -> Mês 6 axis, as a 0–100% fraction. */
function monthPercent(month: number): number {
  return ((month - 1) / 5) * 100;
}

const RING_R = 15;
const RING_C = 2 * Math.PI * RING_R;

export function HealthJourney({
  className = "bg-background",
}: {
  className?: string;
}) {
  const totalStages = healthJourney.stages.length;

  return (
    <Section id="jornada" className={className}>
      <SectionHeading
        eyebrow={healthJourney.eyebrow}
        title={healthJourney.title}
        body={healthJourney.body}
      />

      {/* Quatro etapas do ciclo — ícone + mini-gráfico de progresso por etapa */}
      <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {healthJourney.stages.map((stage, i) => {
          const Icon = stageIcons[i];
          const fraction = (i + 1) / totalStages;
          const offset = RING_C * (1 - fraction);
          return (
            <Reveal
              as="li"
              key={stage.name}
              delay={i * 60}
              className="group relative flex flex-col rounded-2xl border border-line bg-surface p-5 shadow-[var(--shadow-card)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                  <span
                    aria-hidden
                    className="absolute inset-0 animate-ping rounded-xl bg-brand-300/40 [animation-duration:2.6s]"
                  />
                  <Icon className="relative h-5 w-5" />
                </span>
                <div className="relative flex h-9 w-9 shrink-0 items-center justify-center">
                  <svg viewBox="0 0 36 36" className="h-9 w-9 -rotate-90">
                    <circle cx="18" cy="18" r={RING_R} fill="none" stroke="var(--line)" strokeWidth="3" />
                    <circle
                      cx="18"
                      cy="18"
                      r={RING_R}
                      fill="none"
                      stroke="var(--lime-400)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray={RING_C}
                      className="chart-ring"
                      style={
                        {
                          "--ring-circumference": RING_C,
                          "--ring-offset": offset,
                        } as React.CSSProperties
                      }
                    />
                  </svg>
                  <span className="absolute font-display text-[10px] font-semibold text-ink">
                    {i + 1}/{totalStages}
                  </span>
                </div>
              </div>
              <span className="mt-3 font-display text-base font-semibold text-ink">
                {stage.name}
              </span>
              <span className="mt-2 text-sm leading-relaxed text-slate">
                {stage.detail}
              </span>
            </Reveal>
          );
        })}
      </ol>

      {/* Ciclo de 6 meses — um único gráfico de linha do tempo, com motion */}
      <div className="mt-12">
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Ciclo de 6 meses
        </p>

        <Reveal className="rounded-2xl border border-line bg-surface p-6 shadow-[var(--shadow-card)] sm:p-8">
          {/* Eixo do tempo: Mês 1 -> Mês 6, com os 3 marcos animados */}
          <div className="relative mx-2 mt-6 h-2 sm:mx-4">
            <div className="absolute inset-y-0 left-0 right-0 rounded-full bg-line" />
            <div className="progress-fill absolute inset-y-0 left-0 right-0 rounded-full bg-gradient-to-r from-brand-400 to-lime-400" />

            {/* Marcações dos 6 meses */}
            {Array.from({ length: 6 }, (_, m) => m + 1).map((month) => (
              <span
                key={month}
                aria-hidden
                className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-background bg-brand-200"
                style={{ left: `${monthPercent(month)}%` }}
              />
            ))}

            {/* Marcos das 3 fases */}
            {healthJourney.timeline.map((phase, i) => {
              const PhaseIcon = phaseIcons[i];
              const left = monthPercent(endMonth(phase.period));
              return (
                <div
                  key={phase.period}
                  className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${left}%` }}
                >
                  <span className="relative flex h-9 w-9 items-center justify-center rounded-full border-2 border-background bg-brand-700 text-white shadow-[var(--shadow-card)]">
                    <span
                      aria-hidden
                      className="absolute inset-0 animate-ping rounded-full bg-brand-400/60"
                      style={{ animationDuration: `${2.4 + i * 0.4}s` }}
                    />
                    <PhaseIcon className="relative h-4 w-4" />
                  </span>
                </div>
              );
            })}
          </div>

          {/* Rótulos Mês 1 ... Mês 6 sob o eixo */}
          <div className="mx-2 mt-4 flex justify-between text-[11px] text-muted sm:mx-4">
            {Array.from({ length: 6 }, (_, m) => m + 1).map((month) => (
              <span key={month}>Mês {month}</span>
            ))}
          </div>

          {/* Detalhe das 3 fases */}
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {healthJourney.timeline.map((phase, i) => (
              <Reveal
                key={phase.period}
                delay={i * 100}
                className="group flex flex-col rounded-xl border border-line bg-background p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-card)]"
              >
                <div className="h-1 w-8 rounded-full bg-gradient-to-r from-brand-400 to-lime-400 transition-all duration-500 group-hover:w-14" />
                <div className="mt-3 flex items-baseline justify-between gap-3">
                  <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                    {phase.period}
                  </span>
                  <span className="text-xs font-medium uppercase tracking-wide text-muted">
                    {phase.title}
                  </span>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-slate">
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
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
