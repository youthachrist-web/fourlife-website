import { NextResponse } from "next/server";
import { z } from "zod";
import { getEnv } from "@/lib/env";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({
  message: z.string().max(2000),
  stack: z.string().max(6000).optional(),
  url: z.string().max(1000).optional(),
  digest: z.string().max(200).optional(),
});

export async function POST(req: Request) {
  const ip = clientIp(req.headers);
  const rl = rateLimit(`client-error:${ip}`, 20, 60_000);
  if (!rl.ok) return NextResponse.json({ ok: false }, { status: 429 });

  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ ok: false }, { status: 400 });

  const payload = {
    kind: "client",
    at: new Date().toISOString(),
    ua: req.headers.get("user-agent")?.slice(0, 300),
    ...parsed.data,
  };
  console.error("[client-error]", JSON.stringify(payload));

  const sink = getEnv().ERROR_WEBHOOK_URL;
  if (sink) {
    try {
      await fetch(sink, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(4000),
      });
    } catch {
      /* swallow */
    }
  }

  return NextResponse.json({ ok: true });
}
