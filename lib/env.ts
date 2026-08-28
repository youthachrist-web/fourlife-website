/**
 * Server-side environment configuration.
 *
 * Only import this from server code (route handlers, server components, scripts).
 * Values are validated lazily so the app can still boot — and `/api/health` can
 * still report — when an optional integration is not configured.
 */
import { z } from "zod";

const schema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),

  // Public site origin, used for canonical URLs, sitemap and OG tags.
  SITE_URL: z.string().url().optional(),

  // PostgreSQL (Railway). Without it, lead submissions fail closed with a 503.
  DATABASE_URL: z.string().min(1).optional(),
  DATABASE_SSL: z
    .enum(["true", "false"])
    .optional()
    .transform((v) => v === "true"),

  // n8n automation webhook (post-persist side effect).
  N8N_WEBHOOK_URL: z.string().url().optional(),
  N8N_WEBHOOK_SECRET: z.string().min(1).optional(),

  // SMTP (Google Workspace / Gmail app password) for internal notification.
  SMTP_HOST: z.string().min(1).optional(),
  SMTP_PORT: z.coerce.number().int().positive().optional(),
  SMTP_SECURE: z
    .enum(["true", "false"])
    .optional()
    .transform((v) => v === "true"),
  SMTP_USER: z.string().min(1).optional(),
  SMTP_PASS: z.string().min(1).optional(),
  LEAD_NOTIFY_FROM: z.string().optional(),
  LEAD_NOTIFY_TO: z.string().optional(),

  // Google Sheets append (optional direct sink; service-account JSON, base64 or raw).
  GOOGLE_SERVICE_ACCOUNT_JSON: z.string().min(1).optional(),
  GOOGLE_SHEET_ID: z.string().min(1).optional(),
  GOOGLE_SHEET_RANGE: z.string().min(1).default("Leads!A:Z"),

  // Anti-abuse.
  RATE_LIMIT_MAX: z.coerce.number().int().positive().default(5),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(60_000),
  LEAD_MIN_FILL_MS: z.coerce.number().int().nonnegative().default(1_500),

  // Admin authentication (protects /admin and /api/admin/*).
  AUTH_SECRET: z.string().min(32).optional(),
  ADMIN_SESSION_HOURS: z.coerce.number().int().positive().default(8),
  ADMIN_LOCK_THRESHOLD: z.coerce.number().int().positive().default(5),
  ADMIN_LOCK_MINUTES: z.coerce.number().int().positive().default(15),

  // Error tracking sink (optional; server + client errors are forwarded here).
  ERROR_WEBHOOK_URL: z.string().url().optional(),

  // Google Search Console verification token (meta tag).
  GOOGLE_SITE_VERIFICATION: z.string().min(1).optional(),
});

export type ServerEnv = z.infer<typeof schema>;

let cached: ServerEnv | null = null;

export function getEnv(): ServerEnv {
  if (cached) return cached;
  const parsed = schema.safeParse(process.env);
  if (!parsed.success) {
    // Log a compact summary without leaking values.
    console.error(
      "[env] invalid configuration:",
      parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; "),
    );
    // Fall back to safe defaults so the process stays up; feature gates below
    // will simply report the integration as unconfigured.
    cached = schema.parse({});
    return cached;
  }
  cached = parsed.data;
  return cached;
}

export const features = {
  get database() {
    return Boolean(getEnv().DATABASE_URL);
  },
  get n8n() {
    return Boolean(getEnv().N8N_WEBHOOK_URL);
  },
  get email() {
    const e = getEnv();
    return Boolean(e.SMTP_HOST && e.SMTP_USER && e.SMTP_PASS && e.LEAD_NOTIFY_TO);
  },
  get googleSheets() {
    const e = getEnv();
    return Boolean(e.GOOGLE_SERVICE_ACCOUNT_JSON && e.GOOGLE_SHEET_ID);
  },
  get admin() {
    return Boolean(getEnv().AUTH_SECRET) && Boolean(getEnv().DATABASE_URL);
  },
  get errorSink() {
    return Boolean(getEnv().ERROR_WEBHOOK_URL);
  },
};
