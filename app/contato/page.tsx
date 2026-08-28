import type { Metadata } from "next";
import { Mail, MessageCircle, User } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { LeadForm } from "@/components/lead/lead-form";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com a FourLife sobre o ecossistema integrado de produtividade e saúde. Retorno em até 1 dia útil.",
  alternates: { canonical: "/contato" },
};

export default function ContatoPage() {
  return (
    <Section className="bg-surface">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-start">
        <div>
          <SectionHeading
            eyebrow="Contato"
            title="Vamos transformar saúde em ROI"
            body="Conte o desafio atual da sua operação. A equipe comercial da FourLife retorna em até 1 dia útil."
          />
          <ul className="mt-8 space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <Mail className="h-4 w-4" />
              </span>
              <a href={`mailto:${site.contact.email}`} className="text-slate hover:text-primary">
                {site.contact.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <MessageCircle className="h-4 w-4" />
              </span>
              <a
                href={site.contact.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="text-slate hover:text-primary"
              >
                Falar no WhatsApp
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <User className="h-4 w-4" />
              </span>
              <span className="text-slate">
                {site.contact.salesContact} ·{" "}
                <a
                  href={`mailto:${site.contact.salesEmail}`}
                  className="hover:text-primary"
                >
                  {site.contact.salesEmail}
                </a>
              </span>
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-line bg-background p-6 shadow-[var(--shadow-card)] sm:p-8">
          <LeadForm />
        </div>
      </div>
    </Section>
  );
}
