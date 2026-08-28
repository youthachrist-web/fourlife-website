import { cn } from "@/lib/cn";
import { Container } from "./container";

export function Section({
  id,
  className,
  containerClassName,
  children,
  as: Tag = "section",
}: {
  id?: string;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
  as?: "section" | "div";
}) {
  return (
    <Tag id={id} className={cn("scroll-mt-24 py-16 sm:py-20 lg:py-24", className)}>
      <Container className={containerClassName}>{children}</Container>
    </Tag>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  body?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
        {title}
      </h2>
      {body ? (
        <p className="mt-4 text-base leading-relaxed text-slate sm:text-lg">{body}</p>
      ) : null}
    </div>
  );
}
