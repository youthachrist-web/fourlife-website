import Link from "next/link";
import Image from "next/image";
import { Mail, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { nav, site } from "@/lib/content";

const legal = [
  { label: "Política de Privacidade", href: "/privacidade" },
  { label: "Termos de Uso", href: "/termos" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-surface-2">
      <Container className="grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Image
            src="/brand/fourlife-wordmark.png"
            alt={site.name}
            width={716}
            height={212}
            className="h-9 w-auto"
          />
          <p className="mt-3 font-display text-sm font-medium text-primary">
            {site.slogan}
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate">
            {site.description}
          </p>
        </div>

        <nav aria-label="Páginas" className="text-sm">
          <p className="mb-3 font-semibold text-ink">Navegar</p>
          <ul className="space-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-slate hover:text-primary">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="text-sm">
          <p className="mb-3 font-semibold text-ink">Contato</p>
          <ul className="space-y-2">
            <li>
              <a
                href={`mailto:${site.contact.email}`}
                className="inline-flex items-center gap-2 text-slate hover:text-primary"
              >
                <Mail className="h-4 w-4" /> {site.contact.email}
              </a>
            </li>
            <li>
              <a
                href={site.contact.whatsappUrl}
                className="inline-flex items-center gap-2 text-slate hover:text-primary"
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp {site.contact.phoneDisplay}
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-col items-start justify-between gap-3 py-6 pb-24 text-xs text-muted sm:flex-row sm:items-center lg:pb-6">
          <p>
            © {year} {site.legalName}. Todos os direitos reservados.
          </p>
          <ul className="flex gap-4">
            {legal.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-primary">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
