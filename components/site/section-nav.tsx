/**
 * Sticky in-page navigation for small screens. Sits just under the header and
 * lets visitors jump between sections instead of scrolling the full page.
 */
const items = [
  { label: "Realidade", href: "#realidade" },
  { label: "Custo", href: "#custo" },
  { label: "Ecossistema", href: "#ecossistema" },
  { label: "Soluções", href: "#solucoes" },
  { label: "Método", href: "#metodo" },
  { label: "Diagnóstico", href: "#diagnostico" },
  { label: "Métricas", href: "#metricas" },
  { label: "Dúvidas", href: "#faq" },
];

export function SectionNav() {
  return (
    <nav
      aria-label="Ir para uma seção"
      className="sticky top-16 z-30 border-b border-line bg-background/95 backdrop-blur lg:hidden"
    >
      <div className="flex gap-2 overflow-x-auto px-5 py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="shrink-0 rounded-full border border-line px-3 py-1.5 text-xs font-medium text-slate active:bg-brand-50"
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
