import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { getDb } from "@/db";
import { leads } from "@/db/schema";
import { getAdminSession } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Não autorizado." }, { status: 401 });
  }

  const db = getDb();
  if (!db) {
    return NextResponse.json({ ok: false, error: "Indisponível." }, { status: 503 });
  }

  const url = new URL(req.url);
  const limit = Math.min(200, Math.max(1, Number(url.searchParams.get("limit")) || 50));

  const rows = await db
    .select({
      id: leads.id,
      name: leads.name,
      email: leads.email,
      phone: leads.phone,
      company: leads.company,
      interest: leads.interest,
      status: leads.status,
      n8nStatus: leads.n8nStatus,
      emailStatus: leads.emailStatus,
      sheetsStatus: leads.sheetsStatus,
      page: leads.page,
      utmSource: leads.utmSource,
      createdAt: leads.createdAt,
    })
    .from(leads)
    .orderBy(desc(leads.createdAt))
    .limit(limit);

  return NextResponse.json({ ok: true, count: rows.length, leads: rows });
}
