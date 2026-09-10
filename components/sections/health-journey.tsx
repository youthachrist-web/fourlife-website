import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { CountUp } from "@/components/ui/count-up";
import { DeckFigure } from "@/components/ui/deck-figure";
import { healthJourney } from "@/lib/content";

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

      <Reveal>
        <DeckFigure
          className="mt-10"
          src="/deck/jornada-saude.webp"
          alt="Infográfico FourLife — Jornada da Saúde: check-up inicial, ações integradas, acompanhamento e resultados (prevenção de doenças, redução de ausências, produtividade e retorno financeiro)."
          caption="Jornada da Saúde"
        />
      </Reveal>

      {/* Linha do tempo de 6 meses */}
      <div className="mt-12">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Ciclo de 6 meses
        </p>
        <ol className="mt-4 grid gap-4 lg:grid-cols-3">
          {healthJourney.timeline.map((phase, i) => (
            <Reveal
              as="li"
              key={phase.period}
              delay={i * 80}
              className="flex flex-col rounded-2xl border border-line bg-surface-2 p-6"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="rounded-full bg-brand-800 px-3 py-1 text-xs font-semibold text-white">
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
        </ol>

        <Reveal>
          <DeckFigure
            className="mt-8"
            src="/deck/ciclo-6-meses.webp"
            alt="Infográfico FourLife — ciclo de 6 meses: Mês 1 (checkup, exames clínicos, coleta de sangue, exames mentais, IA Analytics), Meses 2 a 5 (resultados e diagnósticos individuais, ações multidisciplinares presenciais, campanhas, palestras, eventos, plataforma de educação e microlearning) e Mês 6 (novo check-up)."
            caption="Ciclo de 6 meses"
          />
        </Reveal>
      </div>
    </Section>
  );
}
