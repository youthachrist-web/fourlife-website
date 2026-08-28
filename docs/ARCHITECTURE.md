# Arquitetura

## Visão geral

```
Visitante
   │  (formulário validado no cliente — Zod)
   ▼
POST /api/leads  ── rate limit por IP · honeypot · time-trap · revalidação Zod
   │
   ▼
createLead()  ─────────────────────────────────────────────┐
   │ 1. INSERT em `leads`  (fonte da verdade)               │
   │ 2. INSERT `lead_events` type=created                   │
   │ 3. fan-out em paralelo (Promise.all, não bloqueia):    │
   │      • n8n webhook                                     │
   │      • Google Sheets append                            │
   │      • e-mail de notificação (SMTP)                    │
   │ 4. UPDATE status + *_status + processedAt              │
   │ 5. INSERT um `lead_events` por integração              │
   ▼
PostgreSQL (Railway)          n8n → Google / CRM / e-mail / Slack ...
```

A regra central: **o lead nunca se perde**. Toda integração externa é um efeito
colateral pós-persistência. Se cair, o registro fica em `status = partial` ou
`failed` e pode ser reprocessado a partir da tabela.

## Camadas

| Pasta | Responsabilidade |
|---|---|
| `app/` | Rotas (RSC), route handlers, SEO (`sitemap.ts`, `robots.ts`) |
| `components/` | UI. `ui/` primitivos, `site/` shell, `sections/` blocos, `lead/` formulário |
| `lib/content.ts` | **Fonte única de texto.** Nenhuma cópia hardcoded nas páginas |
| `lib/validation.ts` | Schemas Zod compartilhados client/server + helpers de sanitização |
| `lib/env.ts` | Leitura validada de `process.env` (lazy) + `features.*` (feature flags) |
| `lib/rate-limit.ts` | Janela fixa em memória (trocar por Redis se houver múltiplas instâncias) |
| `lib/leads/service.ts` | Orquestração transacional-lógica da criação de lead |
| `lib/integrations/` | Um arquivo por destino; todos retornam `IntegrationOutcome`, nunca lançam |
| `db/` | Schema Drizzle, pool singleton lazy, runners de migração |

## Banco de dados

### `leads`
Dados do contato + atribuição (`source`, `page`, `referrer`, `utm_*`) +
consentimento (`consent`, `consent_at`, `consent_text`) + metadados de requisição
(`ip`, `user_agent`) + estado de processamento (`status`, `n8n_status`,
`sheets_status`, `email_status`, `processed_at`) + timestamps.

`status`: `new → processing → delivered | partial | failed`
`*_status` (por canal): `skipped | pending | ok | error`

### `lead_events`
Trilha de auditoria append-only. Um registro por marco (`created`, `n8n`,
`google_sheets`, `email_notify`), com `status` e `detail` (JSONB) para
diagnóstico e reprocessamento.

### Migrações
SQL versionado em `drizzle/`, gerado por `drizzle-kit generate` a partir de
`db/schema.ts`. Aplicado por `db/migrate.ts` (local) ou `db/migrate.mjs`
(container, sem toolchain TS). `gen_random_uuid()` exige PostgreSQL ≥ 13
(nativo no Railway).

## Decisões

- **Next.js (não SPA Vite).** O projeto de referência é uma SPA sem backend; leads
  exigem persistência server-side, SEO exige SSR/metadata. Reaproveitamos a
  linguagem de componentes (Radix/shadcn-like, motion) mas com framework adequado.
- **Drizzle + `pg`.** Migrações versionadas, tipos derivados do schema, sem ORM pesado.
- **Sem cliente Google pesado.** `google-auth-library` (JWT) + `fetch` na API REST
  do Sheets, em vez do pacote `googleapis` inteiro.
- **`output: "standalone"`.** Imagem Docker enxuta; no runner adiciona-se apenas
  `drizzle-orm` + `pg` completos para o passo de release rodar o migrator.
- **Animações via IntersectionObserver + CSS**, escondidas só sob
  `@media (scripting: enabled)` e com _fallback_ que revela o conteúdo caso o
  observer não dispare. Respeita `prefers-reduced-motion`.
