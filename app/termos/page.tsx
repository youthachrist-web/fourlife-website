import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Termos de uso do site institucional da FourLife.",
  alternates: { canonical: "/termos" },
  robots: { index: true, follow: false },
};

export default function TermosPage() {
  return (
    <Section className="bg-surface">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-3xl font-semibold text-ink">Termos de Uso</h1>
        <p className="mt-2 text-sm text-muted">Última atualização: 28 de agosto de 2026</p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate">
          <p>
            Este site é mantido pela FourLife com finalidade informativa sobre o seu
            ecossistema de produtividade e saúde corporativa. O conteúdo pode ser
            atualizado a qualquer momento, sem aviso prévio.
          </p>
          <p>
            As marcas, logotipos e conteúdos aqui exibidos pertencem à FourLife e às
            empresas parceiras do ecossistema e não podem ser reproduzidos sem
            autorização.
          </p>
          <p>
            Ao enviar um formulário, você declara que as informações são verdadeiras e
            que leu a{" "}
            <a href="/privacidade" className="text-primary underline">
              Política de Privacidade
            </a>
            .
          </p>
          <p>
            Dúvidas sobre estes termos podem ser enviadas para{" "}
            <a href={`mailto:${site.contact.email}`} className="text-primary underline">
              {site.contact.email}
            </a>
            .
          </p>
        </div>
      </div>
    </Section>
  );
}
