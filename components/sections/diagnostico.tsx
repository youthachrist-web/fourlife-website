import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { CountUp } from "@/components/ui/count-up";
import { LeadCta } from "@/components/lead/lead-cta";
import { diagnostico, cta } from "@/lib/content";

export function Diagnostico({ withCta = true }: { withCta?: boolean }) {
  return (
    <Section id="diagnostico" className="bg-surface-2">
      <SectionHeading
        eyebrow={diagnostico.eyebrow}
        title={diagnostico.title}
        body={diagnostico.body}
      />

      <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {diagnostico.blocks.map((block, i) => (
          <Reveal
            as="li"
            key={block.number}
            delay={i * 50}
            className="rounded-xl border border-line bg-background p-5"
          >
            <span className="font-display text-lg font-semibold text-brand-400">
              <CountUp value={block.number} duration={900} />
            </span>
            <p className="mt-1 font-semibold text-ink">{block.name}</p>
            <p className="mt-1 text-sm text-slate">{block.detail}</p>
          </Reveal>
        ))}
      </ol>

      {withCta ? (
        <div className="mt-10 flex flex-wrap items-center gap-4 rounded-2xl border border-brand-200 bg-brand-50 p-6">
          <p className="flex-1 text-sm font-medium text-brand-800">
            A entrega são 3 prioridades — as de maior impacto na receita pelo menor esforço.
          </p>
          <LeadCta>
            {cta.primary.label} <ArrowRight className="h-4 w-4" />
          </LeadCta>
        </div>
      ) : null}
    </Section>
  );
}
