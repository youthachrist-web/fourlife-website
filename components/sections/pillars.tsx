import { HeartPulse, Cpu, ScrollText, GraduationCap } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { DeckFigure } from "@/components/ui/deck-figure";
import { fourPillars } from "@/lib/content";

const pillarIcons = [HeartPulse, Cpu, ScrollText, GraduationCap];

export function Pillars() {
  return (
    <Section id="pilares" className="bg-surface-2">
      <SectionHeading
        eyebrow="Nosso plano em 4 pilares"
        title="O branding começa aqui: saúde, tecnologia, conformidade e educação"
        body="Quatro frentes que sustentam a marca FourLife e organizam cada entrega — do check-up ao relatório de gestão."
      />

      <ol className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {fourPillars.map((pillar, i) => {
          const Icon = pillarIcons[i];
          return (
            <Reveal
              as="li"
              key={pillar.number}
              delay={i * 70}
              className="relative flex flex-col overflow-hidden rounded-2xl border border-line bg-background p-6 shadow-[var(--shadow-card)]"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -right-3 -top-6 select-none font-display text-[7rem] font-bold leading-none text-brand-100"
              >
                {pillar.number.replace(/^0/, "")}
              </span>
              <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="relative mt-4 font-display text-lg font-semibold text-ink">
                {pillar.name}
              </h3>
              <p className="relative mt-2 text-sm leading-relaxed text-slate">
                {pillar.thesis}
              </p>
              <ul className="relative mt-4 space-y-2 border-t border-line pt-4 text-sm text-slate">
                {pillar.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span
                      aria-hidden
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lime-400"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          );
        })}
      </ol>

      <Reveal>
        <DeckFigure
          className="mt-12"
          src="/deck/pilares.webp"
          alt="Infográfico FourLife — Nosso plano em 4 pilares: 1. saúde física e mental, 2. tecnologia e inovação, 3. normas regulamentadoras, 4. educação."
          caption="Nosso plano em 4 pilares"
        />
      </Reveal>
    </Section>
  );
}
