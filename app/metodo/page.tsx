import type { Metadata } from "next";
import { Method } from "@/components/sections/method";
import { MetricsKit } from "@/components/sections/metrics-kit";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata: Metadata = {
  title: "Método",
  description:
    "O Método Orion: a engenharia de crescimento do ecossistema FourLife — marca, marketing, vendas e expansão, com IA sob direção humana.",
  alternates: { canonical: "/metodo" },
};

export default function MetodoPage() {
  return (
    <>
      <Method />
      <MetricsKit />
      <CtaBand
        title="Toda ação com indicador definido antes de começar."
        body="Aplique o Kit de 6 métricas ao seu negócio no Diagnóstico 360º."
      />
    </>
  );
}
