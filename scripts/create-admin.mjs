// Creates or resets an admin user for the /admin panel.
// Usage: node scripts/create-admin.mjs <email> <password> ["Full Name"]
// Requires DATABASE_URL. Password is stored as a bcrypt hash (cost 12).
import bcrypt from "bcryptjs";
import pg from "pg";

const [email, password, name] = process.argv.slice(2);

if (!email || !password) {
  console.error('Usage: node scripts/create-admin.mjs <email> <password> ["Full Name"]');
  process.exit(1);
}
if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set.");
  process.exit(1);
}
if (password.length < 10) {
  console.error("Choose a password with at least 10 characters.");
  process.exit(1);
}

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : undefined,
});

const hash = await bcrypt.hash(password, 12);

await pool.query(
  `insert into admin_users (email, name, password_hash)
   values ($1, $2, $3)
   on conflict (email) do update
     set password_hash = excluded.password_hash,
         name = coalesce(excluded.name, admin_users.name),
         failed_attempts = 0,
         locked_until = null,
         disabled = false,
         updated_at = now()`,
  [email.toLowerCase(), name ?? null, hash],
);

console.log(`Admin ready: ${email.toLowerCase()}`);
await pool.end();
