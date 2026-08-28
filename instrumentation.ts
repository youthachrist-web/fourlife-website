import type { Instrumentation } from "next";

/**
 * Server-side error capture. Logs every unhandled request error and forwards a
 * redacted summary to ERROR_WEBHOOK_URL when configured (e.g. an n8n workflow,
 * a Slack incoming webhook, or a Sentry ingest proxy).
 */
export const onRequestError: Instrumentation.onRequestError = async (
  err,
  request,
  context,
) => {
  const error = err as { message?: string; stack?: string; digest?: string };
  const payload = {
    kind: "server",
    at: new Date().toISOString(),
    message: error?.message ?? String(err),
    digest: error?.digest,
    stack: error?.stack?.split("\n").slice(0, 12).join("\n"),
    path: request.path,
    method: request.method,
    routerKind: context.routerKind,
    routePath: context.routePath,
  };

  console.error("[onRequestError]", JSON.stringify(payload));

  const url = process.env.ERROR_WEBHOOK_URL;
  if (url) {
    try {
      await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(4000),
      });
    } catch {
      /* never let error reporting throw */
    }
  }
};
