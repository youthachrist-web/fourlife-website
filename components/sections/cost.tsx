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
            className="rounded-2xl border border-line bg-surface p-6 shadow-[var(--shadow-card)]"
          >
            <TrendingDown className="h-5 w-5 text-error" />
            <p className="mt-3 font-display text-3xl font-semibold text-ink">
              <CountUp value={point.value} />
            </p>
            <p className="mt-1 text-sm leading-snug text-slate">{point.label}</p>
          </Reveal>
        ))}
      </div>

      <div className="mt-10 grid gap-6 rounded-2xl border border-brand-200 bg-brand-50 p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <h3 className="font-display text-xl font-semibold text-brand-800 sm:text-2xl">
            {cost.turn.title}
          </h3>
          <ul className="mt-4 space-y-2.5">
            {cost.turn.items.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-brand-800/90">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-3">
          <LeadCta>
            {cta.primary.label} <ArrowRight className="h-4 w-4" />
          </LeadCta>
          <p className="text-xs text-brand-800/70">
            No Diagnóstico 360º você recebe as 3 prioridades de maior impacto na receita
            pelo menor esforço.
          </p>
        </div>
      </div>
    </Section>
  );
}
