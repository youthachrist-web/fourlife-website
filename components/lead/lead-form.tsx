"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { leadFormSchema, readUtm, type LeadMeta } from "@/lib/validation";
import { interestOptions } from "@/lib/content";

type FieldErrors = Partial<Record<string, string[]>>;

const employeesOptions = [
  { value: "", label: "Nº de colaboradores (opcional)" },
  { value: "1-50", label: "1 a 50" },
  { value: "51-200", label: "51 a 200" },
  { value: "201-500", label: "201 a 500" },
  { value: "501-1000", label: "501 a 1000" },
  { value: "1000+", label: "Mais de 1000" },
];

const inputBase =
  "w-full rounded-xl border border-line bg-background px-4 py-3 text-sm text-ink placeholder:text-muted focus-visible:border-brand-400";

function useLeadMeta(): LeadMeta {
  const pathname = usePathname();
  return useMemo(() => {
    if (typeof window === "undefined") return { pagePath: pathname };
    const KEY = "fl_utm";
    const fromUrl = readUtm(new URLSearchParams(window.location.search));
    const hasUrlUtm = Object.values(fromUrl).some(Boolean);
    let utm = fromUrl;
    try {
      if (hasUrlUtm) {
        sessionStorage.setItem(KEY, JSON.stringify(fromUrl));
      } else {
        const stored = sessionStorage.getItem(KEY);
        if (stored) utm = { ...JSON.parse(stored), ...fromUrl };
      }
    } catch {
      /* sessionStorage unavailable — proceed with URL values only */
    }
    return {
      ...utm,
      pagePath: pathname,
      referrer: document.referrer || undefined,
    };
  }, [pathname]);
}

export function LeadForm({
  defaultInterest,
  compact = false,
}: {
  defaultInterest?: string;
  compact?: boolean;
}) {
  const meta = useLeadMeta();
  const renderedAtRef = useRef<number>(0);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    renderedAtRef.current = Date.now();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);
    setErrors({});

    const fd = new FormData(e.currentTarget);
    const raw = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      company: String(fd.get("company") ?? ""),
      employees: String(fd.get("employees") ?? ""),
      interest: String(fd.get("interest") ?? ""),
      message: String(fd.get("message") ?? ""),
      consent: fd.get("consent") === "on",
      website: String(fd.get("website") ?? ""),
      renderedAt: renderedAtRef.current,
    };

    const parsed = leadFormSchema.safeParse(raw);
    if (!parsed.success) {
      const { fieldErrors } = parsed.error.flatten();
      setErrors(fieldErrors as FieldErrors);
      setFormError("Verifique os campos destacados.");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...parsed.data, meta }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setStatus("success");
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("fourlife:lead", { detail: data }));
        }
        return;
      }
      if (res.status === 400 && data.fieldErrors) {
        setErrors(data.fieldErrors as FieldErrors);
        setFormError(data.error ?? "Verifique os campos destacados.");
      } else if (res.status === 429) {
        setFormError("Muitas tentativas em pouco tempo. Aguarde alguns instantes.");
      } else {
        setFormError(
          data.error ??
            "Não foi possível enviar agora. Tente novamente ou escreva para comercial@fourlife.com.br.",
        );
      }
      setStatus("error");
    } catch {
      setStatus("error");
      setFormError(
        "Falha de conexão. Verifique sua internet e tente novamente.",
      );
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-brand-200 bg-brand-50 p-8 text-center"
      >
        <CheckCircle2 className="mx-auto h-10 w-10 text-brand-600" />
        <h3 className="mt-3 font-display text-xl font-semibold text-brand-800">
          Recebemos seu contato
        </h3>
        <p className="mt-2 text-sm text-brand-800/80">
          Nossa equipe comercial responde em até 1 dia útil. Se preferir, fale agora pelo
          WhatsApp ou por comercial@fourlife.com.br.
        </p>
      </div>
    );
  }

  const err = (name: string) => errors[name]?.[0];

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4">
      {/* Honeypot */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Não preencha</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className={cn("grid gap-4", !compact && "sm:grid-cols-2")}>
        <Field label="Nome completo" error={err("name")}>
          <input name="name" autoComplete="name" required className={inputBase} />
        </Field>
        <Field label="E-mail corporativo" error={err("email")}>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            className={inputBase}
          />
        </Field>
        <Field label="Telefone / WhatsApp" error={err("phone")}>
          <input
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="(48) 90000-0000"
            required
            className={inputBase}
          />
        </Field>
        <Field label="Empresa" error={err("company")}>
          <input name="company" autoComplete="organization" required className={inputBase} />
        </Field>
        <Field label="Porte" error={err("employees")}>
          <select name="employees" className={inputBase} defaultValue="">
            {employeesOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Interesse" error={err("interest")}>
          <select
            name="interest"
            className={inputBase}
            defaultValue={defaultInterest ?? ""}
          >
            <option value="">Selecione (opcional)</option>
            {interestOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Mensagem (opcional)" error={err("message")}>
        <textarea
          name="message"
          rows={compact ? 3 : 4}
          className={cn(inputBase, "resize-y")}
          placeholder="Conte o desafio atual de saúde e produtividade na sua operação."
        />
      </Field>

      <label className="flex items-start gap-3 text-sm text-slate">
        <input
          name="consent"
          type="checkbox"
          required
          className="mt-1 h-4 w-4 shrink-0 rounded border-line accent-brand-600"
        />
        <span>
          Autorizo o contato da FourLife e o tratamento dos meus dados conforme a{" "}
          <Link href="/privacidade" className="font-medium text-primary underline">
            Política de Privacidade
          </Link>
          .
        </span>
      </label>
      {err("consent") ? (
        <p className="-mt-2 text-sm text-error">{err("consent")}</p>
      ) : null}

      {formError ? (
        <p role="alert" className="rounded-xl bg-error/10 px-4 py-3 text-sm text-error">
          {formError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-white transition-colors hover:bg-primary-hover disabled:opacity-60"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Enviando…
          </>
        ) : (
          "Solicitar diagnóstico"
        )}
      </button>

      <p className="text-xs text-muted">
        Seus dados são usados apenas para retorno comercial. Nunca compartilhamos com
        terceiros sem consentimento.
      </p>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      {children}
      {error ? <span className="mt-1 block text-sm text-error">{error}</span> : null}
    </label>
  );
}
