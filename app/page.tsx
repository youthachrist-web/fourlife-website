import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/sections/hero";
import { Reality } from "@/components/sections/reality";
import { Cost } from "@/components/sections/cost";
import { Ecosystem } from "@/components/sections/ecosystem";
import { Method } from "@/components/sections/method";
import { Diagnostico } from "@/components/sections/diagnostico";
import { MetricsKit } from "@/components/sections/metrics-kit";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { CtaBand } from "@/components/sections/cta-band";
import { Section, SectionHeading } from "@/components/ui/section";
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
      <Reality />
      <Cost />
      <Ecosystem />

      <Section id="solucoes" className="bg-background">
        <SectionHeading
          eyebrow="As 7 soluções"
          title="Uma frente para cada causa de perda de produtividade"
          body="Da saúde mental ao compliance de SST, da telemedicina à educação — cada solução gera dados que o núcleo FourLife transforma em decisão."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {solutions.slice(0, 6).map((s) => (
            <SolutionCard key={s.slug} solution={s} />
          ))}
        </div>
        <div className="mt-8">
          <Link
            href="/solucoes"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            Ver as 7 soluções em detalhe <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      <Method />
      <Diagnostico />
      <MetricsKit />
      <Testimonials />
      <Faq />
      <CtaBand />
    </>
  );
}
