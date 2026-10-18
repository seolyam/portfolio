import type { Section } from "@/lib/sections";
import { PAD_X } from "./spacing";

export function SectionHeader({ section }: { section: Section }) {
  return (
    <div
      className={`flex items-center justify-between gap-6 border-b border-hairline py-3 font-mono text-[11px] tracking-[0.06em] text-ink-muted ${PAD_X}`}
    >
      <p>
        <span aria-hidden>[</span>
        {section.index} <span aria-hidden>{"//"}</span>{" "}
        <span className="text-ink">{section.name}</span>
        <span aria-hidden>]</span>
      </p>
      <p className="hidden sm:block">{section.note}</p>
    </div>
  );
}
