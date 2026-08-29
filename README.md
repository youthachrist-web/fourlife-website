# FourLife — Website

Site institucional e de **captação de leads** da **FourLife — Ecossistema Integrado de
Produtividade e Saúde**.

- **Produção:** https://fourlife-web-production.up.railway.app
- **Stack:** Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind CSS v4 ·
  PostgreSQL + Drizzle · Docker/Railway
- Conteúdo extraído de `EcossistemaFourLife.pptx` (jan/2026) + site legado
  `fourlife.com.br`. Estrutura/UX inspirada em Orion Digital, **sem** cópia de
  identidade visual, textos ou imagens.

---

## 1. Rodar localmente

```bash
npm install
cp .env.example .env.local     # preencha DATABASE_URL para testar leads
npm run db:migrate             # cria tabelas + RLS
npm run dev                    # http://localhost:3000
```

Sem `DATABASE_URL` o site sobe normalmente: o formulário responde `503` com mensagem
amigável e `/api/health` reporta `database: "unconfigured"`.

### Scripts

| Comando | Ação |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção (`output: standalone`) |
| `npm run start` | Serve o build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm run db:generate` | Gera SQL de migração a partir de `db/schema.ts` |
| `npm run db:migrate` | Aplica migrações pendentes |
| `npm run db:studio` | Drizzle Studio |
| `npm run db:backup` | `pg_dump` para `./backups` (`scripts/backup.mjs`) |
| `npm run create-admin -- <email> <senha>` | Cria/reseta um usuário do `/admin` |

---

## 2. Estrutura

```
app/
  page.tsx                Home — narrativa do ecossistema (Hero → Realidade → Custo →
                          Ecossistema → 7 Soluções → Método → Diagnóstico → Métricas →
                          Depoimentos → FAQ → CTA)
  solucoes/               As 7 soluções em detalhe
  metodo/                 Método Orion + Kit de 6 métricas
  diagnostico/            Diagnóstico 360º + formulário
  sobre/  contato/        Institucional + captação
  privacidade/  termos/  obrigado/   Legal + agradecimento
  admin/                  Painel de leads (protegido — bcrypt + sessão JWT)
  template.tsx            Transição de entrada a cada troca de página
  layout.tsx  globals.css SEO global, fontes, design tokens, tema claro/escuro
  robots.ts  sitemap.ts   SEO
  api/
    leads/route.ts        POST — rate limit, honeypot, time-trap, validação, persistência
    health/route.ts       GET  — health check (DB + integrações) usado pelo Railway
    client-error/route.ts POST — captura de erros do cliente
    admin/{login,logout,leads}/route.ts   Auth + listagem para o painel

components/
  ui/         button · container · section · reveal (scroll-in) · count-up (números
              animam ao rolar / a cada página) · drag-scroll (carrossel arrastável no
              mouse + setas + toque) · safe-image (nunca quebra o layout) · logo-badge
  site/       site-header · site-footer · logo (com fallback textual) · consent-gate
              (aceite de Termos na 1ª visita) · scroll-progress (barra de leitura)
  sections/   hero · reality (fotos + clippings de imprensa) · cost · ecosystem
              (abas com logotipos) · method · diagnostico · metrics-kit · testimonials
              · faq (5 dores) · cta-band · solution-card
  lead/       lead-form (formulário completo) · lead-modal (popup do CTA) ·
              lead-cta (botão que abre o modal) · lead-popup (checklist, canto da tela)

lib/
  content.ts        Fonte única de todo o texto do site
  validation.ts     Schemas Zod (form completo + `quickLead` do popup) — client/server
  env.ts            Leitura validada de `process.env` + flags `features.*`
  auth.ts           Hash bcrypt, sessão JWT (`jose`), bloqueio por tentativas
  rate-limit.ts     Janela fixa em memória por IP
  cn.ts  seo.tsx    Utilitário de classes · JSON-LD (Organization, WebSite, FAQ, Service)
  leads/service.ts  Persiste o lead e dispara integrações **em segundo plano**
  integrations/     n8n · google-sheets · email (Nodemailer)

db/
  schema.ts         Tabelas `leads`, `lead_events`, `admin_users`
  index.ts          Pool `pg` + client Drizzle (singleton, lazy)
  migrate.ts / .mjs Runner de migração (TS local / ESM no container) + RLS hardening

drizzle/            Migrações SQL versionadas
scripts/            create-admin.mjs · backup.mjs
docs/               ARCHITECTURE.md · DEPLOY.md · N8N.md
public/
  brand/            Logotipos FourLife
  partners/         Logotipos das soluções (AVall.iÔ, LabDuo, ZapVida, Uninovia, Orion)
  images/           Fotos do storytelling (reality-*.jpg)
  llms.txt · .well-known/security.txt
```

---

## 3. Fluxo de um lead

```
Visitante → LeadForm / LeadPopup  (validação Zod no cliente, captura de UTM/página)
   │  POST /api/leads
   ▼
rate limit por IP · honeypot · time-trap · revalidação Zod
   ▼
createLead():
   1. INSERT em `leads`  ← fonte da verdade
   2. INSERT `lead_events` (created)
   3. responde 201 IMEDIATAMENTE  (status: "processing")
   4. em segundo plano, com timeout por canal:
        • webhook n8n            (9s)
        • append Google Sheets   (9s)
        • e-mail de notificação  (18s)  → SMTP
   5. atualiza `status` + `*_status` e grava um `lead_event` por canal
```

O formulário **nunca trava** esperando SMTP/n8n. Se um canal falhar, o lead fica
`status = partial | failed` no banco para reprocessamento — nunca se perde.

`status`: `new → processing → delivered | partial | failed`
`n8n_status` / `sheets_status` / `email_status`: `skipped | pending | ok | error`

---

## 4. Variáveis de ambiente

Ver [`.env.example`](.env.example). **Nunca** commitar `.env` — segredos só nas
variáveis do Railway.

| Variável | Obrigatória | Uso |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` / `SITE_URL` | recomendada | URLs canônicas, sitemap, OG |
| `DATABASE_URL` | p/ gravar leads | PostgreSQL (Railway injeta via `${{Postgres.DATABASE_URL}}`) |
| `DATABASE_SSL` | não | `true` se o provedor exigir SSL sem CA confiável |
| `MIGRATE_REQUIRED` | não | `true` = release falha se a migração não rodar |
| `AUTH_SECRET` | p/ `/admin` | ≥ 32 chars — assina a sessão do painel (`openssl rand -base64 48`) |
| `ADMIN_SESSION_HOURS` / `ADMIN_LOCK_THRESHOLD` / `ADMIN_LOCK_MINUTES` | não | Sessão + bloqueio de login |
| `SMTP_HOST` `SMTP_PORT` `SMTP_SECURE` `SMTP_USER` `SMTP_PASS` | p/ e-mail | Notificação de lead. Gmail: `smtp.gmail.com` / `465` / `true` + **App Password** |
| `LEAD_NOTIFY_FROM` / `LEAD_NOTIFY_TO` | p/ e-mail | Remetente (= conta autenticada) / destino |
| `N8N_WEBHOOK_URL` / `N8N_WEBHOOK_SECRET` | não | Automação pós-lead — ver `docs/N8N.md` |
| `GOOGLE_SERVICE_ACCOUNT_JSON` / `GOOGLE_SHEET_ID` / `GOOGLE_SHEET_RANGE` | não | Append direto em planilha |
| `ERROR_WEBHOOK_URL` | não | Encaminha erros server/client (n8n/Slack/Sentry-proxy) |
| `GOOGLE_SITE_VERIFICATION` | não | Meta tag do Search Console |
| `RATE_LIMIT_MAX` / `RATE_LIMIT_WINDOW_MS` / `LEAD_MIN_FILL_MS` | não | Anti-abuso |
| `BACKUP_KEEP` | não | Nº de dumps mantidos por `scripts/backup.mjs` |

---

## 5. Deploy (Railway)

Detalhes em [`docs/DEPLOY.md`](docs/DEPLOY.md). Resumo:

```bash
railway login                        # OAuth no navegador
railway init -n fourlife-website
railway add -d postgres
railway add -s fourlife-web
railway variables -s fourlife-web \
  --set 'DATABASE_URL=${{Postgres.DATABASE_URL}}' \
  --set 'MIGRATE_REQUIRED=true' --set 'NODE_ENV=production' \
  --set 'AUTH_SECRET=...' --set 'NEXT_PUBLIC_SITE_URL=https://<dominio>' --set 'SITE_URL=https://<dominio>'
railway up -y -s fourlife-web
railway domain -s fourlife-web
```

- Build via **Dockerfile** multi-stage (`output: standalone`).
- No start: `node db/migrate.mjs` (migrações + RLS) e depois `node server.js`.
- Health check: `GET /api/health`.
- O e-mail dos leads só funciona depois de setar `SMTP_USER` + `SMTP_PASS`
  (App Password do Gmail). Se a porta `465` estiver bloqueada, use `587` +
  `SMTP_SECURE=false`.

**Painel `/admin`:** com o Postgres acessível, rode
`railway run -s Postgres -- node scripts/create-admin.mjs email@dominio.com "senha-forte"`
e acesse `/admin`.

---

## 6. Segurança

- Validação e sanitização **server-side** (Zod); consentimento LGPD gravado com texto e timestamp.
- Rate limit por IP + honeypot + time-trap contra bots.
- `Content-Security-Policy` + HSTS + `X-Content-Type-Options` + `X-Frame-Options` +
  `Referrer-Policy` + `Permissions-Policy` + COOP/CORP (`next.config.ts`).
- `/admin` e `/api/admin/*`: **bcrypt** (cost 12) + sessão **JWT** assinada, bloqueio
  progressivo por tentativas.
- **RLS** habilitado em todas as tabelas no `db/migrate.mjs`.
- Segredos só em env vars; erros retornam mensagem genérica; logs não imprimem segredos.
- `X-Powered-By` off; `/api/*` e `/admin` fora do `robots.txt`; `security.txt` publicado.

## 7. SEO / GEO

- Metadata + Open Graph + Twitter por página, `canonical`, `sitemap.xml`, `robots.txt`.
- JSON-LD: `Organization`, `WebSite`, `FAQPage`, `Service` (`lib/seo.tsx`).
- `public/llms.txt` + `robots.ts` liberando explicitamente GPTBot, ClaudeBot,
  PerplexityBot, Google-Extended etc. para citação por IAs.
- **Manual:** criar o Google Business Profile e adicionar a propriedade no Search
  Console (o token vai em `GOOGLE_SITE_VERIFICATION`).

## 8. Acessibilidade e motion

- HTML semântico, `:focus-visible` visível, `alt` em toda imagem, contraste AA.
- Animações (reveal ao rolar, count-up dos números, carrosséis, transição de página)
  respeitam `prefers-reduced-motion` e só disparam quando o elemento entra na viewport.
- Tema segue a preferência do dispositivo (claro por padrão, escuro se o SO pedir).

## 9. Pendências de conteúdo

Marcadas como `NEEDS-CONFIRMATION` em `lib/content.ts`:
- Telefone de exibição (o deck traz `+55 48 99999-4545`, aparente placeholder).
- Razão social e CNPJ na Política de Privacidade.
- Handles de redes sociais (não fornecidos).
- Depoimentos vêm do site legado `fourlife.com.br`.
