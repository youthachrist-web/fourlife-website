import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { SolutionCard } from "@/components/sections/solution-card";
import { CtaBand } from "@/components/sections/cta-band";
import { solutions } from "@/lib/content";
import { JsonLd, breadcrumbLd, pageSocial, servicesLd } from "@/lib/seo";

const title = "Soluções do ecossistema FourLife";
const description =
  "As oito soluções do ecossistema FourLife: gestão inteligente e People Analytics, saúde mental e riscos psicossociais (NR-1), compliance de SST e eSocial, medicina ocupacional, telemedicina corporativa, educação corporativa, estratégia comercial B2B e consultoria/treinamentos em SST.";

export const metadata: Metadata = {
  title: "Soluções",
  description,
  alternates: { canonical: "/solucoes", languages: { "pt-BR": "/solucoes" } },
  keywords: [
    "soluções de saúde corporativa",
    "riscos psicossociais NR-1",
    "compliance SST eSocial",
    "PGR PCMSO",
    "medicina ocupacional exames",
    "telemedicina corporativa",
    "educação corporativa upskilling",
    "People Analytics saúde do trabalho",
  ],
  ...pageSocial("/solucoes", title, description),
};

export default function SolucoesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Início", path: "/" },
            { name: "Soluções", path: "/solucoes" },
          ]),
          servicesLd(),
        ]}
      />
      <Section className="bg-surface">
        <SectionHeading
          eyebrow="O ecossistema"
          title="Oito soluções, um núcleo inteligente"
          body="Cada solução resolve uma causa concreta de perda de produtividade e alimenta o núcleo FourLife com dados. O resultado é uma estratégia única — não fornecedores isolados."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {solutions.map((s, i) => (
            <Reveal key={s.slug} delay={i * 70}>
              <SolutionCard id={s.slug} solution={s} className="h-full" />
            </Reveal>
          ))}
        </div>
      </Section>
      <CtaBand
        title="Qual frente pesa mais na sua operação?"
        body="No diagnóstico gratuito priorizamos as soluções de maior impacto na receita pelo menor esforço."
      />
    </>
  );
}
