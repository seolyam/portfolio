import type { Section } from "@/lib/sections";
import { Crosshair } from "./crosshair";
import { SectionHeader } from "./section-header";

/** The page's exposed frame: a centered column bounded by two hairline rails. */
export function GridContainer({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="px-4 sm:px-6">
      <div className={`relative mx-auto max-w-6xl border-x border-hairline ${className}`}>
        {children}
      </div>
    </div>
  );
}

export function GridSection({
  section,
  children,
}: {
  section: Section;
  children: React.ReactNode;
}) {
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      className="relative border-b border-hairline"
    >
      <SectionHeader section={section} />
      {children}
      <Crosshair corner="bl" />
      <Crosshair corner="br" />
    </section>
  );
}
