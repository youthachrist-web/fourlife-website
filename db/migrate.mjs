// Plain-ESM migration runner used inside the production container.
// Mirrors db/migrate.ts but avoids the TypeScript toolchain at runtime.
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import pg from "pg";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("[migrate] DATABASE_URL not set — skipping.");
  process.exit(process.env.MIGRATE_REQUIRED === "true" ? 1 : 0);
}

const pool = new pg.Pool({
  connectionString: url,
  ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : undefined,
});

// Row Level Security: enabled with permissive policies for the app role so the
// structure is in place. Create a separate least-privilege role for BI/analytics
// and add restrictive policies there — see docs/OPERATIONS.md.
const HARDENING = `
DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['leads','lead_events','admin_users'] LOOP
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = t) THEN
      EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', t);
      EXECUTE format('DROP POLICY IF EXISTS %I ON %I', t || '_app_rw', t);
      EXECUTE format('CREATE POLICY %I ON %I FOR ALL USING (true) WITH CHECK (true)', t || '_app_rw', t);
    END IF;
  END LOOP;
END $$;
`;

try {
  console.log("[migrate] applying migrations…");
  await migrate(drizzle(pool), { migrationsFolder: "./drizzle" });
  console.log("[migrate] applying RLS hardening…");
  await pool.query(HARDENING);
  console.log("[migrate] done.");
  await pool.end();
} catch (err) {
  console.error("[migrate] failed:", err);
  await pool.end().catch(() => {});
  process.exit(1);
}
