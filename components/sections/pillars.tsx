import { HeartPulse, Cpu, ScrollText, GraduationCap, MoveHorizontal } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { DragScroll } from "@/components/ui/drag-scroll";
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

      <div className="mb-2 mt-10 flex items-center gap-1.5 text-xs font-medium text-muted">
        <MoveHorizontal className="h-3.5 w-3.5" /> arraste para ver os 4 pilares
      </div>

      <DragScroll ariaLabel="Os 4 pilares FourLife" className="-mx-5 px-5 sm:mx-0 sm:px-0">
        {fourPillars.map((pillar, i) => {
          const Icon = pillarIcons[i];
          return (
            <Reveal
              key={pillar.number}
              delay={i * 90}
              className="group relative w-[82%] shrink-0 snap-start overflow-hidden rounded-2xl border border-line bg-background shadow-[var(--shadow-card)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] sm:w-[58%] lg:w-[31%]"
            >
              {/* Brand-color accent stripe — the logo's teal-to-lime */}
              <div
                aria-hidden
                className="h-1.5 w-full bg-gradient-to-r from-brand-400 to-lime-400"
              />
              <div className="relative p-6">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-3 -top-2 select-none font-display text-[7rem] font-bold leading-none text-brand-50"
                >
                  {pillar.number.replace(/^0/, "")}
                </span>

                <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
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
              </div>
            </Reveal>
          );
        })}
      </DragScroll>
    </Section>
  );
}
