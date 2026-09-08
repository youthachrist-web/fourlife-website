# n8n + Google — contrato de integração

O backend **não** fala diretamente com CRM/Slack/planilha por padrão. Ele grava o
lead no PostgreSQL e dispara um webhook para o n8n, que orquestra o resto.
(O append direto no Google Sheets existe como sink opcional — ver final.)

## Webhook

- **Método:** `POST`
- **URL:** valor de `N8N_WEBHOOK_URL` (nó *Webhook* do n8n, caminho de produção)
- **Header:** `x-fourlife-signature: <N8N_WEBHOOK_SECRET>` (se a env estiver setada)
- **Timeout no lado do site:** 8s. Falha/timeout → `lead.n8n_status = error`,
  lead preservado.

### Corpo

```json
{
  "event": "lead.created",
  "sentAt": "2026-08-28T12:34:56.000Z",
  "lead": {
    "id": "uuid",
    "name": "Maria Souza",
    "email": "maria@empresa.com.br",
    "phone": "(48) 99999-0000",
    "company": "Empresa LTDA",
    "employees": "51-200",
    "interest": "Diagnóstico gratuito",
    "message": "texto livre ou null",
    "source": "website | campaign",
    "page": "/contato",
    "referrer": "https://...",
    "utm": {
      "source": null, "medium": null, "campaign": null, "term": null, "content": null
    },
    "consent": true,
    "consentAt": "2026-08-28T12:34:56.000Z",
    "createdAt": "2026-08-28T12:34:56.000Z"
  }
}
```

## Fluxo sugerido no n8n

1. **Webhook** (produção) → validar `x-fourlife-signature`.
2. **Set / Function** → normalizar telefone, montar linha.
3. **Google Sheets → Append Row** na planilha de leads.
4. **Gmail / SMTP** → e-mail para o time comercial (se não usar o e-mail nativo do site).
5. **HTTP Request / CRM node** → criar lead/deal (RD Station, Pipedrive, HubSpot...).
6. **Slack / WhatsApp** → notificação opcional.
7. Responder `200` rápido (o site não usa o corpo da resposta, só o status HTTP).

### Reprocessamento

Para reenviar leads com falha, consulte o banco e faça `POST` no mesmo webhook:

```sql
select id, name, email, phone, company, interest, message, page, created_at
from leads
where n8n_status = 'error'
order by created_at;
```

(Um endpoint de replay pode ser adicionado depois; hoje o reprocesso é manual/n8n.)

## Google Sheets — sink direto (opcional)

Se preferir que o **próprio site** grave na planilha (além ou no lugar do n8n):

1. Crie uma **service account** no Google Cloud, habilite a **Google Sheets API**.
2. Gere uma chave JSON. Coloque em `GOOGLE_SERVICE_ACCOUNT_JSON` (raw ou base64).
3. Crie a planilha, aba `Leads`, e **compartilhe com o e-mail da service account**
   (`...@...iam.gserviceaccount.com`) como *Editor*.
4. Defina `GOOGLE_SHEET_ID` (da URL) e, se necessário, `GOOGLE_SHEET_RANGE`
   (padrão `Leads!A:Z`).

Colunas na ordem em que o site escreve:

```
createdAt | id | name | email | phone | company | employees | interest |
message | source | page | utm_source | utm_medium | utm_campaign |
utm_term | utm_content | consent
```

Falha aqui → `lead.sheets_status = error`, lead preservado.
