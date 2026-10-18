import { FILES } from "@/lib/chess";
import { checker } from "@/lib/motion";

/** e4: the square the board clears from, as the game opens 1. e4. */
export const OPENING_SQUARE = { row: 4, col: 4 };

const LABEL = "absolute font-mono text-[10px] leading-none text-ink-muted";

/**
 * The 8×8 board the coordinate tracker already lays over the viewport, made visible for
 * the first moment of a visit. Server-rendered so it covers the first paint; page-motion
 * plays 1. e4 on it and clears it square by square, outward from e4.
 */
export function OpeningBoard() {
  return (
    <div aria-hidden data-opening-board className="opening-board">
      {checker(8, 8, OPENING_SQUARE).map(({ row, col, dark, distance }) => (
        <span key={`${row}-${col}`} data-dark={dark || undefined} data-distance={distance}>
          {col === 0 && <span className={`${LABEL} top-1.5 left-2`}>{8 - row}</span>}
          {row === 7 && <span className={`${LABEL} right-2 bottom-1.5`}>{FILES[col]}</span>}
          {distance === 0 && (
            <span
              data-first-move
              className="absolute inset-[6px] flex items-center justify-center border border-crimson font-mono text-[11px] tracking-[0.06em] text-crimson opacity-0"
            >
              1. e4
            </span>
          )}
        </span>
      ))}
    </div>
  );
}
