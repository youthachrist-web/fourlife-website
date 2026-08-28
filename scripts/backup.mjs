// Logical backup of the database in DATABASE_URL.
// Usage: node scripts/backup.mjs [outDir]   (default ./backups)
// Requires `pg_dump` on PATH. Keeps the latest BACKUP_KEEP files (default 14).
import { spawn } from "node:child_process";
import { mkdir, readdir, stat, unlink } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { createGzip } from "node:zlib";
import path from "node:path";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set.");
  process.exit(1);
}

const outDir = process.argv[2] || "backups";
const keep = Number(process.env.BACKUP_KEEP || 14);
await mkdir(outDir, { recursive: true });

const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 16);
const file = path.join(outDir, `fourlife-${stamp}.sql.gz`);

await new Promise((resolve, reject) => {
  const dump = spawn("pg_dump", ["--no-owner", "--no-privileges", url], {
    stdio: ["ignore", "pipe", "inherit"],
  });
  const gzip = createGzip();
  const out = createWriteStream(file);
  dump.stdout.pipe(gzip).pipe(out);
  dump.on("error", reject);
  dump.on("close", (code) => (code === 0 ? resolve() : reject(new Error(`pg_dump exit ${code}`))));
});

const { size } = await stat(file);
console.log(`Backup written: ${file} (${(size / 1024).toFixed(0)} KB)`);

// Retention.
const entries = (await readdir(outDir))
  .filter((f) => f.startsWith("fourlife-") && f.endsWith(".sql.gz"))
  .sort()
  .reverse();
for (const stale of entries.slice(keep)) {
  await unlink(path.join(outDir, stale));
  console.log(`Removed old backup: ${stale}`);
}

// NOTE: for off-box storage, pipe `file` to your object store here
// (e.g. aws s3 cp / rclone) using BACKUP_* credentials.
