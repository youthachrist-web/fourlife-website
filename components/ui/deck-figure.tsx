import { SafeImage } from "@/components/ui/safe-image";

/**
 * A framed infographic lifted straight from the FourLife deck
 * ("Fourlife add.pptx"). The card copy next to it is the accessible,
 * responsive version; this figure is the branded visual companion.
 */
export function DeckFigure({
  src,
  alt,
  caption,
  ratio = "16 / 9",
  className,
  sizes = "(max-width: 1024px) 100vw, 960px",
  priority,
}: {
  src: string;
  alt: string;
  caption?: string;
  ratio?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <figure className={className}>
      <div className="overflow-hidden rounded-2xl border border-line bg-brand-900 shadow-[var(--shadow-lift)]">
        <SafeImage
          src={src}
          alt={alt}
          ratio={ratio}
          rounded="rounded-none"
          sizes={sizes}
          priority={priority}
        />
      </div>
      <figcaption className="mt-2 text-xs text-muted">
        {caption ? `${caption} · ` : ""}Material institucional FourLife
      </figcaption>
    </figure>
  );
}
