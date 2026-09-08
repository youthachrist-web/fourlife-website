import { Microscope } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { SafeImage } from "@/components/ui/safe-image";
import { checkupInsights } from "@/lib/content";

export function CheckupInsights({
  className = "bg-background",
}: {
  className?: string;
}) {
  return (
    <Section id="checkup" className={className}>
      <SectionHeading
        eyebrow={checkupInsights.eyebrow}
        title={checkupInsights.title}
        body={checkupInsights.body}
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {checkupInsights.items.map((item, i) => (
          <Reveal
            key={item.exam}
            delay={i * 70}
            className="flex flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)]"
          >
            <SafeImage
              src={item.image.src}
              alt={item.image.alt}
              ratio="16 / 11"
              contain
              rounded="rounded-none"
              className="bg-brand-50"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <Microscope className="h-5 w-5" />
                </span>
                <h3 className="font-display text-base font-semibold text-ink">
                  {item.exam}
                </h3>
              </div>
              <ul className="mt-4 space-y-2 border-t border-line pt-4 text-sm text-slate">
                {item.reads.map((read) => (
                  <li key={read} className="flex gap-2">
                    <span
                      aria-hidden
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lime-400"
                    />
                    {read}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <p className="mt-6 text-xs text-muted">
        Conteúdo educativo. Somente o médico do trabalho pode interpretar exames e
        emitir conclusões sobre cada caso.
      </p>
    </Section>
  );
}
