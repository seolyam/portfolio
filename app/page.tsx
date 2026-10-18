import { OpeningBoard } from "@/components/opening-board";
import { PageMotion } from "@/components/page-motion";
import { GridContainer } from "@/components/primitives/grid-container";
import { Arsenal } from "@/components/sections/arsenal";
import { Endgame } from "@/components/sections/endgame";
import { Opening } from "@/components/sections/opening";
import { Record } from "@/components/sections/record";
import { SelectedMoves } from "@/components/sections/selected-moves";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <GridContainer>
          <Opening />
          <Record />
          <SelectedMoves />
          <Arsenal />
          <Endgame />
        </GridContainer>
      </main>
      <SiteFooter />
      <OpeningBoard />
      <PageMotion />
    </>
  );
}
