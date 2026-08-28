# FourLife — Website

Site institucional e de captação de leads do **FourLife — Ecossistema Integrado de
Produtividade e Saúde**.

Conteúdo baseado em `EcossistemaFourLife.pptx` (jan/2026), com material de apoio do
site legado `fourlife.com.br`. A estrutura/UX toma como referência técnica o projeto
Orion Digital, sem cópia de identidade visual, textos ou imagens.

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 16 (App Router) + React 19 |
| Linguagem | TypeScript (strict) |
| Estilo | Tailwind CSS v4 + design tokens em `app/globals.css` |
| Banco | PostgreSQL (Railway) via Drizzle ORM |
| Automação | n8n (webhook, pós-persistência) |
| E-mail | SMTP (Google Workspace / Gmail app password) via Nodemailer |
| Planilha | Google Sheets API (opcional, service account) |
| Deploy | Railway (Dockerfile) |

## Rodando localmente

```bash
npm install
cp .env.example .env.local   # preencha ao menos DATABASE_URL para testar leads
npm run db:migrate           # cria as tabelas
npm run dev                  # http://localhost:3000
```

Sem `DATABASE_URL`, o site sobe normalmente; o endpoint de leads responde `503`
com mensagem amigável e `/api/health` reporta `database: unconfigured`.

## Scripts

| Comando | Ação |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção (saída `standalone`) |
| `npm run start` | Serve o build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm run db:generate` | Gera SQL de migração a partir de `db/schema.ts` |
| `npm run db:migrate` | Aplica migrações pendentes |
| `npm run db:studio` | Drizzle Studio |

## Estrutura

```
app/
  page.tsx              Home (narrativa do ecossistema)
  solucoes/             As 7 soluções
  metodo/               Método Orion + Kit de 6 métricas
  diagnostico/          Diagnóstico 360º + formulário
  sobre/  contato/      Institucional + captação
  privacidade/ termos/  Legal
  api/leads/route.ts    POST — validação, anti-spam, persistência, fan-out
  api/health/route.ts   GET  — health check para o Railway
  sitemap.ts robots.ts  SEO
components/
  ui/        Primitivos (Button, Container, Section, Reveal)
  site/      Header, Footer, Logo
  sections/  Blocos da página (Hero, Ecosystem, Method, ...)
  lead/      LeadForm (client)
db/
  schema.ts  Tabelas `leads` e `lead_events`
  index.ts   Pool + client Drizzle (singleton, lazy)
  migrate.ts / migrate.mjs   Runner de migração (TS local / ESM no container)
lib/
  content.ts       Todo o texto do site (fonte única)
  validation.ts    Schemas Zod (compartilhados client/server)
  env.ts           Configuração validada + feature flags
  rate-limit.ts    Rate limit em memória
  leads/service.ts Orquestração de criação de lead
  integrations/    n8n · google-sheets · email
drizzle/           Migrações SQL versionadas
```

## Variáveis de ambiente

Ver [`.env.example`](.env.example). Resumo:

| Variável | Obrigatória | Uso |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` / `SITE_URL` | recomendada | URLs canônicas, sitemap, OG |
| `DATABASE_URL` | para gravar leads | PostgreSQL (Railway injeta) |
| `DATABASE_SSL` | não | `true` se o provedor exigir SSL sem CA confiável |
| `MIGRATE_REQUIRED` | não | `true` faz o release falhar se a migração não rodar |
| `N8N_WEBHOOK_URL` / `N8N_WEBHOOK_SECRET` | não | Automação pós-lead |
| `SMTP_HOST/PORT/SECURE/USER/PASS` | não | Notificação por e-mail |
| `LEAD_NOTIFY_FROM` / `LEAD_NOTIFY_TO` | não | Remetente / destino da notificação |
| `GOOGLE_SERVICE_ACCOUNT_JSON` / `GOOGLE_SHEET_ID` | não | Append direto em planilha |
| `RATE_LIMIT_MAX` / `RATE_LIMIT_WINDOW_MS` / `LEAD_MIN_FILL_MS` | não | Anti-abuso |

**Nunca** faça commit de `.env`. Segredos apenas via variáveis de ambiente do Railway.

## Fluxo de um lead

1. `LeadForm` valida no cliente (Zod), captura UTM/página/referrer e envia para `POST /api/leads`.
2. A rota aplica rate limit por IP, honeypot + time-trap, e revalida no servidor.
3. `createLead()` **grava no PostgreSQL** (fonte da verdade) e registra o evento `created`.
4. Em paralelo e sem bloquear o lead: webhook n8n, append no Google Sheets, e-mail de notificação.
5. Cada integração vira um `lead_event` e atualiza `n8n_status` / `sheets_status` / `email_status`.
6. Se uma integração falhar, o lead **permanece** com `status = partial | failed` para reprocessamento.

Documentação detalhada:
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
- [`docs/DEPLOY.md`](docs/DEPLOY.md) — Railway + GitHub
- [`docs/N8N.md`](docs/N8N.md) — contrato do webhook e Google

## Segurança

- Validação e sanitização server-side (Zod), consentimento LGPD registrado com texto e timestamp.
- Rate limiting por IP, honeypot e time-trap contra bots.
- Headers de segurança em `next.config.ts` (HSTS, X-Content-Type-Options, frame, Permissions-Policy).
- Segredos só em env vars; erros retornam mensagens genéricas; logs não imprimem segredos.
- `X-Powered-By` desabilitado; `/api/*` e `/obrigado` fora do `robots.txt`.

## Notas / pendências de conteúdo

Marcadas como `NEEDS-CONFIRMATION` em `lib/content.ts`:
- Telefone de exibição (deck traz `+55 48 99999-4545`, aparente placeholder; usado `+55 48 9217-2195` do site legado).
- Razão social e CNPJ na Política de Privacidade.
- Handles de redes sociais (não fornecidos).
- Depoimentos vêm do site legado `fourlife.com.br`.
