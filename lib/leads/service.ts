import { getDb } from "@/db";
import { leadEvents, leads, type Lead, type NewLead } from "@/db/schema";
import { forwardToN8n, type IntegrationOutcome } from "@/lib/integrations/n8n";
import { appendToSheet } from "@/lib/integrations/google-sheets";
import { notifyNewLead } from "@/lib/integrations/email";
import { eq } from "drizzle-orm";

export type CreateLeadInput = Omit<
  NewLead,
  "id" | "createdAt" | "updatedAt" | "status" | "n8nStatus" | "sheetsStatus" | "emailStatus" | "processedAt"
>;

export type CreateLeadResult =
  | { ok: true; leadId: string; status: Lead["status"] }
  | { ok: false; code: "no_database" | "db_error"; message: string };

function statusOf(o: IntegrationOutcome) {
  if (o.skipped) return "skipped" as const;
  return o.ok ? ("ok" as const) : ("error" as const);
}

/**
 * Persist a lead (source of truth) and then fan out to integrations.
 * Integration failures never lose the lead — they are recorded as events and
 * reflected in per-channel status columns for later reprocessing.
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

  // Fan out. Each settles independently; the lead is already safe.
  const [n8n, sheet, email] = await Promise.all([
    forwardToN8n(lead).catch(
      (e): IntegrationOutcome => ({ ok: false, detail: { error: String(e) } }),
    ),
    appendToSheet(lead).catch(
      (e): IntegrationOutcome => ({ ok: false, detail: { error: String(e) } }),
    ),
    notifyNewLead(lead).catch(
      (e): IntegrationOutcome => ({ ok: false, detail: { error: String(e) } }),
    ),
  ]);

  const n8nStatus = statusOf(n8n);
  const sheetsStatus = statusOf(sheet);
  const emailStatus = statusOf(email);

  const active = [n8n, sheet, email].filter((o) => !o.skipped);
  const anyError = active.some((o) => !o.ok);
  const allOk = active.length > 0 && active.every((o) => o.ok);
  const overall: Lead["status"] = allOk
    ? "delivered"
    : anyError && active.some((o) => o.ok)
      ? "partial"
      : anyError
        ? "failed"
        : "processing";

  try {
    await db
      .update(leads)
      .set({
        status: overall,
        n8nStatus,
        sheetsStatus,
        emailStatus,
        processedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(leads.id, lead.id));

    await db.insert(leadEvents).values(
      [
        { type: "n8n", outcome: n8n },
        { type: "google_sheets", outcome: sheet },
        { type: "email_notify", outcome: email },
      ].map(({ type, outcome }) => ({
        leadId: lead.id,
        type,
        status: statusOf(outcome),
        detail: outcome.detail,
      })),
    );
  } catch (err) {
    console.error("[leads] post-process update failed:", err);
  }

  return { ok: true, leadId: lead.id, status: overall };
}
