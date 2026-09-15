import { Quote } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { testimonials } from "@/lib/content";

export function Testimonials() {
  return (
    <Section className="bg-background">
      <SectionHeading
        eyebrow="Quem já mede saúde como resultado"
        title="Impactos relatados por gestores de RH e saúde ocupacional"
      />
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal
            as="figure"
            key={t.name}
            delay={i * 90}
            className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 shadow-[var(--shadow-card)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
          >
            <Quote className="icon-pop h-6 w-6 text-brand-300 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110" />
            <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-slate">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-5 border-t border-line pt-4">
              <span className="block font-medium text-ink">{t.name}</span>
              <span className="block text-xs text-muted">{t.role}</span>
            </figcaption>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
