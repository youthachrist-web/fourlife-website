import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Obrigado",
  description: "Recebemos seu contato.",
  alternates: { canonical: "/obrigado" },
  robots: { index: false, follow: false },
};

export default function ObrigadoPage() {
  return (
    <Section className="bg-surface">
      <div className="mx-auto max-w-xl text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-brand-600" />
        <h1 className="mt-4 font-display text-3xl font-semibold text-ink">
          Recebemos seu contato
        </h1>
        <p className="mt-3 text-slate">
          A equipe comercial da FourLife responde em até 1 dia útil. Se preferir, fale
          agora pelo WhatsApp ou por {site.contact.email}.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">Voltar ao início</ButtonLink>
          <ButtonLink href="/solucoes" variant="outline">
            Ver as soluções
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
