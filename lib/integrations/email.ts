import nodemailer, { type Transporter } from "nodemailer";
import { getEnv } from "@/lib/env";
import type { Lead } from "@/db/schema";
import type { IntegrationOutcome } from "./n8n";

let transporter: Transporter | null = null;

function getTransporter(): Transporter {
  if (transporter) return transporter;
  const env = getEnv();
  transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT ?? 465,
    secure: env.SMTP_SECURE ?? (env.SMTP_PORT ?? 465) === 465,
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
    // Fail fast if the SMTP port is blocked / slow — never hang the request.
    connectionTimeout: 10_000,
    greetingTimeout: 8_000,
    socketTimeout: 15_000,
  });
  return transporter;
}

function esc(v: string | null | undefined): string {
  return (v ?? "—")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Notify the commercial inbox that a new lead came in. Never throws. */
export async function notifyNewLead(lead: Lead): Promise<IntegrationOutcome> {
  const env = getEnv();
  if (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASS || !env.LEAD_NOTIFY_TO) {
    return { ok: false, skipped: true, detail: { reason: "SMTP unset" } };
  }

  const rows: [string, string | null | undefined][] = [
    ["Nome", lead.name],
    ["E-mail", lead.email],
    ["Telefone", lead.phone],
    ["Empresa", lead.company],
    ["Porte", lead.employees],
    ["Interesse", lead.interest],
    ["Mensagem", lead.message],
    ["Página", lead.page],
    ["Origem", lead.source],
    ["UTM", [lead.utmSource, lead.utmMedium, lead.utmCampaign].filter(Boolean).join(" / ")],
  ];

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#0f2a2e">
      <h2 style="color:#136a74;margin:0 0 12px">Novo lead — FourLife</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="color:#6b7d80;vertical-align:top"><strong>${k}</strong></td><td>${esc(
                typeof v === "string" ? v : v ?? "",
              )}</td></tr>`,
          )
          .join("")}
      </table>
      <p style="color:#6b7d80;margin-top:16px">Lead #${lead.id} · ${new Date(
        lead.createdAt,
      ).toLocaleString("pt-BR")}</p>
    </div>`;

  try {
    const info = await getTransporter().sendMail({
      from: env.LEAD_NOTIFY_FROM || `"FourLife Site" <${env.SMTP_USER}>`,
      to: env.LEAD_NOTIFY_TO,
      replyTo: `${lead.name} <${lead.email}>`,
      subject: `Novo lead: ${lead.company} — ${lead.name}`,
      html,
    });
    return { ok: true, detail: { messageId: info.messageId } };
  } catch (err) {
    return {
      ok: false,
      detail: { error: err instanceof Error ? err.message : String(err) },
    };
  }
}
