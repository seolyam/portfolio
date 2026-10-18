import { GridSection } from "@/components/primitives/grid-container";
import { PAD_X } from "@/components/primitives/spacing";
import { OutLink } from "@/components/project-dossier";
import { getSection, itemIndex } from "@/lib/sections";
import { links, principles, site } from "@/lib/site";

const POSITION = [
  ["Role", site.role],
  ["Focus", site.focus],
  ["Led", site.lead],
  ["Scale", site.scale],
  ["Education", site.education],
];

export function Opening() {
  return (
    <GridSection section={getSection("opening")}>
      <div className={`pt-16 pb-16 md:pt-24 md:pb-20 ${PAD_X}`}>
        {/* Set to the column's full measure, the second line stepped in under a crimson deck. */}
        <h1
          id="opening-title"
          className="font-serif text-[clamp(3.25rem,13.4vw,11rem)] leading-[0.88] tracking-[-0.035em] text-ink"
        >
          <span className="block">Lhiam Andrei</span>
          <span className="flex flex-wrap items-baseline gap-x-[0.35em] md:pl-[0.9em]">
            Lingco
            <span className="text-[clamp(1.125rem,2.2vw,1.875rem)] italic tracking-[-0.01em] text-crimson">
              {site.role.toLowerCase()}
            </span>
          </span>
        </h1>

        <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-6">
            <p className="max-w-[34rem] font-serif text-[clamp(1.375rem,2.1vw,1.75rem)] leading-[1.3] tracking-[-0.01em] text-pretty text-ink">
              {site.bio.lead} <span className="text-ink-muted">{site.bio.aside}</span>
            </p>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              {links.map((link) => (
                <li key={link.id}>
                  <OutLink href={link.href} label={link.label}>
                    {link.label}
                  </OutLink>
                </li>
              ))}
            </ul>
          </div>

          <dl className="border-t border-hairline font-mono text-[11px] tracking-[0.06em] md:col-span-5 md:col-start-8">
            {POSITION.map(([term, value]) => (
              <div key={term} className="flex justify-between gap-6 border-b border-hairline py-3">
                <dt className="uppercase text-ink-muted">{term}</dt>
                <dd className="text-right text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="border-t border-hairline">
        <h2 className="sr-only">Principles</h2>
        <ol data-motion="items" className="grid md:grid-cols-3">
          {principles.map((principle, i) => (
            <li
              key={principle.title}
              className={`border-b border-hairline py-10 last:border-b-0 md:border-b-0 md:border-l md:first:border-l-0 ${PAD_X}`}
            >
              <p className="font-mono text-[11px] text-ink-muted">{itemIndex("opening", i)}</p>
              <h3 className="mt-5 font-serif text-2xl leading-tight tracking-[-0.01em] text-ink">
                {principle.title}
              </h3>
              <p className="mt-3 max-w-[36ch] text-sm leading-relaxed text-pretty text-ink-muted">
                {principle.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </GridSection>
  );
}
