import { GridContainer } from "./primitives/grid-container";
import { PAD_X } from "./primitives/spacing";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer>
      <GridContainer>
        <div
          className={`flex flex-col gap-2 py-6 font-mono text-[11px] tracking-[0.06em] text-ink-muted sm:flex-row sm:justify-between ${PAD_X}`}
        >
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <p className="flex flex-col gap-2 sm:flex-row sm:gap-8">
            <span>Set in Newsreader &amp; Geist · 1–0</span>
            <a
              href="#opening"
              className="text-ink underline decoration-hairline-strong underline-offset-4 transition-colors duration-200 hover:decoration-crimson"
            >
              Back to the opening ↑
            </a>
          </p>
        </div>
      </GridContainer>
    </footer>
  );
}
