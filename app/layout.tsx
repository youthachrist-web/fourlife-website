import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/content";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { MobileCta } from "@/components/site/mobile-cta";
import { ConsentGate } from "@/components/site/consent-gate";
import { LeadModalProvider } from "@/components/lead/lead-modal";
import { JsonLd, organizationLd, websiteLd } from "@/lib/seo";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

// `||` (not `??`) so an empty-string env var still falls back to a valid URL.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || site.url || "https://fourlife.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — Ecossistema Integrado de Produtividade e Saúde`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "saúde corporativa",
    "saúde ocupacional",
    "produtividade no trabalho",
    "ecossistema de saúde corporativa",
    "SST",
    "eSocial SST",
    "NR-1 riscos psicossociais",
    "PGR PCMSO",
    "medicina ocupacional",
    "exames ocupacionais",
    "ASO",
    "telemedicina corporativa",
    "telemedicina para empresas",
    "saúde mental no trabalho",
    "burnout",
    "absenteísmo",
    "presenteísmo",
    "redução de absenteísmo",
    "ROI em saúde",
    "People Analytics",
    "clima organizacional",
    "riscos psicossociais",
    "gestão de SST",
    "passivo trabalhista",
    "retenção de talentos",
    "educação corporativa",
    "engenharia de segurança do trabalho",
    "diagnóstico de saúde corporativa",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  category: "Saúde e Segurança do Trabalho",
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.shortDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.shortDescription,
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#136a74",
  colorScheme: "light dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-ink">
        <JsonLd data={[organizationLd(), websiteLd()]} />
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
        >
          Pular para o conteúdo
        </a>
        <LeadModalProvider>
          <SiteHeader />
          <main id="conteudo" className="flex-1">
            {children}
          </main>
          <SiteFooter />
          <MobileCta />
        </LeadModalProvider>
        <ConsentGate />
      </body>
    </html>
  );
}
