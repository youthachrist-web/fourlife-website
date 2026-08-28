import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { getEnv } from "@/lib/env";
import * as schema from "./schema";

/**
 * Lazily-created singleton pool. Returns `null` when DATABASE_URL is unset so
 * callers can degrade gracefully instead of crashing the process.
 */

type DrizzleDb = ReturnType<typeof drizzle<typeof schema>>;

declare global {
  var __fourlifePool: Pool | undefined;
  var __fourlifeDb: DrizzleDb | undefined;
}

export function getDb(): DrizzleDb | null {
  const env = getEnv();
  if (!env.DATABASE_URL) return null;

  if (!global.__fourlifeDb) {
    const pool =
      global.__fourlifePool ??
      new Pool({
        connectionString: env.DATABASE_URL,
        max: 5,
        idleTimeoutMillis: 30_000,
        connectionTimeoutMillis: 10_000,
        ssl: env.DATABASE_SSL ? { rejectUnauthorized: false } : undefined,
      });
    pool.on("error", (err) => console.error("[db] idle client error:", err.message));

    global.__fourlifePool = pool;
    global.__fourlifeDb = drizzle(pool, { schema });
  }
  return global.__fourlifeDb;
}

export { schema };
