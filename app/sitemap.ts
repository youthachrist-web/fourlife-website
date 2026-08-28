import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || site.url).replace(/\/$/, "");
  const now = new Date();
  const routes = ["", "/solucoes", "/metodo", "/diagnostico", "/sobre", "/contato", "/privacidade", "/termos"];
  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/contato" || path === "/diagnostico" ? 0.8 : 0.6,
  }));
}
