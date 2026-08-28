"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

const KEY = "fl_consent_v1";

/**
 * First-visit terms & privacy gate. The visitor must accept to proceed.
 * Acceptance is stored per browser; if storage is unavailable the gate is
 * dismissable for the session only.
 */
export function ConsentGate() {
  const [ready, setReady] = useState(false);
  const [accepted, setAccepted] = useState(true);

  useEffect(() => {
    let stored = false;
    try {
      stored = localStorage.getItem(KEY) === "1";
    } catch {
      stored = false;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot read of localStorage on mount
    setAccepted(stored);
    setReady(true);
  }, []);

  function accept() {
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      /* session-only acceptance */
    }
    setAccepted(true);
  }

  if (!ready || accepted) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="consent-title"
    >
      <div className="w-full max-w-md rounded-2xl border border-line bg-background p-6 text-center shadow-[var(--shadow-lift)] sm:p-8">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
          <ShieldCheck className="h-6 w-6" />
        </span>
        <h2 id="consent-title" className="mt-4 font-display text-xl font-semibold text-ink">
          Termos e Privacidade
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate">
          Ao continuar, você concorda com os{" "}
          <Link href="/termos" className="font-medium text-primary underline">
            Termos de Uso
          </Link>{" "}
          e com a{" "}
          <Link href="/privacidade" className="font-medium text-primary underline">
            Política de Privacidade
          </Link>{" "}
          da FourLife. Este site não usa cookies de rastreamento de terceiros.
        </p>
        <button
          type="button"
          onClick={accept}
          className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-white hover:bg-primary-hover"
        >
          Aceitar e continuar
        </button>
      </div>
    </div>
  );
}
