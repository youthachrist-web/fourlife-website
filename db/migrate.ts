/**
 * Applies pending SQL migrations from ./drizzle to the database in DATABASE_URL.
 * Run with: npm run db:migrate  (also invoked automatically on deploy).
 */
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("[migrate] DATABASE_URL is not set — nothing to do.");
    process.exit(process.env.MIGRATE_REQUIRED === "true" ? 1 : 0);
  }

  const pool = new Pool({
    connectionString: url,
    ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : undefined,
  });
  const db = drizzle(pool);

  console.log("[migrate] applying migrations…");
  await migrate(db, { migrationsFolder: "./drizzle" });
  console.log("[migrate] done.");
  await pool.end();
}

main().catch((err) => {
  console.error("[migrate] failed:", err);
  process.exit(1);
});
