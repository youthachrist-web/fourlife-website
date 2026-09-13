import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { HealthJourney } from "@/components/sections/health-journey";
import { CtaBand } from "@/components/sections/cta-band";
import { LeadCta } from "@/components/lead/lead-cta";
import { differentials } from "@/lib/content";
import { JsonLd, breadcrumbLd, pageSocial, localBusinessLd } from "@/lib/seo";

const title = "Diferenciais Carlos Chagas — medicina ocupacional";
const description =
  "Os diferenciais Carlos Chagas em medicina ocupacional: exames, ASOs e laudos com estrutura própria em Porto Alegre, Canoas e Cachoeirinha (RS), resultados em até 48h, atendimento por ordem de chegada e corpo técnico 100% CLT. Mais a Jornada da Saúde de 6 meses.";

export const metadata: Metadata = {
  title: "Diferenciais",
  description,
  alternates: { canonical: "/diferenciais", languages: { "pt-BR": "/diferenciais" } },
  keywords: [
    "medicina ocupacional Porto Alegre",
    "exames admissionais Canoas",
    "ASO atestado de saúde ocupacional",
    "PCMSO PGR laudos",
    "exames toxicológicos",
    "medicina do trabalho RS",
    "atendimento in company unidade móvel",
  ],
  // Sinaliza a praça de atuação física (RS) para busca local — a página em
  // si é nacional, mas a operação presencial da Carlos Chagas é no RS.
  other: {
    "geo.region": "BR-RS",
    "geo.placename": "Porto Alegre, Canoas, Cachoeirinha",
  },
  ...pageSocial("/diferenciais", title, description),
};

export default function DiferenciaisPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Início", path: "/" },
            { name: "Diferenciais", path: "/diferenciais" },
          ]),
          localBusinessLd(),
        ]}
      />
      <Section className="bg-surface">
        <div className="max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {differentials.eyebrow}
          </p>
          <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            {differentials.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate sm:text-lg">
            {differentials.body}
          </p>
          <div className="mt-8">
            <LeadCta size="lg" interest="Diferenciais Carlos Chagas (saúde ocupacional)">
              Falar com a assessoria <ArrowRight className="h-4 w-4" />
            </LeadCta>
          </div>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {differentials.items.map((item) => (
            <li
              key={item.title}
              className="flex flex-col rounded-2xl border border-line bg-background p-6 shadow-[var(--shadow-card)]"
            >
              <h2 className="font-display text-base font-semibold text-ink">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate">{item.detail}</p>
            </li>
          ))}
        </ul>
      </Section>

      <HealthJourney className="bg-surface-2" />

      <CtaBand
        title="Leve o check-up estratégico para a sua operação"
        body="Comece pelos diferenciais Carlos Chagas e pela Jornada da Saúde de 6 meses."
      />
    </>
  );
}
