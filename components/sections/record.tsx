import { GridSection } from "@/components/primitives/grid-container";
import { PAD_X } from "@/components/primitives/spacing";
import { RecordPawn } from "@/components/record-pawn";
import { education, experience, type Entry } from "@/lib/record";
import { getSection, itemIndex } from "@/lib/sections";

function Heading({ entry, index }: { entry: Entry; index: string }) {
  return (
    <div>
      <p data-rank-mark className="font-mono text-[11px] tracking-[0.06em] text-ink-muted">
        {index}
        <span className="ml-3">{entry.period}</span>
      </p>
      <h3 className="mt-4 font-serif text-2xl leading-tight tracking-[-0.01em] text-ink">
        {entry.title}
      </h3>
      <p className="mt-1 text-sm text-ink-muted">{entry.org}</p>
    </div>
  );
}

export function Record() {
  return (
    <GridSection section={getSection("record")}>
      <div className={`pt-14 pb-12 md:pt-20 ${PAD_X}`}>
        <h2
          id="record-title"
          data-motion="title"
          className="font-serif text-4xl tracking-[-0.02em] text-ink sm:text-5xl"
        >
          Record
        </h2>
        <p data-motion="place" className="mt-4 max-w-xl text-pretty text-ink-muted">
          Two years leading web development for a student developer community, four in open
          source, and a degree finished with Latin honors.
        </p>
      </div>

      <ol data-motion="items" className="border-t border-hairline">
        {experience.map((entry, i) => (
          <li
            key={entry.title}
            data-rank
            className={`grid gap-6 border-b border-hairline py-10 md:grid-cols-12 md:gap-8 ${PAD_X}`}
          >
            <div className="md:col-span-5">
              <Heading entry={entry} index={itemIndex("record", i)} />
            </div>
            <ul className="space-y-3 md:col-span-7">
              {entry.points.map((point) => (
                <li
                  key={point}
                  className="max-w-[60ch] text-[15px] leading-relaxed text-pretty text-ink-muted"
                >
                  {point}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      {/* The last rank: the record's pawn promotes here. */}
      <div data-rank>
        <h3
          data-rank-mark
          className={`border-b border-hairline py-3 font-mono text-[11px] uppercase tracking-[0.06em] text-ink-muted ${PAD_X}`}
        >
          Education
        </h3>
        <ol data-motion="items" className="grid gap-px bg-hairline md:grid-cols-2">
          {education.map((entry, i) => (
            <li key={entry.title} className={`bg-paper py-10 ${PAD_X}`}>
              <Heading entry={entry} index={itemIndex("record", experience.length + i)} />
              <ul className="mt-4 space-y-1 font-mono text-[11px] tracking-[0.06em] text-ink">
                {entry.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>

      <RecordPawn />
    </GridSection>
  );
}
