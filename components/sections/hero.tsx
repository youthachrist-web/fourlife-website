import { ArrowRight, ShieldCheck, Activity, GraduationCap, LineChart } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { CountUp } from "@/components/ui/count-up";
import { LeadCta } from "@/components/lead/lead-cta";
import { site, cta, ecosystemStats, pillars } from "@/lib/content";

const pillarIcons = [ShieldCheck, Activity, GraduationCap, LineChart];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-surface">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" aria-hidden />
      <div
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-100 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-lime-100 blur-3xl"
        aria-hidden
      />
      {/* Oversized "4" watermark — same chunky numeral as the FourLife logo.
          Present on every breakpoint, just scaled + repositioned. */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-6 -top-4 select-none font-display text-[12rem] font-bold leading-none text-brand-200/80 sm:-right-12 sm:text-[17rem] lg:-right-16 lg:top-1/2 lg:-translate-y-1/2 lg:text-[34rem] lg:text-brand-100 xl:text-[42rem]"
      >
        4
      </span>

      <Container className="relative grid gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-brand-700">
            Ecossistema Integrado de Produtividade e Saúde
          </p>
          <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.08] text-ink sm:text-5xl lg:text-6xl">
            {site.tagline}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate">
            {site.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <LeadCta size="lg">
              {cta.primary.label} <ArrowRight className="h-4 w-4" />
            </LeadCta>
            <ButtonLink href="/solucoes" size="lg" variant="outline">
              Conhecer as 7 soluções
            </ButtonLink>
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
            {ecosystemStats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-display text-3xl font-semibold text-primary">
                  <CountUp value={stat.value} />
                </dt>
                <dd className="mt-1 text-sm text-muted">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <Reveal className="relative">
          <div className="rounded-2xl border border-line bg-background p-6 shadow-[var(--shadow-lift)] sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              4 pilares, 1 estratégia
            </p>
            <ul className="mt-5 space-y-4">
              {pillars.map((pillar, i) => {
                const Icon = pillarIcons[i];
                return (
                  <li key={pillar.name} className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block font-medium text-ink">{pillar.name}</span>
                      <span className="block text-sm text-slate">{pillar.detail}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
            <p className="mt-6 rounded-xl bg-surface-2 px-4 py-3 text-sm text-slate">
              Saúde + Segurança + Educação + Tecnologia + Estratégia ={" "}
              <strong className="text-primary">Performance com ROI</strong>
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
