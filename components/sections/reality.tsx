import { ArrowRight, Newspaper } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { CountUp } from "@/components/ui/count-up";
import { SafeImage } from "@/components/ui/safe-image";
import {
  realityHeadline,
  presenteeismStats,
  workerPhotos,
  newsClips,
} from "@/lib/content";

export function Reality() {
  return (
    <Section id="realidade" className="bg-background">
      <SectionHeading
        eyebrow={realityHeadline.eyebrow}
        title={realityHeadline.title}
        body={realityHeadline.body}
      />

      {/* Retratos de quem carrega o custo — carrossel horizontal (PC + mobile) */}
      <div className="mt-10">
        <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-muted">
          <ArrowRight className="h-3.5 w-3.5" /> arraste para o lado
        </div>
        <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0">
          {workerPhotos.map((photo, i) => (
            <Reveal
              key={photo.src}
              delay={i * 80}
              className="group w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[31%]"
            >
              <div className="relative overflow-hidden rounded-2xl border border-line">
                <SafeImage
                  src={photo.src}
                  alt={photo.alt}
                  ratio="4 / 5"
                  rounded="rounded-2xl"
                  sizes="(max-width: 640px) 78vw, (max-width: 1024px) 46vw, 31vw"
                  imgClassName="transition-transform duration-700 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-ink">
                  {photo.kicker}
                </span>
                <p className="absolute inset-x-4 bottom-4 text-sm font-medium leading-snug text-white">
                  {photo.caption}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Clippings — a imprensa que o lead pode acompanhar */}
      <div className="mt-16 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">
            <Newspaper className="h-3.5 w-3.5" /> Na imprensa
          </p>
          <h3 className="mt-4 font-display text-2xl font-semibold text-ink">
            O afastamento virou pauta nacional — todo mês
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate">
            O recorde de 2025 não foi um pico isolado: é uma curva que se repete. Enquanto
            a manchete se repete, o custo corre dentro da sua operação.
          </p>
        </div>

        <ol className="relative space-y-4 border-l border-line pl-6">
          {newsClips.map((clip, i) => (
            <Reveal
              as="li"
              key={clip.title}
              delay={i * 110}
              className="relative rounded-2xl border border-line bg-surface p-5 shadow-[var(--shadow-card)]"
            >
              <span className="absolute -left-[1.72rem] top-6 h-3 w-3 rounded-full border-2 border-background bg-brand-400" />
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded bg-brand-800 px-2 py-0.5 font-semibold text-white">
                  {clip.source}
                </span>
                <span className="text-muted">{clip.tag}</span>
                <span className="text-muted">· {clip.date}</span>
              </div>
              <p className="mt-2 font-display text-base font-semibold leading-snug text-ink">
                {clip.title}
              </p>
              <p className="mt-1.5 text-sm text-slate">{clip.excerpt}</p>
            </Reveal>
          ))}
          <li className="pl-0 text-xs text-muted">
            Manchetes de veículos externos (g1, A Crítica), reproduzidas aqui apenas como
            referência do cenário.
          </li>
        </ol>
      </div>

      {/* Números do presenteísmo — com motion */}
      <ul className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {presenteeismStats.map((stat) => (
          <li key={stat.label} className="bg-surface p-6">
            <p className="font-display text-3xl font-semibold text-primary">
              <CountUp value={stat.value} />
            </p>
            <p className="mt-1 text-sm leading-snug text-slate">{stat.label}</p>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-2">
        {realityHeadline.sources.map((s) => (
          <span
            key={s.label}
            className="rounded-full border border-line bg-surface-2 px-3 py-1 text-xs text-muted"
            title={s.detail}
          >
            {s.label}
          </span>
        ))}
      </div>
    </Section>
  );
}
