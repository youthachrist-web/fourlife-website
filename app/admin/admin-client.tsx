"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2, LogOut, RefreshCw } from "lucide-react";

type LeadRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  interest: string | null;
  status: string;
  n8nStatus: string;
  emailStatus: string;
  sheetsStatus: string;
  page: string | null;
  utmSource: string | null;
  createdAt: string;
};

export function AdminClient() {
  const [state, setState] = useState<"loading" | "login" | "ready" | "error">("loading");
  const [rows, setRows] = useState<LeadRow[]>([]);
  const [msg, setMsg] = useState<string | null>(null);

  const load = useCallback(async () => {
    setState("loading");
    const res = await fetch("/api/admin/leads?limit=100", { cache: "no-store" });
    if (res.status === 401) return setState("login");
    if (!res.ok) {
      setMsg("Falha ao carregar.");
      return setState("error");
    }
    const data = await res.json();
    setRows(data.leads ?? []);
    setState("ready");
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data fetch
    void load();
  }, [load]);

  async function onLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg(null);
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: fd.get("email"), password: fd.get("password") }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok) return load();
    setMsg(data.error ?? "Não foi possível entrar.");
  }

  async function onLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setState("login");
    setRows([]);
  }

  if (state === "loading") {
    return (
      <p className="flex items-center gap-2 text-sm text-slate">
        <Loader2 className="h-4 w-4 animate-spin" /> Carregando…
      </p>
    );
  }

  if (state === "login") {
    return (
      <form
        onSubmit={onLogin}
        className="mx-auto max-w-sm rounded-2xl border border-line bg-surface p-6"
      >
        <h1 className="font-display text-xl font-semibold text-ink">Painel FourLife</h1>
        <p className="mt-1 text-sm text-muted">Acesso restrito.</p>
        <label className="mt-5 block text-sm font-medium text-ink">
          E-mail
          <input
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-xl border border-line bg-background px-3 py-2 text-sm"
          />
        </label>
        <label className="mt-3 block text-sm font-medium text-ink">
          Senha
          <input
            name="password"
            type="password"
            required
            className="mt-1 w-full rounded-xl border border-line bg-background px-3 py-2 text-sm"
          />
        </label>
        {msg ? <p className="mt-3 text-sm text-error">{msg}</p> : null}
        <button
          type="submit"
          className="mt-5 h-10 w-full rounded-full bg-primary text-sm font-medium text-white"
        >
          Entrar
        </button>
      </form>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-semibold text-ink">
          Leads <span className="text-muted">({rows.length})</span>
        </h1>
        <div className="flex gap-2">
          <button
            onClick={load}
            className="inline-flex h-9 items-center gap-2 rounded-full border border-line px-4 text-sm"
          >
            <RefreshCw className="h-4 w-4" /> Atualizar
          </button>
          <button
            onClick={onLogout}
            className="inline-flex h-9 items-center gap-2 rounded-full border border-line px-4 text-sm"
          >
            <LogOut className="h-4 w-4" /> Sair
          </button>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-line">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead className="bg-surface-2 text-xs uppercase tracking-wide text-muted">
            <tr>
              {["Data", "Nome", "Empresa", "E-mail", "Telefone", "Interesse", "Origem", "Status"].map(
                (h) => (
                  <th key={h} className="px-3 py-2 font-semibold">
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((r) => (
              <tr key={r.id}>
                <td className="whitespace-nowrap px-3 py-2 text-muted">
                  {new Date(r.createdAt).toLocaleString("pt-BR")}
                </td>
                <td className="px-3 py-2">{r.name}</td>
                <td className="px-3 py-2">{r.company}</td>
                <td className="px-3 py-2">
                  <a className="text-primary underline" href={`mailto:${r.email}`}>
                    {r.email}
                  </a>
                </td>
                <td className="whitespace-nowrap px-3 py-2">{r.phone}</td>
                <td className="px-3 py-2">{r.interest ?? "—"}</td>
                <td className="px-3 py-2 text-muted">{r.utmSource ?? r.page ?? "—"}</td>
                <td className="px-3 py-2">
                  <span className="rounded bg-surface-2 px-2 py-0.5 text-xs">{r.status}</span>
                </td>
              </tr>
            ))}
            {rows.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-3 py-8 text-center text-muted">
                  Nenhum lead ainda.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
