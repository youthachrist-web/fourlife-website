import { JWT } from "google-auth-library";
import { getEnv } from "@/lib/env";
import type { Lead } from "@/db/schema";
import type { IntegrationOutcome } from "./n8n";

let jwtClient: JWT | null = null;

function parseServiceAccount(raw: string): { client_email: string; private_key: string } {
  const text = raw.trim().startsWith("{")
    ? raw
    : Buffer.from(raw, "base64").toString("utf8");
  const json = JSON.parse(text);
  return {
    client_email: json.client_email,
    // Env vars often store the key with escaped newlines.
    private_key: String(json.private_key).split("\\n").join("\n"),
  };
}

function getClient(): JWT {
  if (jwtClient) return jwtClient;
  const env = getEnv();
  const { client_email, private_key } = parseServiceAccount(
    env.GOOGLE_SERVICE_ACCOUNT_JSON!,
  );
  jwtClient = new JWT({
    email: client_email,
    key: private_key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return jwtClient;
}

/**
 * Append a lead as a row to a Google Sheet. Optional direct sink — most
 * deployments will let n8n handle Google. Never throws.
 */
export async function appendToSheet(lead: Lead): Promise<IntegrationOutcome> {
  const env = getEnv();
  if (!env.GOOGLE_SERVICE_ACCOUNT_JSON || !env.GOOGLE_SHEET_ID) {
    return { ok: false, skipped: true, detail: { reason: "Google Sheets unset" } };
  }

  try {
    const client = getClient();
    const { token } = await client.getAccessToken();
    if (!token) return { ok: false, detail: { error: "no access token" } };

    const range = encodeURIComponent(env.GOOGLE_SHEET_RANGE);
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${env.GOOGLE_SHEET_ID}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

    const row = [
      lead.createdAt instanceof Date ? lead.createdAt.toISOString() : String(lead.createdAt),
      lead.id,
      lead.name,
      lead.email,
      lead.phone,
      lead.company,
      lead.employees ?? "",
      lead.interest ?? "",
      lead.message ?? "",
      lead.source,
      lead.page ?? "",
      lead.utmSource ?? "",
      lead.utmMedium ?? "",
      lead.utmCampaign ?? "",
      lead.utmTerm ?? "",
      lead.utmContent ?? "",
      lead.consent ? "sim" : "não",
    ];

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8_000);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ values: [row] }),
        signal: controller.signal,
      });
      const body = await res.text().catch(() => "");
      return { ok: res.ok, detail: { httpStatus: res.status, body: body.slice(0, 500) } };
    } finally {
      clearTimeout(timeout);
    }
  } catch (err) {
    return {
      ok: false,
      detail: { error: err instanceof Error ? err.message : String(err) },
    };
  }
}
