export type Piece =
  | "K" | "Q" | "R" | "B" | "N" | "P"
  | "k" | "q" | "r" | "b" | "n" | "p";

export type Board = Partial<Record<string, Piece>>;

export const FILES = "abcdefgh";

/** All 64 squares in reading order: rank 8 to 1, file a to h. */
export const squares: string[] = Array.from(
  { length: 64 },
  (_, i) => `${FILES[i % 8]}${8 - Math.floor(i / 8)}`,
);

/**
 * White is far behind on material and black threatens Qxg2#, but the rook on h1
 * can't strike while its own king hides in front of it on h2.
 * The king steps forward out of shelter, and the rook follows with mate.
 */
export const PUZZLE_FEN = "6rk/pb4p1/2q3p1/8/8/8/PP3PPK/6NR w - - 0 1";

export const SOLUTION = { from: "h2", to: "g3", san: "Kg3#" } as const;

/** The discovered check the king's move unleashes: rook on h1 onto the king on h8. */
export const CHECK = { from: "h1", to: "h8" } as const;

/** Dispatched on window by the command menu to play the solution on the board. */
export const PLAY_SOLUTION_EVENT = "endgame:play";

const clamp = (n: number) => Math.min(7, Math.max(0, n));

/** Maps a point in a width×height plane onto an 8x8 board seen from white's side. */
export function squareAt(x: number, y: number, width: number, height: number) {
  const file = clamp(Math.floor((x / width) * 8));
  const rank = 8 - clamp(Math.floor((y / height) * 8));
  return `${FILES[file]}${rank}`;
}

/** Squares travelled from one square to another, in screen axes: files rightward, ranks downward. */
export function squareDelta(from: string, to: string) {
  return {
    x: FILES.indexOf(to[0]) - FILES.indexOf(from[0]),
    y: Number(from[1]) - Number(to[1]),
  };
}

export function parsePlacement(fen: string): Board {
  const board: Board = {};
  fen
    .split(" ")[0]
    .split("/")
    .forEach((row, r) => {
      let file = 0;
      for (const char of row) {
        if (/\d/.test(char)) {
          file += Number(char);
        } else {
          board[`${FILES[file]}${8 - r}`] = char as Piece;
          file += 1;
        }
      }
    });
  return board;
}

export const isWhite = (piece: Piece) => piece === piece.toUpperCase();

export function movePiece(board: Board, from: string, to: string): Board {
  const next = { ...board, [to]: board[from] };
  delete next[from];
  return next;
}

export const isSolution = (from: string, to: string) =>
  from === SOLUTION.from && to === SOLUTION.to;

/** Accepts the mating move as typed text: Kg3#, Kg3, Kh2-g3, h2g3… */
export const matchesSolution = (input: string) =>
  /^(k(h2)?-?g3|h2-?g3)[+#]?$/i.test(input.trim());

/** Long algebraic notation: Qc6xg2, Kh2-g3, a2-a4. */
export function describeMove(board: Board, from: string, to: string) {
  const piece = board[from];
  const letter = piece && piece.toUpperCase() !== "P" ? piece.toUpperCase() : "";
  return `${letter}${from}${board[to] ? "x" : "-"}${to}`;
}

export const PIECE_NAMES: Record<string, string> = {
  K: "king", Q: "queen", R: "rook", B: "bishop", N: "knight", P: "pawn",
};
