import type { Metadata } from "next";
import { Reality } from "@/components/sections/reality";
import { CtaBand } from "@/components/sections/cta-band";
import { realityHeadline } from "@/lib/content";
import { JsonLd, breadcrumbLd, pageSocial } from "@/lib/seo";

const title = "A Realidade Invisível do Adoecimento no Trabalho";
const description = realityHeadline.body;

export const metadata: Metadata = {
  title: "A Realidade Invisível",
  description,
  alternates: { canonical: "/realidade-invisivel", languages: { "pt-BR": "/realidade-invisivel" } },
  ...pageSocial("/realidade-invisivel", title, description),
};

export default function RealidadeInvisivelPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Início", path: "/" },
          { name: "A Realidade Invisível", path: "/realidade-invisivel" },
        ])}
      />
      <Reality />
      <CtaBand
        title="Não deixe o adoecimento virar rotina na sua empresa"
        body="Comece por um diagnóstico gratuito e receba as 3 prioridades de maior impacto na receita."
      />
    </>
  );
}
