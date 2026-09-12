import {
  Stethoscope,
  HeartHandshake,
  Activity,
  TrendingUp,
  Syringe,
  UsersRound,
  ClipboardCheck,
  MoveHorizontal,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { SafeImage } from "@/components/ui/safe-image";
import { DragScroll } from "@/components/ui/drag-scroll";
import { BatteryGauge } from "@/components/ui/battery-gauge";
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
              className="relative flex flex-col rounded-2xl border border-line bg-surface p-5 shadow-[var(--shadow-card)]"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <Icon className="h-5 w-5" />
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

      {/* Linha do tempo de 6 meses — carrossel, foto + bateria de progresso */}
      <div className="mt-12">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Ciclo de 6 meses
        </p>
        <div className="mb-2 mt-3 flex items-center gap-1.5 text-xs font-medium text-muted">
          <MoveHorizontal className="h-3.5 w-3.5" /> arraste para ver as 3 fases
        </div>

        <DragScroll ariaLabel="Ciclo de 6 meses" className="-mx-5 px-5 sm:mx-0 sm:px-0">
          {healthJourney.timeline.map((phase, i) => {
            const PhaseIcon = phaseIcons[i];
            return (
              <Reveal
                key={phase.period}
                delay={i * 90}
                className="group w-[84%] shrink-0 snap-start overflow-hidden rounded-2xl border border-line bg-background shadow-[var(--shadow-card)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] sm:w-[62%] lg:w-[31%]"
              >
                <SafeImage
                  src={phase.image.src}
                  alt={phase.image.alt}
                  ratio="16 / 9"
                  contain
                  rounded="rounded-none"
                  className="bg-brand-50"
                  sizes="(max-width: 640px) 84vw, (max-width: 1024px) 62vw, 31vw"
                  imgClassName="transition-transform duration-700 group-hover:scale-105"
                />
                <div className="h-1.5 w-full bg-gradient-to-r from-brand-400 to-lime-400" />
                <div className="p-6">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                      <PhaseIcon className="h-3.5 w-3.5" />
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
            );
          })}
        </DragScroll>
      </div>
    </Section>
  );
}
