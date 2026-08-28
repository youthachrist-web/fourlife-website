"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { X } from "lucide-react";
import { LeadForm } from "./lead-form";

type LeadModalApi = { open: (interest?: string) => void; close: () => void };

const LeadModalContext = createContext<LeadModalApi | null>(null);

export function useLeadModal(): LeadModalApi {
  return (
    useContext(LeadModalContext) ?? {
      open: () => {},
      close: () => {},
    }
  );
}

export function LeadModalProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ open: boolean; interest?: string }>({
    open: false,
  });

  const open = useCallback(
    (interest?: string) => setState({ open: true, interest }),
    [],
  );
  const close = useCallback(() => setState({ open: false }), []);

  useEffect(() => {
    if (!state.open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [state.open, close]);

  return (
    <LeadModalContext.Provider value={{ open, close }}>
      {children}
      {state.open ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lead-modal-title"
        >
          <button
            type="button"
            aria-label="Fechar"
            onClick={close}
            className="absolute inset-0 bg-black/55 backdrop-blur-sm"
          />
          <div className="relative max-h-[92vh] w-full overflow-y-auto rounded-t-3xl border border-line bg-background p-6 shadow-[var(--shadow-lift)] sm:max-w-lg sm:rounded-2xl sm:p-8">
            <button
              type="button"
              onClick={close}
              aria-label="Fechar"
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-ink hover:bg-surface-2"
            >
              <X className="h-5 w-5" />
            </button>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Fale com a FourLife
            </p>
            <h2
              id="lead-modal-title"
              className="mt-1 font-display text-2xl font-semibold text-ink"
            >
              Solicitar diagnóstico
            </h2>
            <p className="mt-2 text-sm text-slate">
              Deixe e-mail e WhatsApp. A equipe comercial retorna em até 1 dia útil.
            </p>
            <div className="mt-5">
              <LeadForm compact defaultInterest={state.interest} />
            </div>
          </div>
        </div>
      ) : null}
    </LeadModalContext.Provider>
  );
}
