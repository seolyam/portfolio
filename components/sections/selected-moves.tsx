import { ArrowUpRight } from "lucide-react";
import { GridSection } from "@/components/primitives/grid-container";
import { PAD_X } from "@/components/primitives/spacing";
import { ProjectDossier } from "@/components/project-dossier";
import { projects } from "@/lib/projects";
import { getSection, itemIndex } from "@/lib/sections";
import { links } from "@/lib/site";

const github = links.find((link) => link.id === "github")!;

export function SelectedMoves() {
  return (
    <GridSection section={getSection("moves")}>
      <div className={`pt-14 pb-12 md:pt-20 ${PAD_X}`}>
        <h2
          id="moves-title"
          data-motion="title"
          className="font-serif text-4xl tracking-[-0.02em] text-ink sm:text-5xl"
        >
          Selected moves
        </h2>
        <p data-motion="place" className="mt-4 max-w-xl text-pretty text-ink-muted">
          Four live systems I built or helped ship, from a 3D apparel customizer to an anonymous
          messaging platform with 2.6 million users.
        </p>
      </div>

      <div
        data-motion="items"
        className="grid gap-px border-t border-hairline bg-hairline md:grid-cols-2"
      >
        {projects.map((project, i) => (
          <ProjectDossier key={project.title} project={project} index={itemIndex("moves", i)} />
        ))}

        <a
          href={github.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`dossier group flex flex-col justify-between gap-10 py-10 sm:py-12 ${PAD_X}`}
        >
          <span className="font-mono text-[11px] tracking-[0.06em] text-ink-muted">
            {itemIndex("moves", projects.length)}
          </span>
          <span>
            <span className="block font-serif text-3xl leading-none tracking-[-0.02em] text-ink">
              Further variations
            </span>
            <span className="mt-4 block max-w-[36ch] text-sm leading-relaxed text-ink-muted">
              Experiments, mods and tooling that sit off the main line.
            </span>
            <span className="mt-6 inline-flex items-center gap-1 font-mono text-[11px] tracking-[0.06em] text-ink underline decoration-hairline-strong underline-offset-4 transition-colors duration-200 group-hover:decoration-crimson">
              {github.display}
              <ArrowUpRight aria-hidden className="size-3" strokeWidth={1.5} />
            </span>
          </span>
        </a>
      </div>
    </GridSection>
  );
}
