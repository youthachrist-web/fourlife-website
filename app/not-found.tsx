import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Section className="bg-surface">
      <div className="mx-auto max-w-md text-center">
        <p className="font-display text-5xl font-semibold text-brand-300">404</p>
        <h1 className="mt-3 font-display text-2xl font-semibold text-ink">
          Página não encontrada
        </h1>
        <p className="mt-2 text-slate">
          O endereço que você acessou não existe ou foi movido.
        </p>
        <ButtonLink href="/" className="mt-6">
          Voltar ao início
        </ButtonLink>
      </div>
    </Section>
  );
}
