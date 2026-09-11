import {
  CalendarClock,
  Timer,
  Users,
  Building2,
  BadgeCheck,
  Truck,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { DeckFigure } from "@/components/ui/deck-figure";
import { differentials } from "@/lib/content";

const itemIcons = [CalendarClock, Timer, Users, Building2, BadgeCheck, Truck];

export function Differentials({
  className = "bg-surface-2",
  showHeading = true,
}: {
  className?: string;
  showHeading?: boolean;
}) {
  return (
    <Section id="diferenciais" className={className}>
      {showHeading ? (
        <SectionHeading
          eyebrow={differentials.eyebrow}
          title={differentials.title}
          body={differentials.body}
        />
      ) : null}

      <ul
        className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${showHeading ? "mt-12" : ""}`}
      >
        {differentials.items.map((item, i) => {
          const Icon = itemIcons[i];
          return (
            <Reveal
              as="li"
              key={item.title}
              delay={i * 60}
              className="flex flex-col rounded-2xl border border-line bg-background p-6 shadow-[var(--shadow-card)]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-base font-semibold text-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">{item.detail}</p>
            </Reveal>
          );
        })}
      </ul>

      <Reveal>
        <DeckFigure
          className={showHeading ? "mt-10" : "mt-8"}
          src="/deck/diferenciais.webp"
          ratio="987 / 642"
          alt="Infográfico FourLife — Os Grandes Diferenciais Carlos Chagas: tudo no mesmo dia (deslocamento único), resultados em até 48 horas, atendimento por ordem de chegada, estrutura própria e capilaridade nacional, corpo técnico 100% CLT, atendimento in company e unidade móvel."
          caption="Os Grandes Diferenciais Carlos Chagas"
        />
      </Reveal>
    </Section>
  );
}
