import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/section";
import { CtaBand } from "@/components/sections/cta-band";
import { pillars, ecosystemIntro, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "A FourLife é o primeiro ecossistema unificado de produtividade e saúde corporativa do Brasil: saúde física e mental, tecnologia e inovação, normas regulamentadoras e educação em uma só estratégia.",
  alternates: { canonical: "/sobre" },
};

export default function SobrePage() {
  return (
    <>
      <Section className="bg-surface">
        <SectionHeading
          eyebrow="Sobre a FourLife"
          title="Educação que previne, saúde que transforma"
          body={site.description}
        />
        <div className="mt-8 max-w-3xl space-y-4 text-base leading-relaxed text-slate">
          <p>
            A FourLife nasce para tratar a saúde ocupacional como investimento
            estratégico — não como obrigação de compliance. Em vez de contratar
            fornecedores isolados de medicina, segurança, educação e tecnologia, a
            empresa passa a operar com uma estratégia única, orquestrada por um núcleo
            de dados.
          </p>
          <p>
            O ecossistema é aderente às normas regulamentadoras e ao eSocial (NR-1, NR-7
            e demais NRs aplicáveis), com envio simplificado de eventos de SST e gestão
            integrada de PGR, PCMSO, laudos e ASOs.
          </p>
          <p className="font-medium text-ink">{ecosystemIntro.equation}</p>
        </div>
      </Section>

      <Section className="bg-background">
        <SectionHeading eyebrow="Como pensamos" title="Quatro pilares, uma estratégia" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <div
              key={pillar.name}
              className="rounded-2xl border border-line bg-surface p-6 shadow-[var(--shadow-card)]"
            >
              <p className="font-display text-lg font-semibold text-ink">{pillar.name}</p>
              <p className="mt-2 text-sm text-slate">{pillar.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
