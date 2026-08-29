"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ClipboardCheck, Loader2, X } from "lucide-react";
import { readUtm } from "@/lib/validation";

const KEY = "fl_checklist_v1";
const HIDDEN_ON = ["/contato", "/diagnostico", "/admin"];

/**
 * Compact, dismissible checklist lead-magnet (oriondigital.pt style).
 * Asks name + WhatsApp + e-mail, X to close, shown once per browser.
 */
export function LeadPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const mountedAt = useRef(0);

  useEffect(() => {
    if (!mountedAt.current) mountedAt.current = Date.now();
  }, []);

  // Decide whether to show — once, after 14s or 35% scroll.
  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = localStorage.getItem(KEY) === "1";
    } catch {
      /* private mode */
    }
    if (dismissed || HIDDEN_ON.some((p) => pathname.startsWith(p))) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reset on route change
      setOpen(false);
      return;
    }
    let shown = false;
    const reveal = () => {
      if (shown) return;
      shown = true;
      setOpen(true);
      window.removeEventListener("scroll", onScroll);
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max > 0.35) reveal();
    };
    const t = window.setTimeout(reveal, 14000);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  function remember() {
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
  }

  function dismiss() {
    setOpen(false);
    remember();
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const phone = String(fd.get("phone") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();

    if (name.length < 2) return setError("Informe seu nome.");
    if (phone.replace(/\D/g, "").length < 10)
      return setError("WhatsApp inválido — use DDD + número.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError("E-mail inválido.");

    setState("sending");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          consent: true,
          variant: "quick",
          interest: "Checklist do Diagnóstico 360º",
          renderedAt: mountedAt.current,
          meta: {
            pagePath: pathname,
            referrer:
              typeof document !== "undefined" ? document.referrer || undefined : undefined,
            ...readUtm(new URLSearchParams(window.location.search)),
          },
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok !== false) {
        setState("done");
        remember();
        return;
      }
      setState("error");
      setError(
        data.error ??
          (res.status === 429
            ? "Muitas tentativas. Aguarde um instante."
            : "Não foi possível enviar agora."),
      );
    } catch {
      setState("error");
      setError("Falha de conexão. Tente novamente.");
    }
  }

  if (!open) return null;

  const field =
    "w-full rounded-lg border border-line bg-background px-2.5 py-1.5 text-[13px] text-ink placeholder:text-muted focus-visible:border-brand-400";

  return (
    <div className="fixed bottom-3 right-3 z-40 w-[calc(100vw-1.5rem)] max-w-[16.5rem] sm:bottom-4 sm:right-4">
      <div className="relative rounded-xl border border-line bg-background p-3.5 shadow-[var(--shadow-lift)]">
        <button
          type="button"
          onClick={dismiss}
          aria-label="Fechar"
          className="absolute right-1.5 top-1.5 inline-flex h-6 w-6 items-center justify-center rounded-full text-muted hover:bg-surface-2 hover:text-ink"
        >
          <X className="h-3.5 w-3.5" />
        </button>

        {state === "done" ? (
          <div className="py-1 text-center">
            <CheckCircle2 className="mx-auto h-7 w-7 text-brand-600" />
            <p className="mt-1.5 text-[13px] font-semibold text-ink">Recebido!</p>
            <p className="mt-0.5 text-[11px] leading-snug text-slate">
              Nossa equipe envia o checklist e retorna pelo seu WhatsApp em até 1 dia útil.
            </p>
          </div>
        ) : (
          <>
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-brand-50 text-brand-700">
              <ClipboardCheck className="h-4 w-4" />
            </span>
            <p className="mt-2 pr-4 font-display text-[13px] font-semibold leading-snug text-ink">
              Checklist do Diagnóstico 360º
            </p>
            <p className="mt-0.5 text-[11px] leading-snug text-slate">
              Os 8 blocos para achar o dinheiro oculto do seu negócio — no seu WhatsApp.
            </p>

            <form onSubmit={onSubmit} className="mt-2.5 grid gap-1.5" noValidate>
              <input name="name" required placeholder="Nome" autoComplete="name" className={field} />
              <input
                name="phone"
                type="tel"
                inputMode="tel"
                required
                placeholder="WhatsApp (DDD + número)"
                autoComplete="tel"
                className={field}
              />
              <input
                name="email"
                type="email"
                required
                placeholder="E-mail"
                autoComplete="email"
                className={field}
              />
              {error ? <p className="text-[11px] text-error">{error}</p> : null}
              <button
                type="submit"
                disabled={state === "sending"}
                className="mt-0.5 inline-flex h-9 items-center justify-center gap-1.5 rounded-full bg-primary px-3 text-[13px] font-medium text-white hover:bg-primary-hover disabled:opacity-60"
              >
                {state === "sending" ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" /> Enviando…
                  </>
                ) : (
                  "Quero o checklist"
                )}
              </button>
              <p className="text-[10px] leading-tight text-muted">
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
