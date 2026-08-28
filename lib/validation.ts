import { z } from "zod";

/** Collapse whitespace and replace control characters with a space. */
export function clean(input: string): string {
  let out = "";
  for (const ch of input) {
    const code = ch.codePointAt(0)!;
    out += code < 0x20 || code === 0x7f ? " " : ch;
  }
  return out.replace(/\s+/g, " ").trim();
}

/** Small HTML stripper for free-text fields stored / forwarded as plain text. */
export function stripTags(input: string): string {
  return input.replace(/<[^>]*>/g, "");
}

const name = z
  .string()
  .trim()
  .min(2, "Informe seu nome completo.")
  .max(120, "Nome muito longo.")
  .transform(clean);

const email = z
  .string()
  .trim()
  .toLowerCase()
  .min(5, "Informe um e-mail válido.")
  .max(180)
  .email("E-mail inválido.");

// Brazilian phone: accept common masks, keep 10–13 digits.
const phone = z
  .string()
  .trim()
  .min(8, "Informe um telefone válido.")
  .max(24)
  .refine((v) => {
    const digits = v.replace(/\D/g, "");
    return digits.length >= 10 && digits.length <= 13;
  }, "Telefone inválido. Use DDD + número.");

const company = z
  .string()
  .trim()
  .min(2, "Informe o nome da empresa.")
  .max(140)
  .transform(clean);

export const leadFormSchema = z.object({
  name,
  email,
  phone,
  company,
  employees: z
    .enum(["1-50", "51-200", "201-500", "501-1000", "1000+"])
    .optional()
    .or(z.literal("").transform(() => undefined)),
  interest: z
    .string()
    .trim()
    .max(120)
    .optional()
    .transform((v) => (v ? clean(v) : undefined)),
  message: z
    .string()
    .trim()
    .max(2000, "Mensagem muito longa.")
    .optional()
    .transform((v) => (v ? clean(stripTags(v)) : undefined)),
  consent: z.literal(true, {
    error: "É necessário aceitar a Política de Privacidade.",
  }),
  // Anti-spam: honeypot must stay empty; renderedAt powers the time-trap.
  website: z.string().max(0).optional().or(z.literal("")),
  renderedAt: z.coerce.number().int().nonnegative().optional(),
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;

export const metaSchema = z.object({
  pagePath: z.string().max(512).optional(),
  referrer: z.string().max(1024).optional(),
  utmSource: z.string().max(180).optional(),
  utmMedium: z.string().max(180).optional(),
  utmCampaign: z.string().max(180).optional(),
  utmTerm: z.string().max(180).optional(),
  utmContent: z.string().max(180).optional(),
});

export type LeadMeta = z.infer<typeof metaSchema>;

export const leadPayloadSchema = leadFormSchema.extend({
  meta: metaSchema.optional(),
});

export type LeadPayload = z.infer<typeof leadPayloadSchema>;

/** Read UTM + context params from a URLSearchParams-like object. */
export function readUtm(params: URLSearchParams): LeadMeta {
  const get = (k: string) => params.get(k)?.slice(0, 180) || undefined;
  return {
    utmSource: get("utm_source"),
    utmMedium: get("utm_medium"),
    utmCampaign: get("utm_campaign"),
    utmTerm: get("utm_term"),
    utmContent: get("utm_content"),
  };
}
