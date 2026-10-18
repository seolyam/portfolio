import { ArrowUpRight } from "lucide-react";
import { CopyButton } from "@/components/copy-button";
import { EndgameBoard } from "@/components/endgame-board";
import { GridSection } from "@/components/primitives/grid-container";
import { PAD_X } from "@/components/primitives/spacing";
import { getSection } from "@/lib/sections";
import { links, site } from "@/lib/site";

const VERBS: Record<string, string> = { github: "open", linkedin: "open", resume: "fetch" };

const ROW =
  "group flex min-w-0 flex-1 items-center gap-4 py-3.5 pl-3 transition-colors duration-200 hover:bg-stone";

function Prompt() {
  return (
    <span aria-hidden className="text-ink-muted transition-colors duration-200 group-hover:text-crimson">
      $
    </span>
  );
}

function Caret() {
  return (
    <span
      aria-hidden
      className="caret hidden h-[1.1em] w-[0.55em] bg-crimson group-hover:inline-block group-focus-visible:inline-block"
    />
  );
}

export function Endgame() {
  return (
    <GridSection section={getSection("endgame")}>
      <div className="grid grid-cols-[minmax(0,1fr)] gap-px bg-hairline lg:grid-cols-12">
        <div className={`bg-paper py-14 md:py-20 lg:col-span-7 ${PAD_X}`}>
          <h2
            id="endgame-title"
            data-motion="title"
            className="font-serif text-[clamp(3rem,7vw,5.5rem)] leading-[0.95] tracking-[-0.03em] text-ink"
          >
            Your move<span className="text-crimson">.</span>
          </h2>
          <p
            data-motion="place"
            className="mt-6 max-w-md text-lg leading-relaxed text-pretty text-ink-muted"
          >
            For roles, collaborations, or a second opinion on a system design, write to me
            directly.
          </p>

          <ul data-motion="items" className="mt-12 border-t border-hairline font-mono text-[13px]">
            <li className="flex items-center border-b border-hairline">
              <a href={`mailto:${site.email}`} className={ROW}>
                <Prompt />
                <span className="w-12 shrink-0 text-ink-muted">mail</span>
                <span className="truncate text-ink">{site.email}</span>
                <Caret />
              </a>
              <CopyButton value={site.email} label="email address" />
            </li>
            {links.map((link) => (
              <li key={link.id} className="flex items-center border-b border-hairline">
                <a href={link.href} target="_blank" rel="noopener noreferrer" className={ROW}>
                  <Prompt />
                  <span className="w-12 shrink-0 text-ink-muted">{VERBS[link.id]}</span>
                  <span className="truncate text-ink">{link.display}</span>
                  <Caret />
                  <ArrowUpRight
                    aria-hidden
                    className="mr-3 ml-auto size-3.5 shrink-0 text-ink-muted"
                    strokeWidth={1.5}
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={`bg-paper py-14 md:py-20 lg:col-span-5 ${PAD_X}`}>
          <EndgameBoard />
        </div>
      </div>
    </GridSection>
  );
}
