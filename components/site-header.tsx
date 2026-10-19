import { CommandMenu } from "./command-menu";
import { GridContainer } from "./primitives/grid-container";
import { SectionNav } from "./section-nav";
import { ThemeToggle } from "./theme-toggle";
import { site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-paper">
      <GridContainer>
        <div className="flex h-14 items-stretch">
          <a
            href="#opening"
            className="flex shrink-0 items-center px-5 font-serif text-lg tracking-[-0.01em] text-ink sm:px-8 lg:px-10"
          >
            {site.shortName}
          </a>

          <SectionNav />

          <div className="ml-auto flex items-stretch">
            <CommandMenu />
            <ThemeToggle />
          </div>
        </div>
      </GridContainer>
    </header>
  );
}
