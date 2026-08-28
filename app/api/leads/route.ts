import { NextResponse } from "next/server";
import { z } from "zod";
import { getEnv } from "@/lib/env";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { leadPayloadSchema } from "@/lib/validation";
import { createLead } from "@/lib/leads/service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CONSENT_TEXT =
  "Autorizo o contato da FourLife e o tratamento dos meus dados conforme a Política de Privacidade.";

export async function POST(req: Request) {
  const env = getEnv();
  const ip = clientIp(req.headers);

  const rl = rateLimit(`lead:${ip}`, env.RATE_LIMIT_MAX, env.RATE_LIMIT_WINDOW_MS);
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: "Muitas tentativas. Tente novamente em instantes." },
      { status: 429, headers: { "retry-after": String(rl.retryAfterSeconds) } },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Requisição inválida." }, { status: 400 });
  }

  const parsed = leadPayloadSchema.safeParse(body);

  // Silent bot handling: honeypot filled or form submitted implausibly fast.
  const raw = (body ?? {}) as Record<string, unknown>;
  const honeypot = typeof raw.website === "string" && raw.website.length > 0;
  const renderedAt = Number(raw.renderedAt);
  const tooFast =
    Number.isFinite(renderedAt) &&
    renderedAt > 0 &&
    Date.now() - renderedAt < env.LEAD_MIN_FILL_MS;

  if (honeypot || tooFast) {
    return NextResponse.json({ ok: true, status: "received" }, { status: 200 });
  }

  if (!parsed.success) {
    const fieldErrors = z.flattenError(parsed.error).fieldErrors;
    return NextResponse.json(
      { ok: false, error: "Verifique os campos destacados.", fieldErrors },
      { status: 400 },
    );
  }

  const { meta, ...form } = parsed.data;
  const userAgent = req.headers.get("user-agent")?.slice(0, 512) ?? null;

  const result = await createLead({
    name: form.name,
    email: form.email,
    phone: form.phone,
    company: form.company,
    employees: form.employees ?? null,
    interest: form.interest ?? null,
    message: form.message ?? null,
    source: meta?.utmSource ? "campaign" : "website",
    page: meta?.pagePath ?? null,
    referrer: meta?.referrer ?? null,
    utmSource: meta?.utmSource ?? null,
    utmMedium: meta?.utmMedium ?? null,
    utmCampaign: meta?.utmCampaign ?? null,
    utmTerm: meta?.utmTerm ?? null,
    utmContent: meta?.utmContent ?? null,
    consent: true,
    consentAt: new Date(),
    consentText: CONSENT_TEXT,
    ip,
    userAgent,
  });

  if (!result.ok) {
    const status = result.code === "no_database" ? 503 : 500;
    return NextResponse.json(
      {
        ok: false,
        error:
          "Não foi possível concluir agora. Tente novamente em instantes ou escreva para comercial@fourlife.com.br.",
      },
      { status },
    );
  }

  return NextResponse.json(
    { ok: true, leadId: result.leadId, status: result.status },
    { status: 201 },
  );
}
