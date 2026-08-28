import { getEnv } from "@/lib/env";
import type { Lead } from "@/db/schema";

export type IntegrationOutcome = {
  ok: boolean;
  skipped?: boolean;
  detail: Record<string, unknown>;
};

/**
 * Forward a persisted lead to the n8n automation webhook.
 * Failures are reported, never thrown — the lead is already safe in Postgres.
 */
export async function forwardToN8n(lead: Lead): Promise<IntegrationOutcome> {
  const env = getEnv();
  if (!env.N8N_WEBHOOK_URL) {
    return { ok: false, skipped: true, detail: { reason: "N8N_WEBHOOK_URL unset" } };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);

  try {
    const res = await fetch(env.N8N_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(env.N8N_WEBHOOK_SECRET
          ? { "x-fourlife-signature": env.N8N_WEBHOOK_SECRET }
          : {}),
      },
      body: JSON.stringify({
        event: "lead.created",
        sentAt: new Date().toISOString(),
        lead: {
          id: lead.id,
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          company: lead.company,
          employees: lead.employees,
          interest: lead.interest,
          message: lead.message,
          source: lead.source,
          page: lead.page,
          referrer: lead.referrer,
          utm: {
            source: lead.utmSource,
            medium: lead.utmMedium,
            campaign: lead.utmCampaign,
            term: lead.utmTerm,
            content: lead.utmContent,
          },
          consent: lead.consent,
          consentAt: lead.consentAt,
          createdAt: lead.createdAt,
        },
      }),
      signal: controller.signal,
    });

    const text = await res.text().catch(() => "");
    return {
      ok: res.ok,
      detail: { httpStatus: res.status, body: text.slice(0, 500) },
    };
  } catch (err) {
    return {
      ok: false,
      detail: { error: err instanceof Error ? err.message : String(err) },
    };
  } finally {
    clearTimeout(timeout);
  }
}
