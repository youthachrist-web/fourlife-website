CREATE TYPE "public"."integration_status" AS ENUM('skipped', 'pending', 'ok', 'error');--> statement-breakpoint
CREATE TYPE "public"."lead_status" AS ENUM('new', 'processing', 'delivered', 'partial', 'failed');--> statement-breakpoint
CREATE TABLE "lead_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"lead_id" uuid NOT NULL,
	"type" varchar(60) NOT NULL,
	"status" "integration_status" NOT NULL,
	"detail" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "leads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(160) NOT NULL,
	"email" varchar(200) NOT NULL,
	"phone" varchar(40) NOT NULL,
	"company" varchar(200) NOT NULL,
	"employees" varchar(20),
	"interest" varchar(160),
	"message" text,
	"source" varchar(80) DEFAULT 'website' NOT NULL,
	"page" varchar(512),
	"referrer" varchar(1024),
	"utm_source" varchar(200),
	"utm_medium" varchar(200),
	"utm_campaign" varchar(200),
	"utm_term" varchar(200),
	"utm_content" varchar(200),
	"consent" boolean DEFAULT false NOT NULL,
	"consent_at" timestamp with time zone,
	"consent_text" text,
	"ip" varchar(64),
	"user_agent" varchar(512),
	"status" "lead_status" DEFAULT 'new' NOT NULL,
	"n8n_status" "integration_status" DEFAULT 'pending' NOT NULL,
	"sheets_status" "integration_status" DEFAULT 'pending' NOT NULL,
	"email_status" "integration_status" DEFAULT 'pending' NOT NULL,
	"processed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "lead_events" ADD CONSTRAINT "lead_events_lead_id_leads_id_fk" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "lead_events_lead_id_idx" ON "lead_events" USING btree ("lead_id");--> statement-breakpoint
CREATE INDEX "leads_created_at_idx" ON "leads" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "leads_email_idx" ON "leads" USING btree ("email");--> statement-breakpoint
CREATE INDEX "leads_status_idx" ON "leads" USING btree ("status");