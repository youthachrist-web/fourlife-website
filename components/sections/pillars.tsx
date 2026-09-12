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
              className="group relative w-[82%] shrink-0 snap-start overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-brand-800 via-brand-900 to-ink p-6 shadow-[0_1px_2px_rgba(0,0,0,0.4),0_24px_44px_-20px_rgba(0,0,0,0.7)] transition-transform duration-500 hover:-translate-y-1 sm:w-[58%] lg:w-[31%]"
            >
              {/* Glass sheen + glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -right-8 -top-10 h-40 w-40 rounded-full bg-lime-400/20 blur-3xl transition-opacity duration-500 group-hover:opacity-80"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute -right-3 -top-6 select-none font-display text-[7rem] font-bold leading-none text-white/[0.06]"
              >
                {pillar.number.replace(/^0/, "")}
              </span>

              <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-lime-300 shadow-[0_0_16px_-2px_rgba(166,206,60,0.5)]">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="relative mt-4 font-display text-lg font-semibold text-white">
                {pillar.name}
              </h3>
              <p className="relative mt-2 text-sm leading-relaxed text-white/70">
                {pillar.thesis}
              </p>
              <ul className="relative mt-4 space-y-2 border-t border-white/10 pt-4 text-sm text-white/80">
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
      </DragScroll>
    </Section>
  );
}
