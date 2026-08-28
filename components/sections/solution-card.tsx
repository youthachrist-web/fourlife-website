import { cn } from "@/lib/cn";
import { LogoBadge } from "@/components/ui/logo-badge";
import type { Solution } from "@/lib/content";

const accentRing: Record<Solution["accent"], string> = {
  brand: "text-brand-700 bg-brand-50 ring-brand-100",
  lime: "text-lime-700 bg-lime-50 ring-lime-200",
  slate: "text-slate bg-surface-2 ring-line",
};

export function SolutionCard({
  solution,
  className,
  id,
}: {
  solution: Solution;
  className?: string;
  id?: string;
}) {
  return (
    <article
      id={id}
      className={cn(
        "flex flex-col rounded-2xl border border-line bg-surface p-6 shadow-[var(--shadow-card)] scroll-mt-28",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <span
            className={cn(
              "inline-flex h-8 items-center rounded-full px-3 text-xs font-semibold uppercase tracking-wide ring-1",
              accentRing[solution.accent],
            )}
          >
            Solução {solution.order} / 7
          </span>
          <h3 className="mt-3 font-display text-xl font-semibold text-ink">
            {solution.name}
          </h3>
          <p className="text-sm text-muted">{solution.category}</p>
        </div>
        <LogoBadge solution={solution} size="md" />
      </div>

      <p className="mt-4 text-sm font-medium text-slate">{solution.role}</p>

      <dl className="mt-4 space-y-3 border-t border-line pt-4 text-sm">
        <div>
          <dt className="font-semibold text-primary">O que é</dt>
          <dd className="mt-1 text-slate">{solution.whatIs}</dd>
        </div>
        <div>
          <dt className="font-semibold text-primary">O que entrega</dt>
          <dd className="mt-1 text-slate">{solution.delivers}</dd>
        </div>
        <div>
          <dt className="font-semibold text-primary">Como contribui</dt>
          <dd className="mt-1 text-slate">{solution.contributes}</dd>
        </div>
      </dl>

      {solution.partnerNote ? (
        <p className="mt-4 text-xs italic text-muted">{solution.partnerNote}</p>
      ) : null}
    </article>
  );
}
