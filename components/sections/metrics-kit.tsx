import { Check } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { metricsKit } from "@/lib/content";

export function MetricsKit() {
  return (
    <Section id="metricas" className="bg-background">
      <SectionHeading
        eyebrow={metricsKit.eyebrow}
        title={metricsKit.title}
        body={metricsKit.body}
      />

      <ul className="mt-10 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {metricsKit.metrics.map((metric) => (
          <li
            key={metric.name}
            className="flex gap-3 rounded-2xl border border-line bg-surface p-4 shadow-[var(--shadow-card)] sm:p-5"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-lime-100 text-lime-700">
              <Check className="h-4 w-4" />
            </span>
            <span>
              <span className="block font-display font-semibold text-ink">
                {metric.name}
              </span>
              <span className="mt-1 block text-sm text-slate">{metric.detail}</span>
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-6 rounded-xl bg-surface-2 px-4 py-3 text-sm text-slate">
        {metricsKit.footnote}
      </p>
    </Section>
  );
}
