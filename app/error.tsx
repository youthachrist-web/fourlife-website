"use client";

import { useEffect } from "react";
import { ButtonLink } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    const body = JSON.stringify({
      message: error.message,
      stack: error.stack,
      digest: error.digest,
      url: typeof window !== "undefined" ? window.location.href : undefined,
    });
    fetch("/api/client-error", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  }, [error]);

  return (
    <div className="mx-auto max-w-md px-5 py-24 text-center">
      <h1 className="font-display text-2xl font-semibold text-ink">
        Algo deu errado
      </h1>
      <p className="mt-2 text-slate">
        Já registramos o problema. Tente novamente em instantes.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex h-11 items-center rounded-full bg-primary px-6 text-sm font-medium text-white"
        >
          Tentar de novo
        </button>
        <ButtonLink href="/" variant="outline">
          Ir ao início
        </ButtonLink>
      </div>
    </div>
  );
}
