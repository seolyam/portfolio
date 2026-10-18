/**
 * Inlined in <head>: marks the document as scripted, so the opening board can cover the
 * first paint and content about to make an entrance can wait for it. Without JS neither
 * applies; if the bundle never arrives, CSS releases both after a short fallback.
 */
export const motionScript = `document.documentElement.classList.add("js")`;

export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export type Tile = {
  row: number;
  col: number;
  /** Coloured like a board seen from white: the top-left square is light. */
  dark: boolean;
  /** King moves from the origin square: rings that a wave can spread through. */
  distance: number;
};

/** A checkerboard of cols × rows tiles in reading order. */
export function checker(cols: number, rows: number, origin = { row: 0, col: 0 }): Tile[] {
  return Array.from({ length: cols * rows }, (_, i) => {
    const row = Math.floor(i / cols);
    const col = i % cols;
    return {
      row,
      col,
      dark: (row + col) % 2 === 1,
      distance: Math.max(Math.abs(row - origin.row), Math.abs(col - origin.col)),
    };
  });
}
