import type { Metadata } from "next";
import { faq, site, solutions } from "./content";

const url = (process.env.NEXT_PUBLIC_SITE_URL || site.url).replace(/\/$/, "");

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${url}/#organization`,
    name: site.legalName,
    alternateName: site.name,
    url,
    email: site.contact.email,
    description: site.shortDescription,
    slogan: site.slogan,
    // Nacional (B2B, todo o Brasil) + as praças com estrutura própria da
    // Diferenciais Carlos Chagas (medicina ocupacional presencial).
    areaServed: [
      { "@type": "Country", name: "Brasil" },
      { "@type": "City", name: "Porto Alegre" },
      { "@type": "City", name: "Canoas" },
      { "@type": "City", name: "Cachoeirinha" },
    ],
    knowsAbout: [
      "Saúde ocupacional",
      "Medicina do trabalho",
      "Segurança do trabalho",
      "Absenteísmo",
      "Presenteísmo",
      "Riscos psicossociais (NR-1)",
      "eSocial SST",
      "PGR e PCMSO",
      "ASO — Atestado de Saúde Ocupacional",
      "Telemedicina corporativa",
      "People Analytics",
      "Clima organizacional",
      "Educação corporativa",
      "Upskilling e Reskilling",
      "Diagnóstico gratuito de saúde corporativa",
      "ROI em saúde corporativa",
    ],
  };
}

/**
 * Título e descrição de Open Graph / Twitter para uma página interna —
 * sem isto, todo compartilhamento herda o preview da home (`layout.tsx`),
 * o que prejudica CTR em redes sociais e a citação por engines de IA (GEO).
 */
export function pageSocial(
  path: string,
  title: string,
  description: string,
): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url: `${url}${path}`,
      siteName: site.name,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/** Breadcrumb JSON-LD — reforça a hierarquia do site para busca e GEO. */
export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${url}${item.path}`,
    })),
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${url}/#website`,
    url,
    name: site.name,
    inLanguage: "pt-BR",
    publisher: { "@id": `${url}/#organization` },
  };
}

export function faqLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function servicesLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Soluções do ecossistema FourLife",
    itemListElement: solutions.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.name,
        serviceType: s.category,
        description: s.whatIs,
        provider: { "@id": `${url}/#organization` },
        areaServed: "BR",
        url: `${url}/solucoes#${s.slug}`,
      },
    })),
  };
}

/** Renders one or more JSON-LD blocks. */
export function JsonLd({ data }: { data: object | object[] }) {
  const blocks = Array.isArray(data) ? data : [data];
  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}
