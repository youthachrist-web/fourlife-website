import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { method } from "@/lib/content";

export function Method() {
  return (
    <Section id="metodo" className="bg-background">
      <SectionHeading eyebrow={method.eyebrow} title={method.title} body={method.body} />

      <ol className="mt-10 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
        {method.steps.map((step, i) => (
          <Reveal
            as="li"
            key={step.number}
            delay={i * 70}
            className="relative flex flex-col rounded-2xl border border-line bg-surface p-4 shadow-[var(--shadow-card)] sm:p-6"
          >
            <span className="font-display text-sm font-semibold text-brand-400">
              {step.number}
            </span>
            <span className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              {step.name}
            </span>
            <span className="mt-3 font-display text-lg font-semibold text-ink">
              {step.headline}
            </span>
            <span className="mt-2 text-sm text-slate">{step.detail}</span>
          </Reveal>
        ))}
      </ol>

      <p className="mt-8 max-w-2xl text-sm italic text-muted">{method.note}</p>
    </Section>
  );
}
