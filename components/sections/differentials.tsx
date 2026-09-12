import {
  CalendarClock,
  Timer,
  Users,
  Building2,
  BadgeCheck,
  Truck,
  MoveHorizontal,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { DragScroll } from "@/components/ui/drag-scroll";
import { differentials } from "@/lib/content";

const itemIcons = [CalendarClock, Timer, Users, Building2, BadgeCheck, Truck];

const RING_R = 16;
const RING_C = 2 * Math.PI * RING_R;

export function Differentials({
  className = "bg-surface-2",
  showHeading = true,
}: {
  className?: string;
  showHeading?: boolean;
}) {
  const total = differentials.items.length;

  return (
    <Section id="diferenciais" className={className}>
      {showHeading ? (
        <SectionHeading
          eyebrow={differentials.eyebrow}
          title={differentials.title}
          body={differentials.body}
        />
      ) : null}

      <div
        className={`mb-2 flex items-center gap-1.5 text-xs font-medium text-muted ${showHeading ? "mt-10" : "mt-8"}`}
      >
        <MoveHorizontal className="h-3.5 w-3.5" /> arraste para ver os 6 diferenciais
      </div>

      <DragScroll ariaLabel="Diferenciais Carlos Chagas" className="-mx-5 px-5 sm:mx-0 sm:px-0">
        {differentials.items.map((item, i) => {
          const Icon = itemIcons[i];
          const fraction = (i + 1) / total;
          const offset = RING_C * (1 - fraction);
          return (
            <Reveal
              key={item.title}
              delay={i * 70}
              className="group w-[80%] shrink-0 snap-start overflow-hidden rounded-2xl border border-line bg-background shadow-[var(--shadow-card)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] sm:w-[52%] lg:w-[31%]"
            >
              <div className="h-1.5 w-full bg-gradient-to-r from-brand-400 to-lime-400" />
              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  {/* Ícone com motion contínua (anel pulsando) */}
                  <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    <span
                      aria-hidden
                      className="absolute inset-0 animate-ping rounded-xl bg-brand-300/50 [animation-duration:2.4s]"
                    />
                    <Icon className="relative h-5 w-5" />
                  </span>

                  {/* Mini-gráfico: posição do diferencial no conjunto dos 6 */}
                  <div className="relative flex h-11 w-11 shrink-0 items-center justify-center">
                    <svg viewBox="0 0 40 40" className="h-11 w-11 -rotate-90">
                      <circle cx="20" cy="20" r={RING_R} fill="none" stroke="var(--line)" strokeWidth="4" />
                      <circle
                        cx="20"
                        cy="20"
                        r={RING_R}
                        fill="none"
                        stroke="var(--lime-400)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray={RING_C}
                        className="chart-ring"
                        style={
                          {
                            "--ring-circumference": RING_C,
                            "--ring-offset": offset,
                          } as React.CSSProperties
                        }
                      />
                    </svg>
                    <span className="absolute font-display text-[11px] font-semibold text-ink">
                      {i + 1}/{total}
                    </span>
                  </div>
                </div>

                <h3 className="mt-4 font-display text-base font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{item.detail}</p>
              </div>
            </Reveal>
          );
        })}
      </DragScroll>
    </Section>
  );
}
