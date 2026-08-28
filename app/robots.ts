import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

export default function robots(): MetadataRoute.Robots {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? site.url).replace(/\/$/, "");
  const disallow = ["/api/", "/admin", "/obrigado"];

  // AI answer engines — explicitly welcomed for citation/GEO.
  const aiBots = [
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Claude-Web",
    "anthropic-ai",
    "PerplexityBot",
    "Perplexity-User",
    "Google-Extended",
    "Applebot-Extended",
    "CCBot",
    "Bytespider",
    "Amazonbot",
    "cohere-ai",
  ];

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      ...aiBots.map((ua) => ({ userAgent: ua, allow: "/", disallow })),
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
