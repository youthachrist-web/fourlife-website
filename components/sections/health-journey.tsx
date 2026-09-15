import {
  Stethoscope,
  HeartHandshake,
  Activity,
  TrendingUp,
  Syringe,
  UsersRound,
  ClipboardCheck,
  MoveHorizontal,
  BrainCircuit,
  FileText,
  Lightbulb,
  GraduationCap,
  HardHat,
  FileCheck2,
  ShieldCheck,
  Scale,
  BookOpen,
  Presentation,
  Sparkles,
  RefreshCw,
  LayoutDashboard,
  Wrench,
  Award,
  UserCheck,
  Gift,
  ClipboardList,
  AlertTriangle,
  Quote,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { SafeImage } from "@/components/ui/safe-image";
import { LogoBadge } from "@/components/ui/logo-badge";
import { DragScroll } from "@/components/ui/drag-scroll";
import {
  healthJourney,
  techInnovation,
  normasRegulamentadoras,
  educacao,
  provenResult,
  solutions,
  type TechInnovationShowcase,
} from "@/lib/content";

const stageIcons = [Stethoscope, HeartHandshake, Activity, TrendingUp];
const phaseIcons = [Syringe, UsersRound, ClipboardCheck];
const techIcons = [BrainCircuit, FileText, Lightbulb, GraduationCap];
const normsIcons = [HardHat, FileCheck2, ShieldCheck, Scale];
const eduIcons = [BookOpen, Presentation, Sparkles, RefreshCw];

const techCompactIcons = [LayoutDashboard];
const normsHighlightIcons = [ClipboardList, FileCheck2, Award];
const eduTrackIcons = [BookOpen, Wrench, GraduationCap, Award];
const eduCompactIcons = [UserCheck, Gift, TrendingUp, ShieldCheck];

/** "Mês 6" -> 6; "Meses 2 a 5" -> 5 (the phase's last month). */
function endMonth(period: string): number {
  const range = period.match(/(\d+)\s*a\s*(\d+)/);
  if (range) return Number(range[2]);
  const single = period.match(/(\d+)/);
  return single ? Number(single[1]) : 1;
}

/** Position along the Mês 1 -> Mês 6 axis, as a 0–100% fraction. */
function monthPercent(month: number): number {
  return ((month - 1) / 5) * 100;
}

const RING_R = 15;
const RING_C = 2 * Math.PI * RING_R;

export function HealthJourney({
  className = "bg-background",
}: {
  className?: string;
}) {
  const totalStages = healthJourney.stages.length;

  return (
    <Section id="jornada" className={className}>
      <SectionHeading
        eyebrow={healthJourney.eyebrow}
        title={healthJourney.title}
        body={healthJourney.body}
      />

      {/* Quatro etapas do ciclo — ícone + mini-gráfico de progresso por etapa */}
      <div className="mb-2 mt-10 flex items-center gap-1.5 text-xs font-medium text-muted">
        <MoveHorizontal className="h-3.5 w-3.5" /> arraste para ver as 4 etapas
      </div>

      <DragScroll ariaLabel="As 4 etapas da Jornada da Saúde" className="-mx-5 px-5 sm:mx-0 sm:px-0">
        {healthJourney.stages.map((stage, i) => {
          const Icon = stageIcons[i];
          const fraction = (i + 1) / totalStages;
          const offset = RING_C * (1 - fraction);
          return (
            <Reveal
              key={stage.name}
              delay={i * 60}
              className="group relative w-[82%] shrink-0 snap-start overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] sm:w-[58%] lg:w-[31%]"
            >
              {stage.image ? (
                <SafeImage
                  src={stage.image.src}
                  alt={stage.image.alt}
                  ratio="4 / 3"
                  rounded="rounded-none"
                  sizes="(max-width: 640px) 82vw, (max-width: 1024px) 58vw, 31vw"
                  imgClassName="transition-transform duration-700 group-hover:scale-105"
                />
              ) : null}

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-2">
                  <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                    <span
                      aria-hidden
                      className="absolute inset-0 animate-ping rounded-xl bg-brand-300/40 [animation-duration:2.6s]"
                    />
                    <Icon className="relative h-5 w-5" />
                  </span>
                  <div className="relative flex h-9 w-9 shrink-0 items-center justify-center">
                    <svg viewBox="0 0 36 36" className="h-9 w-9 -rotate-90">
                      <circle cx="18" cy="18" r={RING_R} fill="none" stroke="var(--line)" strokeWidth="3" />
                      <circle
                        cx="18"
                        cy="18"
                        r={RING_R}
                        fill="none"
                        stroke="var(--lime-400)"
                        strokeWidth="3"
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
                    <span className="absolute font-display text-[10px] font-semibold text-ink">
                      {i + 1}/{totalStages}
                    </span>
                  </div>
                </div>
                <span className="mt-3 font-display text-base font-semibold text-ink">
                  {stage.name}
                </span>
                <span className="mt-2 text-sm leading-relaxed text-slate">
                  {stage.detail}
                </span>

                {stage.logos && stage.logos.length > 0 ? (
                  <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-line pt-3">
                    {stage.logos.map((slug) => {
                      const solution = solutions.find((s) => s.slug === slug);
                      if (!solution) return null;
                      // Partner logo files assume a light background — give them
                      // a white chip so they stay legible on the dark card too.
                      // The text-fallback badge (e.g. SGG) already carries its
                      // own tone background, so it's left unwrapped.
                      return solution.logo ? (
                        <span
                          key={slug}
                          className="inline-flex items-center rounded-lg bg-white px-2 py-1"
                        >
                          <LogoBadge solution={solution} size="sm" />
                        </span>
                      ) : (
                        <LogoBadge key={slug} solution={solution} size="sm" />
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </Reveal>
          );
        })}
      </DragScroll>

      {/* Ciclo de 6 meses — um único gráfico de linha do tempo, com motion */}
      <div className="mt-12">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Pilar 1 · Saúde física e mental
        </p>
        <p className="mb-6 mt-2 max-w-2xl text-sm italic leading-relaxed text-slate">
          “{healthJourney.quote}”
        </p>

        <Reveal className="rounded-2xl border border-line bg-surface p-6 shadow-[var(--shadow-card)] sm:p-8">
          {/* Eixo do tempo: Mês 1 -> Mês 6, com os 3 marcos animados */}
          <div className="relative mx-2 mt-6 h-2 sm:mx-4">
            <div className="absolute inset-y-0 left-0 right-0 rounded-full bg-line" />
            <div className="progress-fill absolute inset-y-0 left-0 right-0 rounded-full bg-gradient-to-r from-brand-400 to-lime-400" />

            {/* Marcações dos 6 meses */}
            {Array.from({ length: 6 }, (_, m) => m + 1).map((month) => (
              <span
                key={month}
                aria-hidden
                className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-background bg-brand-200"
                style={{ left: `${monthPercent(month)}%` }}
              />
            ))}

            {/* Marcos das 3 fases */}
            {healthJourney.timeline.map((phase, i) => {
              const PhaseIcon = phaseIcons[i];
              const left = monthPercent(endMonth(phase.period));
              return (
                <div
                  key={phase.period}
                  className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${left}%` }}
                >
                  <span className="relative flex h-9 w-9 items-center justify-center rounded-full border-2 border-background bg-brand-700 text-white shadow-[var(--shadow-card)]">
                    <span
                      aria-hidden
                      className="absolute inset-0 animate-ping rounded-full bg-brand-400/60"
                      style={{ animationDuration: `${2.4 + i * 0.4}s` }}
                    />
                    <PhaseIcon className="relative h-4 w-4" />
                  </span>
                </div>
              );
            })}
          </div>

          {/* Rótulos Mês 1 ... Mês 6 sob o eixo */}
          <div className="mx-2 mt-4 flex justify-between text-[11px] text-muted sm:mx-4">
            {Array.from({ length: 6 }, (_, m) => m + 1).map((month) => (
              <span key={month}>Mês {month}</span>
            ))}
          </div>

          {/* Detalhe das 3 fases */}
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {healthJourney.timeline.map((phase, i) => (
              <Reveal
                key={phase.period}
                delay={i * 100}
                className="group flex flex-col rounded-xl border border-line bg-background p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-card)]"
              >
                <div className="h-1 w-8 rounded-full bg-gradient-to-r from-brand-400 to-lime-400 transition-all duration-500 group-hover:w-14" />
                <div className="mt-3 flex items-baseline justify-between gap-3">
                  <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                    {phase.period}
                  </span>
                  <span className="text-xs font-medium uppercase tracking-wide text-muted">
                    {phase.title}
                  </span>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-slate">
                  {phase.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span
                        aria-hidden
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lime-400"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Pilares em detalhe — mesmo tratamento visual da Jornada (cartão com
          foto), logo abaixo do Ciclo de 6 meses. */}
      <PillarShowcase
        showcase={techInnovation}
        icons={techIcons}
        compactIcons={techCompactIcons}
        ariaLabel="Pilar 2 — Tecnologia e inovação em detalhe"
      />
      <PillarShowcase
        showcase={normasRegulamentadoras}
        icons={normsIcons}
        highlightIcons={normsHighlightIcons}
        ariaLabel="Pilar 3 — Normas regulamentadoras em detalhe"
      />
      <PillarShowcase
        showcase={educacao}
        icons={eduIcons}
        trackIcons={eduTrackIcons}
        compactIcons={eduCompactIcons}
        ariaLabel="Pilar 4 — Educação em detalhe"
      />

      {/* Citação de fechamento — mesmo padrão de destaque usado na Pillars/Cost. */}
      <Reveal className="mt-16 rounded-2xl border border-brand-200 bg-brand-50 p-6 text-center sm:p-10">
        <p className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-brand-700">
          {provenResult.badge}
        </p>
        <Quote className="mx-auto mt-4 h-6 w-6 text-brand-400" aria-hidden />
        <p className="mx-auto mt-3 max-w-2xl font-display text-xl font-semibold leading-snug text-brand-800 sm:text-2xl">
          {provenResult.quote}
        </p>
        <p className="mt-4 text-sm text-brand-800/70">— {provenResult.attribution}</p>
      </Reveal>
    </Section>
  );
}

function PillarShowcase({
  showcase,
  icons,
  trackIcons,
  compactIcons,
  highlightIcons,
  ariaLabel,
}: {
  showcase: TechInnovationShowcase;
  icons: LucideIcon[];
  trackIcons?: LucideIcon[];
  compactIcons?: LucideIcon[];
  highlightIcons?: LucideIcon[];
  ariaLabel: string;
}) {
  return (
    <div className="mt-16">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
        {showcase.eyebrow}
      </p>
      <h3 className="mt-2 font-display text-2xl font-semibold text-ink">
        {showcase.title}
      </h3>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate">
        {showcase.body}
      </p>
      {showcase.quote ? (
        <p className="mt-2 max-w-2xl text-sm italic leading-relaxed text-slate">
          “{showcase.quote}”
        </p>
      ) : null}

      {/* Trilhas em ícone circular, sem foto (Pilar 4 — EJA, Técnico…) */}
      {showcase.tracks && showcase.tracks.length > 0 ? (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {showcase.tracks.map((track, i) => {
            const Icon = trackIcons?.[i];
            return (
              <Reveal
                key={track.name}
                delay={i * 60}
                className="flex flex-col items-center text-center"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-lime-300 bg-brand-50 text-brand-700">
                  {Icon ? <Icon className="h-6 w-6" /> : null}
                </span>
                <span className="mt-3 font-display text-sm font-semibold text-ink">
                  {track.name}
                </span>
                <span className="mt-1 text-xs leading-relaxed text-slate">
                  {track.detail}
                </span>
              </Reveal>
            );
          })}
        </div>
      ) : null}

      <div className="mb-2 mt-6 flex items-center gap-1.5 text-xs font-medium text-muted">
        <MoveHorizontal className="h-3.5 w-3.5" /> arraste para ver os 4 itens
      </div>

      <DragScroll ariaLabel={ariaLabel} className="-mx-5 px-5 sm:mx-0 sm:px-0">
        {showcase.items.map((item, i) => {
          const Icon = icons[i];
          return (
            <Reveal
              key={item.name}
              delay={i * 60}
              className="group relative w-[82%] shrink-0 snap-start overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] sm:w-[58%] lg:w-[31%]"
            >
              <SafeImage
                src={item.image.src}
                alt={item.image.alt}
                ratio="4 / 3"
                rounded="rounded-none"
                sizes="(max-width: 640px) 82vw, (max-width: 1024px) 58vw, 31vw"
                imgClassName="transition-transform duration-700 group-hover:scale-105"
              />
              <div className="p-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="mt-3 block font-display text-base font-semibold text-ink">
                  {item.name}
                </span>
                <span className="mt-2 block text-sm leading-relaxed text-slate">
                  {item.detail}
                </span>
              </div>
            </Reveal>
          );
        })}
      </DragScroll>

      {/* Cartões compactos sem foto — ex.: Dashboard RH, IA Analytics preditiva */}
      {showcase.compactItems && showcase.compactItems.length > 0 ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {showcase.compactItems.map((item, i) => {
            const Icon = compactIcons?.[i];
            return (
              <Reveal
                key={item.name}
                delay={i * 70}
                className="rounded-2xl border border-line bg-surface p-5 shadow-[var(--shadow-card)]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  {Icon ? <Icon className="h-5 w-5" /> : null}
                </span>
                <span className="mt-3 block font-display text-base font-semibold text-ink">
                  {item.name}
                </span>
                <span className="mt-2 block text-sm leading-relaxed text-slate">
                  {item.detail}
                </span>
              </Reveal>
            );
          })}
        </div>
      ) : null}

      {/* Grupos de checklist — ex.: Conformidade Legal, Vantagem Competitiva */}
      {showcase.highlights && showcase.highlights.length > 0 ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {showcase.highlights.map((group, i) => {
            const Icon = highlightIcons?.[i];
            return (
              <Reveal
                key={group.title}
                delay={i * 80}
                className="rounded-2xl border border-line bg-surface p-5 shadow-[var(--shadow-card)]"
              >
                <span className="flex items-center gap-2 font-display text-sm font-semibold text-ink">
                  {Icon ? <Icon className="h-4 w-4 text-brand-600" /> : null}
                  {group.title}
                </span>
                <ul className="mt-3 space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-slate">
                      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-lime-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      ) : null}

      {/* Alerta de atenção — ex.: risco de não conformidade com a NR-01 */}
      {showcase.warning ? (
        <Reveal className="mt-4 flex gap-3 rounded-2xl border border-warning/30 bg-warning/10 p-5">
          <AlertTriangle className="h-5 w-5 shrink-0 text-warning" />
          <p className="text-sm leading-relaxed text-ink">{showcase.warning}</p>
        </Reveal>
      ) : null}

      {showcase.closingLogo ? (
        <div className="mt-8 flex items-center gap-3 border-t border-line pt-6">
          <span className="inline-flex h-9 items-center rounded-lg bg-white px-2.5">
            <Image
              src={showcase.closingLogo.src}
              alt={showcase.closingLogo.alt}
              width={200}
              height={91}
              className="h-full w-auto max-w-[9rem] object-contain"
            />
          </span>
          <span className="text-xs text-muted">{showcase.closingLogo.caption}</span>
        </div>
      ) : null}
    </div>
  );
}
