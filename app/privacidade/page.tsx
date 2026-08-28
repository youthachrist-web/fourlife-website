import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como a FourLife coleta, usa e protege os dados pessoais enviados pelos formulários do site, em conformidade com a LGPD.",
  alternates: { canonical: "/privacidade" },
  robots: { index: true, follow: false },
};

const updated = "28 de agosto de 2026";

export default function PrivacidadePage() {
  return (
    <Section className="bg-surface">
      <div className="prose-fourlife mx-auto max-w-3xl">
        <h1 className="font-display text-3xl font-semibold text-ink">
          Política de Privacidade
        </h1>
        <p className="mt-2 text-sm text-muted">Última atualização: {updated}</p>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-slate">
          <section>
            <h2 className="font-display text-lg font-semibold text-ink">
              1. Quem é o controlador
            </h2>
            <p className="mt-2">
              O controlador dos dados é a FourLife{" "}
              <em>(razão social e CNPJ a confirmar)</em>. Para qualquer questão relativa a
              dados pessoais, escreva para{" "}
              <a href={`mailto:${site.contact.email}`} className="text-primary underline">
                {site.contact.email}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-ink">
              2. Dados que coletamos
            </h2>
            <p className="mt-2">
              Coletamos apenas os dados que você fornece voluntariamente nos formulários:
              nome, e-mail, telefone/WhatsApp, empresa, porte, interesse e mensagem.
              Registramos também dados técnicos mínimos: página de origem, parâmetros de
              campanha (UTM), endereço IP e user agent, usados para segurança e atribuição.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-ink">
              3. Finalidade e base legal
            </h2>
            <p className="mt-2">
              Os dados são tratados para responder à sua solicitação, apresentar as
              soluções da FourLife e conduzir o relacionamento comercial. A base legal é o
              seu consentimento e o legítimo interesse em contato B2B (art. 7º, I e IX, da
              LGPD).
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-ink">
              4. Compartilhamento
            </h2>
            <p className="mt-2">
              Os dados podem ser processados por provedores de infraestrutura, automação e
              e-mail contratados pela FourLife, exclusivamente para as finalidades acima e
              sob obrigações de confidencialidade. Não vendemos dados pessoais.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-ink">5. Retenção</h2>
            <p className="mt-2">
              Mantemos os dados pelo tempo necessário ao relacionamento comercial e ao
              cumprimento de obrigações legais. Você pode solicitar a exclusão a qualquer
              momento.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-ink">
              6. Seus direitos
            </h2>
            <p className="mt-2">
              Você pode solicitar confirmação de tratamento, acesso, correção,
              anonimização, portabilidade, eliminação e revogação do consentimento,
              escrevendo para{" "}
              <a href={`mailto:${site.contact.email}`} className="text-primary underline">
                {site.contact.email}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-ink">7. Cookies</h2>
            <p className="mt-2">
              Este site não utiliza cookies de rastreamento de terceiros. Caso ferramentas
              de medição sejam adicionadas no futuro, esta política será atualizada e o
              consentimento solicitado quando exigido.
            </p>
          </section>
        </div>
      </div>
    </Section>
  );
}
