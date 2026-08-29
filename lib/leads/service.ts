import { getDb } from "@/db";
import { leadEvents, leads, type Lead, type NewLead } from "@/db/schema";
import { forwardToN8n, type IntegrationOutcome } from "@/lib/integrations/n8n";
import { appendToSheet } from "@/lib/integrations/google-sheets";
import { notifyNewLead } from "@/lib/integrations/email";
import { eq } from "drizzle-orm";

export type CreateLeadInput = Omit<
  NewLead,
  | "id"
  | "createdAt"
  | "updatedAt"
  | "status"
  | "n8nStatus"
  | "sheetsStatus"
  | "emailStatus"
  | "processedAt"
>;

export type CreateLeadResult =
  | { ok: true; leadId: string; status: Lead["status"] }
  | { ok: false; code: "no_database" | "db_error"; message: string };

function statusOf(o: IntegrationOutcome) {
  if (o.skipped) return "skipped" as const;
  return o.ok ? ("ok" as const) : ("error" as const);
}

function withTimeout(
  p: Promise<IntegrationOutcome>,
  ms: number,
): Promise<IntegrationOutcome> {
  return Promise.race([
    p.catch((e): IntegrationOutcome => ({ ok: false, detail: { error: String(e) } })),
    new Promise<IntegrationOutcome>((resolve) =>
      setTimeout(
        () => resolve({ ok: false, detail: { error: `timeout after ${ms}ms` } }),
        ms,
      ),
    ),
  ]);
}

/**
 * Runs the post-persist integrations and records the outcome. Deliberately NOT
 * awaited by the request handler — the lead is already safe in Postgres, so the
 * visitor gets an instant response even if SMTP / n8n are slow.
 */
async function processIntegrations(lead: Lead) {
  const db = getDb();
  if (!db) return;

  const [n8n, sheet, email] = await Promise.all([
    withTimeout(forwardToN8n(lead), 9_000),
    withTimeout(appendToSheet(lead), 9_000),
    withTimeout(notifyNewLead(lead), 18_000),
  ]);

  const active = [n8n, sheet, email].filter((o) => !o.skipped);
  const anyError = active.some((o) => !o.ok);
  const overall: Lead["status"] =
    active.length === 0
      ? "processing"
      : active.every((o) => o.ok)
        ? "delivered"
        : anyError && active.some((o) => o.ok)
          ? "partial"
          : "failed";

  try {
    await db
      .update(leads)
      .set({
        status: overall,
        n8nStatus: statusOf(n8n),
        sheetsStatus: statusOf(sheet),
        emailStatus: statusOf(email),
        processedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(leads.id, lead.id));

    await db.insert(leadEvents).values(
      (
        [
          { type: "n8n", outcome: n8n },
          { type: "google_sheets", outcome: sheet },
          { type: "email_notify", outcome: email },
        ] as const
      ).map(({ type, outcome }) => ({
        leadId: lead.id,
        type,
        status: statusOf(outcome),
        detail: outcome.detail,
      })),
    );
  } catch (err) {
    console.error("[leads] post-process update failed:", err);
  }
}

/**
 * Persist a lead (source of truth) and kick off the integrations in the
 * background. Returns as soon as the row is written.
 */
export async function createLead(input: CreateLeadInput): Promise<CreateLeadResult> {
  const db = getDb();
  if (!db) {
    return {
      ok: false,
      code: "no_database",
      message: "Persistência indisponível (DATABASE_URL ausente).",
    };
  }

  let lead: Lead;
  try {
    const [row] = await db.insert(leads).values(input).returning();
    lead = row!;
    await db.insert(leadEvents).values({
      leadId: lead.id,
      type: "created",
      status: "ok",
      detail: { source: lead.source, page: lead.page },
    });
  } catch (err) {
    console.error("[leads] insert failed:", err);
    return { ok: false, code: "db_error", message: "Falha ao registrar o contato." };
  }

  // Fire-and-forget — do not block the HTTP response on SMTP / n8n / Sheets.
  void processIntegrations(lead).catch((err) =>
    console.error("[leads] processIntegrations threw:", err),
  );

  return { ok: true, leadId: lead.id, status: "processing" };
}
