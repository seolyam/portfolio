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
        <h1
          id="opening-title"
          className="font-serif text-[clamp(3.25rem,10vw,7.5rem)] leading-[0.92] tracking-[-0.03em] text-ink"
        >
          Lhiam Andrei
          <br />
          Lingco
        </h1>

        <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-6">
            <p className="max-w-[34rem] text-lg leading-relaxed text-pretty text-ink-muted sm:text-xl">
              {site.bio}
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
