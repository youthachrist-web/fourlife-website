# Deploy — Railway + GitHub

> ⚠️ **Segredos.** As credenciais compartilhadas em texto puro no arquivo de
> preparação devem ser **rotacionadas** antes do deploy (GitHub PAT, token
> Railway, TOTP/recovery do n8n, app password do Google). Nada de segredo entra
> em código, README, commit ou log — apenas variáveis de ambiente do Railway.

## 1. Repositório GitHub

```bash
cd fourlife-website
git init
git add .
git commit -m "chore: bootstrap FourLife website"
gh repo create <owner>/fourlife-website --private --source=. --remote=origin --push
```

`.gitignore` já cobre `.env*`, `node_modules`, `.next`. Confirme que nenhum
`.env` foi adicionado (`git status`).

## 2. Serviço no Railway

1. **New Project → Deploy from GitHub repo** → selecione o repositório.
2. Railway detecta o `Dockerfile` (`railway.json` fixa `builder: DOCKERFILE`).
3. **Add → Database → PostgreSQL.** O Railway injeta `DATABASE_URL` no serviço web
   (referencie `${{Postgres.DATABASE_URL}}` nas variáveis do serviço se necessário).
4. Configure as variáveis de ambiente (aba *Variables*) — ver tabela abaixo.
5. O deploy roda `node db/migrate.mjs; node server.js`
   (`deploy.startCommand` no `railway.json`). As migrações de `drizzle/` são
   aplicadas automaticamente a cada release.
6. **Healthcheck** já configurado para `GET /api/health` (timeout 30s).
7. **Networking → Generate Domain** (ou domínio próprio). Depois defina
   `NEXT_PUBLIC_SITE_URL` e `SITE_URL` com a URL final e faça *redeploy*
   (o `NEXT_PUBLIC_SITE_URL` é lido em build — passe também como build arg se
   usar cache agressivo).

### Variáveis mínimas

| Variável | Valor |
|---|---|
| `DATABASE_URL` | `${{Postgres.DATABASE_URL}}` |
| `NEXT_PUBLIC_SITE_URL` | `https://<seu-domínio>` |
| `SITE_URL` | `https://<seu-domínio>` |
| `MIGRATE_REQUIRED` | `true` |
| `NODE_ENV` | `production` |

### Integrações (adicionar quando prontas)

| Variável | Origem |
|---|---|
| `N8N_WEBHOOK_URL` | URL do nó *Webhook* no n8n (produção) |
| `N8N_WEBHOOK_SECRET` | string aleatória; validar no n8n contra `x-fourlife-signature` |
| `SMTP_HOST` `SMTP_PORT` `SMTP_SECURE` | `smtp.gmail.com` `465` `true` |
| `SMTP_USER` `SMTP_PASS` | conta Google + **app password** rotacionado |
| `LEAD_NOTIFY_FROM` `LEAD_NOTIFY_TO` | remetente e `comercial@fourlife.com.br` |
| `GOOGLE_SERVICE_ACCOUNT_JSON` | JSON da service account (raw ou base64) |
| `GOOGLE_SHEET_ID` | ID da planilha; compartilhe com o e-mail da service account |

## 3. Verificação pós-deploy

```bash
curl -s https://<domínio>/api/health | jq
# status: "ok", checks.database: "ok"

# Teste de lead (ajuste o corpo):
curl -s -X POST https://<domínio>/api/leads \
  -H 'content-type: application/json' \
  -d '{"name":"Teste QA","email":"qa@exemplo.com","phone":"(48) 99999-0000","company":"QA","consent":true}'
# 201 { ok: true, leadId: "...", status: "delivered" | "partial" | "processing" }
```

Confira no banco: `select id, status, n8n_status, email_status, created_at from leads order by created_at desc limit 5;`

## 4. Build local da imagem (opcional)

```bash
docker build --build-arg NEXT_PUBLIC_SITE_URL=https://fourlife.com.br -t fourlife-web .
docker run --rm -p 3000:3000 -e DATABASE_URL=... fourlife-web
```

## Rollback

Railway mantém histórico de deploys — *Redeploy* de uma versão anterior. As
migrações são aditivas; um rollback de código não desfaz schema (planeje
migrações compatíveis com a versão anterior).
