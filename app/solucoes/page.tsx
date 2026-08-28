import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/section";
import { SolutionCard } from "@/components/sections/solution-card";
import { CtaBand } from "@/components/sections/cta-band";
import { solutions } from "@/lib/content";

export const metadata: Metadata = {
  title: "Soluções",
  description:
    "As sete soluções do ecossistema FourLife: gestão inteligente, saúde mental, compliance de SST, medicina ocupacional, telemedicina, educação corporativa e estratégia comercial.",
  alternates: { canonical: "/solucoes" },
};

export default function SolucoesPage() {
  return (
    <>
      <Section className="bg-surface">
        <SectionHeading
          eyebrow="O ecossistema"
          title="Sete soluções, um núcleo inteligente"
          body="Cada solução resolve uma causa concreta de perda de produtividade e alimenta o núcleo FourLife com dados. O resultado é uma estratégia única — não fornecedores isolados."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {solutions.map((s) => (
            <SolutionCard key={s.slug} id={s.slug} solution={s} />
          ))}
        </div>
      </Section>
      <CtaBand
        title="Qual frente pesa mais na sua operação?"
        body="No Diagnóstico 360º priorizamos as soluções de maior impacto na receita pelo menor esforço."
      />
    </>
  );
}
