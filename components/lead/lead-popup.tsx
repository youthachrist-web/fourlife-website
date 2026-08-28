"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ClipboardCheck, Loader2, X } from "lucide-react";
import { readUtm } from "@/lib/validation";

const KEY = "fl_checklist_v1";
const HIDDEN_ON = ["/contato", "/diagnostico", "/admin"];

/**
 * Small, dismissible checklist lead-magnet (oriondigital.pt style) — offers the
 * Diagnóstico 360º checklist in exchange for name + WhatsApp + e-mail. Appears
 * once, after a short delay or 30% scroll, and stays closed once dismissed.
 */
export function LeadPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const renderedAt = useRef(0);

  useEffect(() => {
    renderedAt.current = Date.now();
    let dismissed = false;
    try {
      dismissed = localStorage.getItem(KEY) === "1";
    } catch {
      dismissed = false;
    }
    if (dismissed || HIDDEN_ON.some((p) => pathname.startsWith(p))) return;

    let shown = false;
    const show = () => {
      if (shown) return;
      shown = true;
      setOpen(true);
      window.removeEventListener("scroll", onScroll);
    };
    const onScroll = () => {
      const p =
        window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (p > 0.3) show();
    };
    const t = window.setTimeout(show, 12000);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  function dismiss() {
    setOpen(false);
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      website: String(fd.get("website") ?? ""),
      consent: true as const,
      variant: "quick" as const,
      interest: "Checklist do Diagnóstico 360º",
      renderedAt: renderedAt.current,
      meta: {
        pagePath: pathname,
        referrer: typeof document !== "undefined" ? document.referrer || undefined : undefined,
        ...readUtm(new URLSearchParams(window.location.search)),
      },
    };
    if (payload.name.length < 2 || payload.email.length < 5 || payload.phone.replace(/\D/g, "").length < 10) {
      setError("Preencha nome, WhatsApp e e-mail.");
      return;
    }
    setState("sending");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setState("done");
        try {
          localStorage.setItem(KEY, "1");
        } catch {
          /* ignore */
        }
        return;
      }
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Não foi possível enviar agora.");
      setState("error");
    } catch {
      setError("Falha de conexão. Tente novamente.");
      setState("error");
    }
  }

  if (!open) return null;

  return (
    <div className="fixed bottom-3 right-3 z-40 w-[calc(100vw-1.5rem)] max-w-xs sm:bottom-5 sm:right-5">
      <div className="relative overflow-hidden rounded-2xl border border-line bg-background p-5 shadow-[var(--shadow-lift)]">
        <button
          type="button"
          onClick={dismiss}
          aria-label="Fechar"
          className="absolute right-2.5 top-2.5 inline-flex h-7 w-7 items-center justify-center rounded-full text-muted hover:bg-surface-2 hover:text-ink"
        >
          <X className="h-4 w-4" />
        </button>

        {state === "done" ? (
          <div className="py-2 text-center">
            <CheckCircle2 className="mx-auto h-8 w-8 text-brand-600" />
            <p className="mt-2 text-sm font-medium text-ink">Recebemos seu contato</p>
            <p className="mt-1 text-xs text-slate">
              Você recebe o checklist do Diagnóstico 360º no WhatsApp em instantes.
            </p>
          </div>
        ) : (
          <>
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
              <ClipboardCheck className="h-5 w-5" />
            </span>
            <p className="mt-3 font-display text-sm font-semibold leading-snug text-ink">
              Checklist do Diagnóstico 360º
            </p>
            <p className="mt-1 text-xs leading-snug text-slate">
              Os 8 blocos para achar o dinheiro oculto do seu negócio. Enviamos no seu
              WhatsApp.
            </p>

            <form onSubmit={onSubmit} className="mt-3 grid gap-2" noValidate>
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
                className="hidden"
              />
              <input
                name="name"
                required
                placeholder="Nome"
                autoComplete="name"
                className="w-full rounded-lg border border-line bg-background px-3 py-2 text-sm text-ink placeholder:text-muted focus-visible:border-brand-400"
              />
              <input
                name="phone"
                type="tel"
                inputMode="tel"
                required
                placeholder="WhatsApp (DDD + número)"
                autoComplete="tel"
                className="w-full rounded-lg border border-line bg-background px-3 py-2 text-sm text-ink placeholder:text-muted focus-visible:border-brand-400"
              />
              <input
                name="email"
                type="email"
                required
                placeholder="E-mail"
                autoComplete="email"
                className="w-full rounded-lg border border-line bg-background px-3 py-2 text-sm text-ink placeholder:text-muted focus-visible:border-brand-400"
              />
              {error ? <p className="text-xs text-error">{error}</p> : null}
              <button
                type="submit"
                disabled={state === "sending"}
                className="mt-0.5 inline-flex h-10 items-center justify-center gap-2 rounded-full bg-primary px-4 text-sm font-medium text-white hover:bg-primary-hover disabled:opacity-60"
              >
                {state === "sending" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Enviando…
                  </>
                ) : (
                  "Quero o checklist"
                )}
              </button>
              <p className="text-[11px] leading-tight text-muted">
                Ao enviar, você concorda com a{" "}
                <Link href="/privacidade" className="underline hover:text-primary">
                  Política de Privacidade
                </Link>
                .
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
