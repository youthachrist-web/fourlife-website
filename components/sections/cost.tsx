import { ArrowRight, Check, TrendingDown } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { CountUp } from "@/components/ui/count-up";
import { LeadCta } from "@/components/lead/lead-cta";
import { cost, cta } from "@/lib/content";

export function Cost() {
  return (
    <Section id="custo" className="bg-background">
      <SectionHeading eyebrow={cost.eyebrow} title={cost.title} body={cost.body} />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cost.points.map((point, i) => (
          <Reveal
            key={point.label}
            delay={i * 70}
            className="group rounded-2xl border border-line bg-surface p-6 shadow-[var(--shadow-card)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
          >
            {/* Ícone com motion contínua (anel pulsando) */}
            <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-error/10 text-error">
              <span
                aria-hidden
                className="absolute inset-0 animate-ping rounded-xl bg-error/20 [animation-duration:2.4s]"
              />
              <TrendingDown className="relative h-5 w-5 transition-transform duration-500 group-hover:-translate-y-0.5" />
            </span>
            <p className="mt-4 font-display text-3xl font-semibold text-ink">
              <CountUp value={point.value} />
            </p>
            <p className="mt-1 text-sm leading-snug text-slate">{point.label}</p>
          </Reveal>
        ))}
      </div>

      <Reveal
        delay={280}
        className="mt-10 grid gap-6 rounded-2xl border border-brand-200 bg-brand-50 p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
      >
        <div>
          <h3 className="font-display text-xl font-semibold text-brand-800 sm:text-2xl">
            {cost.turn.title}
          </h3>
          <ul className="mt-4 space-y-2.5">
            {cost.turn.items.map((item, i) => (
              <Reveal
                key={item}
                as="li"
                delay={380 + i * 90}
                className="flex gap-3 text-sm text-brand-800/90"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                {item}
              </Reveal>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-3">
          <LeadCta>
            {cta.primary.label} <ArrowRight className="h-4 w-4" />
          </LeadCta>
          <p className="text-xs text-brand-800/70">
            No diagnóstico gratuito você recebe as 3 prioridades de maior impacto na
            receita pelo menor esforço.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
