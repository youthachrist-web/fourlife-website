import { NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { getDb } from "@/db";
import { features, getEnv } from "@/lib/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const startedAt = Date.now();
  const env = getEnv();

  let database: "ok" | "error" | "unconfigured" = "unconfigured";
  if (features.database) {
    const db = getDb();
    try {
      await Promise.race([
        db!.execute(sql`select 1`),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("timeout")), 4_000),
        ),
      ]);
      database = "ok";
    } catch {
      database = "error";
    }
  }

  const healthy = database === "ok" || database === "unconfigured";

  return NextResponse.json(
    {
      status: healthy ? "ok" : "degraded",
      service: "fourlife-website",
      env: env.NODE_ENV,
      time: new Date().toISOString(),
      latencyMs: Date.now() - startedAt,
      checks: {
        database,
        integrations: {
          n8n: features.n8n ? "configured" : "unconfigured",
          email: features.email ? "configured" : "unconfigured",
          googleSheets: features.googleSheets ? "configured" : "unconfigured",
        },
      },
    },
    { status: healthy ? 200 : 503 },
  );
}
