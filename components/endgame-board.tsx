"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  CHECK,
  FILES,
  PIECE_NAMES,
  PLAY_SOLUTION_EVENT,
  PUZZLE_FEN,
  SOLUTION,
  describeMove,
  isSolution,
  isWhite,
  movePiece,
  parsePlacement,
  squareDelta,
  squares,
  type Board,
} from "@/lib/chess";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { PieceIcon } from "./chess-pieces";

const START = parsePlacement(PUZZLE_FEN);
const SOLVED = movePiece(START, SOLUTION.from, SOLUTION.to);
const MATED_KING = CHECK.to;
const RETRACT_MS = 1100;
/** Misses before the board offers a hint. */
const HINT_AFTER = 2;
const ARROWS: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -8, ArrowDown: 8 };

/** Hairline sigil in board space (8×8): two wings, an axis, a seal. */
const SIGIL = [
  "M1 2.9 L4 5.6 L7 2.9",
  "M2.3 3 L4 4.6 L5.7 3",
  "M4 1.6 V4",
  "M4 5.6 L4.5 6.3 L4 7 L3.5 6.3 Z",
];
/** In board units (1 = one square), so the pathLength-based draw stays solid; ≈1px at 24rem. */
const SIGIL_STROKE = 0.022;

/** A move the board should play out on its next render; the state change itself is instant. */
type Slide = { from: string; to: string; kind: "attempt" | "retract" | "mate" | "reset" };

const capitalize = (word: string) => word[0].toUpperCase() + word.slice(1);

/** Center of a square in board space (8×8, a8 at the origin). */
const center = (square: string) =>
  `${FILES.indexOf(square[0]) + 0.5} ${8 - Number(square[1]) + 0.5}`;

function describeSquare(board: Board, square: string) {
  const piece = board[square];
  if (!piece) return `${square}, empty`;
  return `${square}, ${isWhite(piece) ? "white" : "black"} ${PIECE_NAMES[piece.toUpperCase()]}`;
}

/** The mate, once the king lands: line of attack, sigil drawn and released, the verdict. */
function mateSequence() {
  return gsap
    .timeline()
    .from("[data-highlight]", { opacity: 0, duration: 0.5 }, 0)
    .fromTo(
      "[data-check]",
      { strokeDashoffset: 1 },
      { strokeDashoffset: 0, duration: 0.6, ease: "power2.inOut" },
      0,
    )
    .fromTo(
      "[data-sigil] path",
      { strokeDashoffset: 1 },
      { strokeDashoffset: 0, duration: 0.9, stagger: 0.11 },
      0.11,
    )
    .from("[data-mated]", { opacity: 0, scale: 1.3, duration: 0.5 }, 0.4)
    // Black resigns the way players do: the king is tipped over onto its side.
    .to(
      `[data-square="${MATED_KING}"] svg`,
      {
        keyframes: [
          { rotation: -96, duration: 0.42, ease: "power2.in" },
          { rotation: -86, duration: 0.12, ease: "power1.out" },
          { rotation: -90, duration: 0.16, ease: "power1.in" },
        ],
        transformOrigin: "50% 82%",
      },
      0.95,
    )
    .fromTo("[data-sigil]", { opacity: 1 }, { opacity: 0, duration: 1.4 }, 1.7)
    // Opacity only: the verdict sits in a live region and must stay in the accessibility tree.
    .from("[data-verdict]", { opacity: 0, y: 6, duration: 0.7, stagger: 0.3 }, 0.45);
}

export function EndgameBoard() {
  const [selected, setSelected] = useState<string | null>(null);
  const [attempt, setAttempt] = useState<{ from: string; to: string } | null>(null);
  const [blunder, setBlunder] = useState<string | null>(null);
  const [misses, setMisses] = useState(0);
  const [solved, setSolved] = useState(false);
  const [focus, setFocus] = useState("e4");
  const rootRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number>(undefined);
  const slide = useRef<Slide | null>(null);
  const entrance = useRef<gsap.core.Timeline | null>(null);

  const board = solved ? SOLVED : attempt ? movePiece(START, attempt.from, attempt.to) : START;
  const hinted = misses >= HINT_AFTER && !solved;

  const solve = useCallback(() => {
    window.clearTimeout(timer.current);
    slide.current = { from: SOLUTION.from, to: SOLUTION.to, kind: "mate" };
    setAttempt(null);
    setSelected(null);
    setBlunder(null);
    setSolved(true);
  }, []);

  useEffect(() => {
    const onPlay = () => {
      boardRef.current?.scrollIntoView({ block: "center" });
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(solve, 650);
    };
    window.addEventListener(PLAY_SOLUTION_EVENT, onPlay);
    return () => {
      window.removeEventListener(PLAY_SOLUTION_EVENT, onPlay);
      window.clearTimeout(timer.current);
    };
  }, [solve]);

  // The first time the board comes into view it is laid out, then the position is set up on it.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      entrance.current = gsap
        .timeline({ scrollTrigger: { trigger: boardRef.current, start: "top 85%", once: true } })
        .from("[data-square]", {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: { grid: [8, 8], from: "start", amount: 0.6 },
          clearProps: "opacity",
        })
        .from(
          "[data-square] svg",
          {
            autoAlpha: 0,
            yPercent: -35,
            duration: 0.3,
            ease: "power2.in",
            stagger: 0.07,
            clearProps: "opacity,visibility,transform",
          },
          0.4,
        );
    },
    { scope: rootRef },
  );

  // Pieces travel between squares instead of reappearing; the board state has already changed.
  useGSAP(
    () => {
      const move = slide.current;
      slide.current = null;
      if (!move || !boardRef.current || prefersReducedMotion()) return;

      const at = (square: string) =>
        boardRef.current!.querySelector<HTMLElement>(`[data-square="${square}"]`)!;
      const { x, y } = squareDelta(move.from, move.to);
      const size = boardRef.current.clientWidth / 8;
      const landing = at(move.to);

      entrance.current?.progress(1);
      const tl = gsap
        .timeline()
        .set(landing, { zIndex: 1 })
        .from(landing.querySelector("svg"), {
          x: -x * size,
          y: -y * size,
          duration: 0.3 + 0.04 * Math.hypot(x, y),
          ease: "power3.inOut",
        })
        .set(landing, { clearProps: "zIndex" });

      if (move.kind === "attempt") {
        tl.from("[data-annotation]", { opacity: 0, y: 3, duration: 0.3 }, "-=0.05").fromTo(
          "[data-status]",
          { x: 0 },
          { keyframes: { x: [-4, 3, -2, 0] }, duration: 0.4, ease: "power1.inOut" },
          "<",
        );
      }
      if (move.kind === "retract" && START[move.from]) {
        // The captured piece returns as the attacker withdraws.
        tl.from(at(move.from).querySelector("svg"), { opacity: 0, scale: 0.85, duration: 0.35 }, "-=0.2");
      }
      if (move.kind === "mate") tl.add(mateSequence(), "-=0.05");
      if (move.kind === "reset") {
        // The toppled king is stood back up for the next game.
        gsap.to(at(MATED_KING).querySelector("svg"), {
          rotation: 0,
          duration: 0.4,
          ease: "power2.out",
          clearProps: "transform",
        });
      }
    },
    { dependencies: [attempt, solved], scope: rootRef },
  );

  // The hint is drawn: the rook's line toward the black king, and its own king in the way.
  useGSAP(
    () => {
      if (!hinted || prefersReducedMotion()) return;
      gsap
        .timeline({ delay: 0.6 })
        .fromTo("[data-hint]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.7, ease: "power2.inOut" })
        .fromTo("[data-hint-block]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.45 }, "-=0.2")
        .call(() => {
          const king = boardRef.current?.querySelector(`[data-square="${SOLUTION.from}"] svg`);
          if (!king) return;
          gsap.to(king, {
            keyframes: [
              { yPercent: -14, duration: 0.16, ease: "power2.out" },
              { yPercent: 0, duration: 0.14, ease: "power2.in" },
              { yPercent: -8, duration: 0.12, ease: "power2.out" },
              { yPercent: 0, duration: 0.12, ease: "power2.in" },
            ],
            clearProps: "transform",
          });
        }, [], "+=0.45");
    },
    { dependencies: [hinted], scope: rootRef },
  );

  useGSAP(
    () => {
      if (!selected || prefersReducedMotion()) return;
      gsap.from("[data-selected]", { opacity: 0, scale: 0.75, duration: 0.25, ease: "power2.out" });
    },
    { dependencies: [selected], scope: rootRef },
  );

  function activate(square: string) {
    if (solved || attempt) return;
    const piece = START[square];
    if (piece && isWhite(piece)) {
      setSelected(selected === square ? null : square);
      setBlunder(null);
      return;
    }
    if (!selected) return;
    if (isSolution(selected, square)) {
      solve();
      return;
    }
    const from = selected;
    slide.current = { from, to: square, kind: "attempt" };
    setAttempt({ from, to: square });
    setBlunder(describeMove(START, from, square));
    setMisses((count) => count + 1);
    setSelected(null);
    timer.current = window.setTimeout(() => {
      slide.current = { from: square, to: from, kind: "retract" };
      setAttempt(null);
    }, RETRACT_MS);
  }

  function reset() {
    slide.current = { from: SOLUTION.to, to: SOLUTION.from, kind: "reset" };
    setSolved(false);
    setBlunder(null);
    setMisses(0);
    setSelected(null);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const delta = ARROWS[event.key];
    if (!delta) return;
    event.preventDefault();
    const index = squares.indexOf(focus);
    const column = index % 8;
    if ((delta === -1 && column === 0) || (delta === 1 && column === 7)) return;
    const next = squares[index + delta];
    if (!next) return;
    setFocus(next);
    boardRef.current?.querySelector<HTMLButtonElement>(`[data-square="${next}"]`)?.focus();
  }

  const selectedPiece = selected ? START[selected] : undefined;

  return (
    <div ref={rootRef} className="mx-auto w-full max-w-[24rem] lg:max-w-none">
      <div className="flex items-baseline justify-between font-mono text-[11px] tracking-[0.06em] text-ink-muted">
        <p>Black threatens mate</p>
        <p>{solved ? "1–0" : "White to move"}</p>
      </div>

      <div
        ref={boardRef}
        role="group"
        aria-label="Chess puzzle. White to move and mate in one; black threatens mate."
        aria-describedby="endgame-status"
        onKeyDown={onKeyDown}
        className="relative mt-3 grid aspect-square grid-cols-8 grid-rows-8 border border-hairline"
      >
        {squares.map((square, i) => {
          const piece = board[square];
          const dark = (Math.floor(i / 8) + (i % 8)) % 2 === 1;
          const playable = !solved && piece !== undefined && isWhite(piece);
          return (
            <button
              key={square}
              type="button"
              data-square={square}
              tabIndex={square === focus ? 0 : -1}
              aria-label={`${describeSquare(board, square)}${selected === square ? ", selected" : ""}`}
              onClick={() => {
                setFocus(square);
                activate(square);
              }}
              className={`relative flex items-center justify-center focus-visible:outline-offset-[-3px] ${
                dark ? "bg-board-dark" : ""
              } ${playable ? "cursor-pointer" : "cursor-default"}`}
            >
              {solved && (square === SOLUTION.from || square === SOLUTION.to) && (
                <span aria-hidden data-highlight className="absolute inset-0 bg-ink/[0.07]" />
              )}
              {selected === square && (
                <span aria-hidden data-selected className="absolute inset-[3px] border border-ink" />
              )}
              {solved && square === MATED_KING && (
                <span aria-hidden data-mated className="absolute inset-[3px] border border-crimson" />
              )}
              {piece && <PieceIcon piece={piece} className="relative size-[84%]" />}
            </button>
          );
        })}

        {/* Annotations live outside the buttons so each square's name is only its aria-label. */}
        <div aria-hidden className="pointer-events-none absolute inset-0 grid grid-cols-8 grid-rows-8">
          {squares.map((square, i) => (
            <span key={square} className="relative">
              {i % 8 === 0 && (
                <span className="absolute top-0.5 left-1 font-mono text-[8px] leading-none text-ink-muted">
                  {8 - Math.floor(i / 8)}
                </span>
              )}
              {i >= 56 && (
                <span className="absolute right-1 bottom-0.5 font-mono text-[8px] leading-none text-ink-muted">
                  {FILES[i % 8]}
                </span>
              )}
              {attempt?.to === square && (
                <span
                  data-annotation
                  className="absolute top-1 right-1 font-mono text-[10px] leading-none text-ink"
                >
                  ??
                </span>
              )}
            </span>
          ))}
        </div>

        {/* Drawn at rest: the line of attack stays and the sigil has already faded. */}
        {solved && (
          <svg
            aria-hidden
            viewBox="0 0 8 8"
            className="pointer-events-none absolute inset-0 size-full"
            style={{
              fill: "none",
              stroke: "var(--accent-crimson)",
              strokeWidth: SIGIL_STROKE,
              strokeLinecap: "round",
              strokeLinejoin: "round",
            }}
          >
            <path
              data-check
              d={`M${center(CHECK.from)} L${center(CHECK.to)}`}
              pathLength={1}
              strokeDasharray={1}
            />
            <g data-sigil opacity={0}>
              {SIGIL.map((d) => (
                <path key={d} d={d} pathLength={1} strokeDasharray={1} />
              ))}
            </g>
          </svg>
        )}

        {hinted && (
          <svg
            aria-hidden
            viewBox="0 0 8 8"
            className="pointer-events-none absolute inset-0 size-full"
            style={{
              fill: "none",
              stroke: "var(--accent-crimson)",
              strokeWidth: SIGIL_STROKE,
              strokeLinecap: "round",
            }}
          >
            <path
              data-hint
              d={`M${center(CHECK.from)} L${center(CHECK.to)}`}
              pathLength={1}
              strokeDasharray={1}
              opacity={0.5}
            />
            <rect
              data-hint-block
              x={FILES.indexOf(SOLUTION.from[0]) + 0.1}
              y={8 - Number(SOLUTION.from[1]) + 0.1}
              width={0.8}
              height={0.8}
              pathLength={1}
              strokeDasharray={1}
            />
          </svg>
        )}
      </div>

      <div id="endgame-status" aria-live="polite" className="mt-6 min-h-[8.5rem]">
        {solved ? (
          <>
            <blockquote
              data-verdict
              className="font-serif text-xl leading-snug text-ink italic text-balance sm:text-2xl"
            >
              “If the king doesn’t move, then his subjects won’t follow.”
            </blockquote>
            <div
              data-verdict
              className="mt-4 flex items-center justify-between gap-4 font-mono text-[11px] tracking-[0.06em] text-ink-muted"
            >
              <p>
                1. {SOLUTION.san} <span aria-hidden>·</span> Lelouch vi Britannia, Code Geass
              </p>
              <button
                type="button"
                onClick={reset}
                className="transition-colors duration-200 hover:text-ink"
              >
                Reset
              </button>
            </div>
          </>
        ) : (
          <>
            <p data-status className="font-serif text-xl text-ink sm:text-2xl">
              {blunder ? `${blunder}??` : "White to move. Mate in one."}
            </p>
            <p className="mt-2 font-mono text-[11px] tracking-[0.06em] text-ink-muted">
              {blunder
                ? misses >= HINT_AFTER
                  ? `Hint: the rook on ${CHECK.from} is waiting for someone to lead.`
                  : "Not this time. The position resets."
                : selectedPiece
                  ? `${capitalize(PIECE_NAMES[selectedPiece.toUpperCase()])} on ${selected} selected. Choose its square.`
                  : "Select a piece, then its square."}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
