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
    areaServed: { "@type": "Country", name: "Brasil" },
    knowsAbout: [
      "Saúde ocupacional",
      "Segurança do trabalho",
      "Absenteísmo",
      "Presenteísmo",
      "Riscos psicossociais (NR-1)",
      "eSocial SST",
      "Telemedicina corporativa",
      "People Analytics",
      "ROI em saúde corporativa",
    ],
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
