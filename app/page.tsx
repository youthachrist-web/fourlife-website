import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/sections/hero";
import { Pillars } from "@/components/sections/pillars";
import { HealthJourney } from "@/components/sections/health-journey";
import { CheckupInsights } from "@/components/sections/checkup-insights";
import { Differentials } from "@/components/sections/differentials";
import { Reality } from "@/components/sections/reality";
import { Cost } from "@/components/sections/cost";
import { Ecosystem } from "@/components/sections/ecosystem";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { CtaBand } from "@/components/sections/cta-band";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { DragScroll } from "@/components/ui/drag-scroll";
import { SolutionCard } from "@/components/sections/solution-card";
import { JsonLd, faqLd, servicesLd } from "@/lib/seo";
import { solutions, site } from "@/lib/content";

export const metadata: Metadata = {
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={[faqLd(), servicesLd()]} />
      <Hero />
      <Pillars />
      <HealthJourney />
      <Differentials className="bg-surface-2" />
      <CheckupInsights className="bg-background" />
      <Reality />
      <Cost />
      <Ecosystem />

      <Section id="solucoes" className="bg-background">
        <SectionHeading
          eyebrow="As 7 soluções"
          title="Uma frente para cada causa de perda de produtividade"
          body="Da saúde mental ao compliance de SST, da telemedicina à educação — cada solução gera dados que o núcleo FourLife transforma em decisão."
        />
        <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-muted">
          <ArrowRight className="h-3.5 w-3.5" /> arraste para ver as soluções
        </div>
        <DragScroll ariaLabel="Soluções do ecossistema" className="-mx-5 mt-3 px-5 sm:mx-0 sm:px-0">
          {solutions.slice(0, 6).map((s, i) => (
            <Reveal
              key={s.slug}
              delay={i * 70}
              className="w-[82%] shrink-0 snap-start sm:w-[60%] lg:w-[calc((100%-2.5rem)/3)]"
            >
              <SolutionCard solution={s} className="h-full" />
            </Reveal>
          ))}
        </DragScroll>
        <div className="mt-8">
          <Link
            href="/solucoes"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            Ver as 7 soluções em detalhe <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      <Testimonials />
      <Faq />
      <CtaBand />
    </>
  );
}
