import { Section, SectionHeading } from "@/components/ui/section";
import { testimonials } from "@/lib/content";

export function Testimonials() {
  return (
    <Section className="bg-background">
      <SectionHeading
        eyebrow="Quem já mede saúde como resultado"
        title="Impactos relatados por gestores de RH e saúde ocupacional"
      />
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <figure
            key={t.name}
            className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6 shadow-[var(--shadow-card)]"
          >
            <blockquote className="flex-1 text-sm leading-relaxed text-slate">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-5 border-t border-line pt-4">
              <span className="block font-medium text-ink">{t.name}</span>
              <span className="block text-xs text-muted">{t.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
