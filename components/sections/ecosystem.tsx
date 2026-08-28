"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { LogoBadge } from "@/components/ui/logo-badge";
import { CountUp } from "@/components/ui/count-up";
import { ButtonLink } from "@/components/ui/button";
import { ecosystemIntro, ecosystemStats, solutions } from "@/lib/content";

export function Ecosystem() {
  const [active, setActive] = useState(solutions[0].slug);
  const current = solutions.find((s) => s.slug === active) ?? solutions[0];
  const reduce = useReducedMotion();

  return (
    <Section id="ecossistema" className="bg-surface-2">
      <SectionHeading
        eyebrow={ecosystemIntro.eyebrow}
        title={ecosystemIntro.title}
        body={ecosystemIntro.body}
      />

      {/* Numbers — animated on scroll */}
      <dl className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {ecosystemStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-line bg-background p-5"
          >
            <dt className="font-display text-3xl font-semibold text-primary">
              <CountUp value={stat.value} />
            </dt>
            <dd className="mt-1 text-sm text-muted">{stat.label}</dd>
          </div>
        ))}
      </dl>

      {/* Tab strip — every logo stays visible while switching */}
      <div
        role="tablist"
        aria-label="Soluções do ecossistema"
        className="mt-12 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:flex-wrap md:overflow-visible"
      >
        {solutions.map((s) => {
          const selected = s.slug === active;
          return (
            <button
              key={s.slug}
              role="tab"
              type="button"
              aria-selected={selected}
              onClick={() => setActive(s.slug)}
              className={`flex shrink-0 items-center rounded-xl border px-3 py-2 transition-colors ${
                selected
                  ? "border-brand-300 bg-background shadow-[var(--shadow-card)]"
                  : "border-line bg-background/60 hover:border-brand-200"
              }`}
            >
              <LogoBadge solution={s} size="sm" />
            </button>
          );
        })}
      </div>

      {/* Animated detail panel */}
      <div className="mt-4 rounded-2xl border border-line bg-background p-6 shadow-[var(--shadow-card)] sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.slug}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <LogoBadge solution={current} size="lg" />
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                Solução {current.order} / 7
              </span>
            </div>
            <h3 className="mt-4 font-display text-2xl font-semibold text-ink">
              {current.name}
            </h3>
            <p className="text-sm text-muted">{current.category}</p>
            <p className="mt-3 text-sm font-medium text-slate">{current.role}</p>

            <dl className="mt-5 grid gap-4 border-t border-line pt-5 sm:grid-cols-3">
              {[
                ["O que é", current.whatIs],
                ["O que entrega", current.delivers],
                ["Como contribui", current.contributes],
              ].map(([term, def]) => (
                <div key={term}>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-primary">
                    {term}
                  </dt>
                  <dd className="mt-1 text-sm text-slate">{def}</dd>
                </div>
              ))}
            </dl>

            {current.partnerNote ? (
              <p className="mt-4 text-xs italic text-muted">{current.partnerNote}</p>
            ) : null}
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-line pt-5">
          <Link
            href={`/solucoes#${current.slug}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            Página da solução <ArrowRight className="h-4 w-4" />
          </Link>
          <ButtonLink href="/solucoes" size="sm" variant="outline">
            Ver as 7 soluções
          </ButtonLink>
        </div>
      </div>

      <p className="mt-6 rounded-xl bg-background px-4 py-3 text-sm text-slate ring-1 ring-line">
        {ecosystemIntro.equation}
      </p>
    </Section>
  );
}
