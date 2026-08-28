import { sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const leadStatus = pgEnum("lead_status", [
  "new",
  "processing",
  "delivered",
  "partial",
  "failed",
]);

export const integrationStatus = pgEnum("integration_status", [
  "skipped",
  "pending",
  "ok",
  "error",
]);

export const leads = pgTable(
  "leads",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),

    name: varchar("name", { length: 160 }).notNull(),
    email: varchar("email", { length: 200 }).notNull(),
    phone: varchar("phone", { length: 40 }).notNull(),
    company: varchar("company", { length: 200 }).notNull(),
    employees: varchar("employees", { length: 20 }),
    interest: varchar("interest", { length: 160 }),
    message: text("message"),

    // Attribution / context.
    source: varchar("source", { length: 80 }).notNull().default("website"),
    page: varchar("page", { length: 512 }),
    referrer: varchar("referrer", { length: 1024 }),
    utmSource: varchar("utm_source", { length: 200 }),
    utmMedium: varchar("utm_medium", { length: 200 }),
    utmCampaign: varchar("utm_campaign", { length: 200 }),
    utmTerm: varchar("utm_term", { length: 200 }),
    utmContent: varchar("utm_content", { length: 200 }),

    // Consent (LGPD).
    consent: boolean("consent").notNull().default(false),
    consentAt: timestamp("consent_at", { withTimezone: true }),
    consentText: text("consent_text"),

    // Request metadata.
    ip: varchar("ip", { length: 64 }),
    userAgent: varchar("user_agent", { length: 512 }),

    // Processing state.
    status: leadStatus("status").notNull().default("new"),
    n8nStatus: integrationStatus("n8n_status").notNull().default("pending"),
    sheetsStatus: integrationStatus("sheets_status").notNull().default("pending"),
    emailStatus: integrationStatus("email_status").notNull().default("pending"),
    processedAt: timestamp("processed_at", { withTimezone: true }),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    index("leads_created_at_idx").on(t.createdAt),
    index("leads_email_idx").on(t.email),
    index("leads_status_idx").on(t.status),
  ],
);

export const leadEvents = pgTable(
  "lead_events",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    leadId: uuid("lead_id")
      .notNull()
      .references(() => leads.id, { onDelete: "cascade" }),
    type: varchar("type", { length: 60 }).notNull(),
    status: integrationStatus("status").notNull(),
    detail: jsonb("detail"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [index("lead_events_lead_id_idx").on(t.leadId)],
);

export const adminUsers = pgTable("admin_users", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  email: varchar("email", { length: 200 }).notNull().unique(),
  name: varchar("name", { length: 160 }),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  failedAttempts: integer("failed_attempts").notNull().default(0),
  lockedUntil: timestamp("locked_until", { withTimezone: true }),
  lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
  disabled: boolean("disabled").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
export type LeadEvent = typeof leadEvents.$inferSelect;
export type AdminUser = typeof adminUsers.$inferSelect;
