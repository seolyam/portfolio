"use client";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { checker } from "@/lib/motion";

/**
 * Page choreography. The page reads as one game, so every entrance is a chess action,
 * keyed off data attributes so the sections stay server-rendered:
 *
 *   [data-opening-board]  the first view loads under its 8×8 board; 1. e4 clears it
 *   data-motion="title"   display type resolves through a checkerboard
 *   data-motion="items"   each cell is a square a move just landed on: it lights with the
 *                         last-move highlight while its contents are set down
 *   data-motion="place"   a single block, set down
 *   data-crosshair        registration marks turn into place as a section closes
 *
 * The hairline frame itself never moves.
 */

const START = "top 92%";
/** Entrances already in view at load wait for the opening board to clear. */
const BOARD_HOLD = 1.2;
const LIFT = 10;

const all = (selector: string, scope?: Element) =>
  gsap.utils.toArray<HTMLElement>(selector, scope);
const contents = (cells: Element[]) => cells.flatMap((cell) => [...cell.children]);
const light = (tiles: HTMLElement[]) => tiles.filter((tile) => !("dark" in tile.dataset));
const dark = (tiles: HTMLElement[]) => tiles.filter((tile) => "dark" in tile.dataset);
/** Staggers tiles by their distance from the wave's origin. */
const wave = (step: number) => (_: number, tile: HTMLElement) => Number(tile.dataset.distance) * step;

/**
 * 1. e4: the move is marked on its square, then the board clears outward from it in rings,
 * light squares first, so for a beat the page shows through a checkerboard.
 */
function clearBoard() {
  const board = document.querySelector<HTMLElement>("[data-opening-board]");
  const tl = gsap.timeline();
  if (!board) return tl;
  const tiles = all(":scope > span", board);
  // Whole squares lift away; shrinking them would open slivers of page along every edge.
  const lift = { opacity: 0, scale: 0.94, duration: 0.32, ease: "power2.in", stagger: wave(0.06) };
  return tl
    .fromTo(
      all("[data-first-move]", board),
      { opacity: 0, scale: 1.2 },
      { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" },
    )
    .to(light(tiles), lift, 0.5)
    .to(dark(tiles), lift, 0.85)
    .set(board, { display: "none" });
}

/** Covers a heading's text with a small board that clears, light squares then dark. */
function resolve(title: HTMLElement, delay: number) {
  const size = parseFloat(getComputedStyle(title).fontSize) / 2;
  const range = document.createRange();
  range.selectNodeContents(title);
  const text = range.getBoundingClientRect();
  const box = title.getBoundingClientRect();
  // Half a square of headroom either side for ascenders and descenders.
  const cols = Math.ceil(text.width / size);
  const rows = Math.ceil(text.height / size + 1);

  const cover = document.createElement("span");
  cover.setAttribute("aria-hidden", "true");
  cover.className = "checker-cover";
  Object.assign(cover.style, {
    left: `${text.left - box.left}px`,
    top: `${text.top - box.top - size / 2}px`,
    gridTemplateColumns: `repeat(${cols}, ${size}px)`,
    gridAutoRows: `${size}px`,
  });
  const tiles = checker(cols, rows).map(({ dark, distance }) => {
    const tile = document.createElement("span");
    if (dark) tile.dataset.dark = "";
    tile.dataset.distance = String(distance);
    return tile;
  });
  cover.append(...tiles);
  title.append(cover);
  gsap.set(title, { position: "relative", autoAlpha: 1 });

  return gsap
    .timeline({
      delay,
      onComplete: () => {
        cover.remove();
        gsap.set(title, { clearProps: "position" });
      },
    })
    .to(light(tiles), { scale: 0, duration: 0.3, ease: "power2.in", stagger: wave(0.035) })
    .to(dark(tiles), { scale: 0, duration: 0.3, ease: "power2.in", stagger: wave(0.035) }, 0.16);
}

/** Pieces are set down, not floated up: a short drop that lands at speed. */
function setDown(targets: Element[], delay: number) {
  gsap.to(targets, {
    autoAlpha: 1,
    duration: 0.2,
    ease: "none",
    stagger: 0.07,
    delay,
    clearProps: "opacity,visibility",
  });
  gsap.to(targets, {
    y: 0,
    duration: 0.34,
    ease: "power2.in",
    stagger: 0.07,
    delay,
    clearProps: "transform",
  });
}

/** The squares a move lands on light up, as on any board's last move, then fade. */
function highlight(cells: Element[], delay: number) {
  for (const cell of cells) {
    cell.classList.add("last-move");
    gsap.fromTo(
      cell,
      { "--lit": 1 },
      {
        "--lit": 0,
        duration: 1.8,
        delay,
        ease: "power1.in",
        onComplete: () => cell.classList.remove("last-move"),
      },
    );
  }
}

export function PageMotion() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const opening = clearBoard();
      const hold = () => Math.max(0, BOARD_HOLD - opening.time());

      for (const title of all('[data-motion="title"]')) {
        gsap.set(title, { autoAlpha: 0 });
        ScrollTrigger.create({
          trigger: title,
          start: START,
          once: true,
          onEnter: () => resolve(title, hold()),
        });
      }

      const blocks = all('[data-motion="place"]');
      gsap.set(blocks, { autoAlpha: 0, y: -LIFT });
      ScrollTrigger.batch(blocks, {
        start: START,
        once: true,
        onEnter: (batch) => setDown(batch, hold()),
      });

      const cells = all('[data-motion="items"] > *');
      gsap.set(contents(cells), { autoAlpha: 0, y: -LIFT });
      ScrollTrigger.batch(cells, {
        start: START,
        once: true,
        onEnter: (batch) => {
          const delay = hold();
          highlight(batch, delay);
          setDown(contents(batch), delay + 0.08);
        },
      });

      const marks = all("[data-crosshair]");
      gsap.set(marks, { autoAlpha: 0, rotate: -90, scale: 0.4 });
      ScrollTrigger.batch(marks, {
        start: "top 96%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            rotate: 0,
            scale: 1,
            duration: 1,
            stagger: 0.12,
            delay: hold(),
            clearProps: "opacity,visibility,transform",
          }),
      });
    });

    // From here GSAP owns the board; the CSS fallback that would lift it steps aside.
    document.documentElement.classList.add("motion-ready");
    document.fonts.ready.then(() => ScrollTrigger.refresh());

    return () => mm.revert();
  });

  return null;
}
