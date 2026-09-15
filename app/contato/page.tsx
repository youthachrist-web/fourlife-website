import type { Metadata } from "next";
import { Mail, MessageCircle, User } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { LeadForm } from "@/components/lead/lead-form";
import { site } from "@/lib/content";
import { JsonLd, breadcrumbLd, pageSocial } from "@/lib/seo";

const title = "Contato — FourLife";
const description =
  "Fale com a FourLife sobre o ecossistema integrado de produtividade e saúde. Retorno em até 1 dia útil.";

export const metadata: Metadata = {
  title: "Contato",
  description,
  alternates: { canonical: "/contato", languages: { "pt-BR": "/contato" } },
  ...pageSocial("/contato", title, description),
};

export default function ContatoPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Início", path: "/" },
          { name: "Contato", path: "/contato" },
        ])}
      />
      <Section className="bg-surface">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Contato"
              title="Vamos transformar saúde em ROI"
              body="Conte o desafio atual da sua operação. A equipe comercial da FourLife retorna em até 1 dia útil."
            />
            <ul className="mt-8 space-y-4 text-sm">
              {[
                {
                  icon: Mail,
                  content: (
                    <a href={`mailto:${site.contact.email}`} className="text-slate hover:text-primary">
                      {site.contact.email}
                    </a>
                  ),
                },
                {
                  icon: MessageCircle,
                  content: (
                    <a
                      href={site.contact.whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate hover:text-primary"
                    >
                      Falar no WhatsApp
                    </a>
                  ),
                },
                {
                  icon: User,
                  content: (
                    <span className="text-slate">
                      {site.contact.salesContact} ·{" "}
                      <a href={`mailto:${site.contact.salesEmail}`} className="hover:text-primary">
                        {site.contact.salesEmail}
                      </a>
                    </span>
                  ),
                },
              ].map(({ icon: Icon, content }, i) => (
                <Reveal as="li" key={i} delay={i * 90} className="group flex items-center gap-3">
                  <span className="icon-pop inline-block">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                      <Icon className="h-4 w-4" />
                    </span>
                  </span>
                  {content}
                </Reveal>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-line bg-background p-6 shadow-[var(--shadow-card)] sm:p-8">
            <LeadForm />
          </div>
        </div>
      </Section>
    </>
  );
}
