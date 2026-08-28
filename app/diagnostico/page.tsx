import type { Metadata } from "next";
import { Diagnostico } from "@/components/sections/diagnostico";
import { Section, SectionHeading } from "@/components/ui/section";
import { LeadForm } from "@/components/lead/lead-form";

export const metadata: Metadata = {
  title: "Diagnóstico 360º",
  description:
    "Oito blocos que mapeiam o dinheiro oculto do seu negócio. A entrega são as 3 prioridades de maior impacto na receita pelo menor esforço.",
  alternates: { canonical: "/diagnostico" },
};

export default function DiagnosticoPage() {
  return (
    <>
      <Diagnostico withCta={false} />
      <Section id="solicitar" className="bg-background">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <SectionHeading
            eyebrow="Solicitar"
            title="Peça seu Diagnóstico 360º"
            body="Preencha os dados e a equipe FourLife retorna em até 1 dia útil com os próximos passos. Não são 30 páginas — são 3 prioridades que vendem o plano."
          />
          <div className="rounded-2xl border border-line bg-surface p-6 shadow-[var(--shadow-card)] sm:p-8">
            <LeadForm defaultInterest="Diagnóstico 360º" />
          </div>
        </div>
      </Section>
    </>
  );
}
