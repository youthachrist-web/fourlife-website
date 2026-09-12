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

      <div
        className={`mb-2 flex items-center gap-1.5 text-xs font-medium text-muted ${showHeading ? "mt-10" : "mt-8"}`}
      >
        <MoveHorizontal className="h-3.5 w-3.5" /> arraste para ver os 6 diferenciais
      </div>

      <DragScroll ariaLabel="Diferenciais Carlos Chagas" className="-mx-5 px-5 sm:mx-0 sm:px-0">
        {differentials.items.map((item, i) => {
          const Icon = itemIcons[i];
          return (
            <Reveal
              key={item.title}
              delay={i * 70}
              className="group relative w-[80%] shrink-0 snap-start overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-brand-800 via-brand-900 to-ink p-6 shadow-[0_1px_2px_rgba(0,0,0,0.4),0_24px_44px_-20px_rgba(0,0,0,0.7)] transition-transform duration-500 hover:-translate-y-1 sm:w-[52%] lg:w-[31%]"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -right-8 -bottom-10 h-40 w-40 rounded-full bg-lime-400/20 blur-3xl transition-opacity duration-500 group-hover:opacity-80"
              />
              <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-lime-300 shadow-[0_0_16px_-2px_rgba(166,206,60,0.5)]">
                <Icon className="h-5 w-5" />
              </span>
              <span
                aria-hidden
                className="pointer-events-none absolute right-5 top-5 select-none font-display text-3xl font-bold text-white/[0.12]"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="relative mt-4 font-display text-base font-semibold text-white">
                {item.title}
              </h3>
              <p className="relative mt-2 text-sm leading-relaxed text-white/70">
                {item.detail}
              </p>
            </Reveal>
          );
        })}
      </DragScroll>
    </Section>
  );
}
