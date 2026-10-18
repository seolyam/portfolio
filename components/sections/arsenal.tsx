import { GridSection } from "@/components/primitives/grid-container";
import { PAD_X } from "@/components/primitives/spacing";
import { arsenal } from "@/lib/arsenal";
import { getSection, itemIndex } from "@/lib/sections";

export function Arsenal() {
  return (
    <GridSection section={getSection("arsenal")}>
      <div className={`pt-14 pb-12 md:pt-20 ${PAD_X}`}>
        <h2
          id="arsenal-title"
          data-motion="title"
          className="font-serif text-4xl tracking-[-0.02em] text-ink sm:text-5xl"
        >
          Arsenal
        </h2>
        <p data-motion="place" className="mt-4 max-w-xl text-pretty text-ink-muted">
          Grouped by what each tool is for. Every group names a shipped project where you
          can check the work.
        </p>
      </div>

      <div
        data-motion="items"
        className="grid gap-px border-t border-hairline bg-hairline md:grid-cols-2 lg:grid-cols-3"
      >
        {arsenal.map((group, i) => (
          <div key={group.title} className={`flex flex-col bg-paper py-10 md:py-12 ${PAD_X}`}>
            <h3 className="font-mono text-[11px] tracking-[0.06em] text-ink-muted">
              {itemIndex("arsenal", i)}
              <span className="ml-3 uppercase">{group.title}</span>
            </h3>
            <p className="mt-4 max-w-[36ch] text-sm leading-relaxed text-pretty text-ink-muted">
              {group.summary}
            </p>
            <ul className="mt-6 space-y-2">
              {group.items.map((item) => (
                <li key={item} className="font-serif text-2xl leading-snug tracking-[-0.01em] text-ink">
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-8">
              <p className="border-t border-hairline pt-4 font-mono text-[11px] tracking-[0.06em] text-ink-muted">
                <span className="uppercase">Used in</span>{" "}
                <span className="text-ink">{group.proof.join(" · ")}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </GridSection>
  );
}
