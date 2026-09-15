import { TrendingDown, TrendingUp, ShieldCheck, HandCoins } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { CountUp } from "@/components/ui/count-up";
import { results, type ResultPoint } from "@/lib/content";

const directionIcon = { down: TrendingDown, up: TrendingUp, flat: ShieldCheck } as const;

export function Results() {
  // Os 3 indicadores em % ficam num mini-gráfico de barras na mesma escala
  // (0–100). O ROI (×) é uma unidade diferente — fica num card à parte para
  // não virar um eixo duplo dentro do mesmo gráfico.
  const barPoints = results.points.filter(
    (p): p is ResultPoint & { barPercent: number } => p.barPercent != null,
  );
  const roi = results.points.find((p) => p.barPercent == null);

  return (
    <Section id="resultados" className="bg-background">
      <SectionHeading eyebrow={results.eyebrow} title={results.title} body={results.body} />

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-stretch">
        <div className="space-y-6 rounded-2xl border border-line bg-surface p-6 shadow-[var(--shadow-card)] sm:p-8">
          {barPoints.map((point, i) => {
            const Icon = directionIcon[point.direction];
            return (
              <Reveal key={point.label} delay={i * 100}>
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                  <span className="flex items-center gap-2 text-sm font-medium text-ink">
                    <Icon className="icon-pop h-4 w-4 shrink-0 text-success" />
                    {point.label}
                  </span>
                  <span className="font-display text-xl font-semibold text-success">
                    <CountUp value={point.value} />
                  </span>
                </div>
                <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-line">
                  <div
                    className="progress-fill h-full rounded-full bg-gradient-to-r from-brand-400 to-lime-400"
                    style={{ width: `${point.barPercent}%` }}
                  />
                </div>
              </Reveal>
            );
          })}
        </div>

        {roi ? (
          <Reveal
            delay={300}
            className="flex flex-col items-center justify-center rounded-2xl border border-brand-200 bg-brand-50 p-6 text-center sm:p-8"
          >
            <HandCoins className="icon-pop icon-float h-8 w-8 text-brand-700" />
            <p className="mt-4 font-display text-5xl font-bold text-brand-800">
              <CountUp value={roi.value} />
            </p>
            <p className="mt-2 text-sm leading-snug text-brand-800/80">{roi.label}</p>
          </Reveal>
        ) : null}
      </div>
    </Section>
  );
}
