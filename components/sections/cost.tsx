import { TrendingDown } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { CountUp } from "@/components/ui/count-up";
import { cost } from "@/lib/content";

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
            <span className="icon-pop relative flex h-11 w-11 items-center justify-center rounded-xl bg-error/10 text-error">
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
    </Section>
  );
}
