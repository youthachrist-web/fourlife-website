import { ArrowRight, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { LeadCta } from "@/components/lead/lead-cta";
import { cta, site } from "@/lib/content";

export function CtaBand({
  title = "Saúde que engaja. Dados que provam.",
  body = "Comece pelo Diagnóstico 360º e receba as 3 prioridades de maior impacto na receita.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-primary py-16 text-white">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" aria-hidden />
      <Container className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">{title}</h2>
          <p className="mt-3 text-brand-100">{body}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <LeadCta size="lg" variant="secondary">
            {cta.primary.label} <ArrowRight className="h-4 w-4" />
          </LeadCta>
          <a
            href={site.contact.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-13 items-center gap-2 rounded-full border border-white/40 px-6 text-base font-medium text-white transition-colors hover:bg-white/10"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
        </div>
      </Container>
    </section>
  );
}
