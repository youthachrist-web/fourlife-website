import { ImageResponse } from "next/og";
import { site } from "@/lib/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.tagline}`;

// Card padrão de compartilhamento (Open Graph + Twitter) para todo o site —
// sem isto, qualquer link do FourLife aparece sem imagem ao ser
// compartilhado (WhatsApp, LinkedIn, Slack) ou citado por engines de IA.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0a1618",
          backgroundImage:
            "radial-gradient(circle at 82% 18%, rgba(51,190,201,0.35), transparent 55%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: 7,
              background: "#a6ce3c",
            }}
          />
          <span style={{ fontSize: 30, fontWeight: 600, color: "#a6e8ee" }}>
            {site.name.toUpperCase()}
          </span>
        </div>
        <div
          style={{
            marginTop: 36,
            fontSize: 62,
            fontWeight: 700,
            lineHeight: 1.15,
            color: "#ffffff",
            maxWidth: 920,
          }}
        >
          {site.tagline}
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 28,
            color: "#6fd6e0",
            maxWidth: 860,
          }}
        >
          {site.shortDescription}
        </div>
      </div>
    ),
    { ...size },
  );
}
