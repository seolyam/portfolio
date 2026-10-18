import { Chess, type Square } from "chess.js";
import { describe, expect, it } from "vitest";
import {
  CHECK,
  PUZZLE_FEN,
  SOLUTION,
  describeMove,
  isSolution,
  matchesSolution,
  movePiece,
  parsePlacement,
  squareAt,
  squareDelta,
  squares,
} from "./chess";

/** Every legal move in the position that ends the game in checkmate, in SAN. */
function matingMoves(fen: string) {
  const game = new Chess(fen);
  return game.moves().filter((san) => {
    game.move(san);
    const mate = game.isCheckmate();
    game.undo();
    return mate;
  });
}

const blackToMove = PUZZLE_FEN.replace(" w ", " b ");

describe("squareAt", () => {
  it("maps the top-left of the viewport to a8 and the bottom-right to h1", () => {
    expect(squareAt(0, 0, 800, 800)).toBe("a8");
    expect(squareAt(799, 799, 800, 800)).toBe("h1");
  });

  it("maps the viewport into an 8x8 grid from white's perspective", () => {
    expect(squareAt(450, 450, 800, 800)).toBe("e4");
    expect(squareAt(150, 50, 800, 800)).toBe("b8");
    expect(squareAt(1200, 300, 1600, 900)).toBe("g6");
  });

  it("clamps positions outside the viewport to the board edge", () => {
    expect(squareAt(-10, 900, 800, 800)).toBe("a1");
    expect(squareAt(800, 0, 800, 800)).toBe("h8");
  });
});

describe("squareDelta", () => {
  it("counts files rightward and ranks downward, as the board is drawn", () => {
    expect(squareDelta(SOLUTION.from, SOLUTION.to)).toEqual({ x: 0, y: 1 });
    expect(squareDelta("c4", "d5")).toEqual({ x: 1, y: -1 });
    expect(squareDelta("a1", "h8")).toEqual({ x: 7, y: -7 });
  });

  it("is zero for a square to itself and mirrors when reversed", () => {
    expect(squareDelta("e4", "e4")).toEqual({ x: 0, y: 0 });
    expect(squareDelta("d2", "d8")).toEqual({ x: 0, y: -6 });
    expect(squareDelta("d8", "d2")).toEqual({ x: 0, y: 6 });
  });
});

describe("squares", () => {
  it("lists all 64 squares rank 8 to 1, file a to h", () => {
    expect(squares).toHaveLength(64);
    expect(squares[0]).toBe("a8");
    expect(squares[7]).toBe("h8");
    expect(squares[63]).toBe("h1");
  });
});

describe("puzzle position", () => {
  const board = parsePlacement(PUZZLE_FEN);

  it("is legal, with white to move and neither king in check", () => {
    expect(new Chess(PUZZLE_FEN).isCheck()).toBe(false);
    expect(new Chess(blackToMove).isCheck()).toBe(false);
  });

  it("parses to the same placement chess.js reads", () => {
    const game = new Chess(PUZZLE_FEN);
    for (const square of squares) {
      const piece = game.get(square as Square);
      const expected = piece && (piece.color === "w" ? piece.type.toUpperCase() : piece.type);
      expect(board[square]).toBe(expected);
    }
  });

  it("has exactly one mate in one, and it is a king move", () => {
    expect(matingMoves(PUZZLE_FEN)).toEqual([SOLUTION.san]);
    expect(board[SOLUTION.from]).toBe("K");
  });

  it("mates by discovered check: the king steps aside and the rook strikes", () => {
    const game = new Chess(PUZZLE_FEN);
    game.move({ from: SOLUTION.from, to: SOLUTION.to });
    expect(game.isCheckmate()).toBe(true);
    expect(board[CHECK.from]).toBe("R");
    expect(board[CHECK.to]).toBe("k");
    expect(game.attackers(CHECK.to as Square, "w")).toEqual([CHECK.from]);
  });

  it("is lost for white if the king stays put: black threatens mate", () => {
    expect(matingMoves(blackToMove).length).toBeGreaterThan(0);
  });
});

describe("isSolution", () => {
  it("accepts only Kf8-f7", () => {
    expect(isSolution("f8", "f7")).toBe(true);
    expect(isSolution("f8", "e7")).toBe(false);
    expect(isSolution("e8", "e7")).toBe(false);
    expect(isSolution("c4", "d5")).toBe(false);
  });
});

describe("matchesSolution", () => {
  it.each(["Kf7#", "kf7", "Kf7", "Kf8f7", "Kf8-f7#", "f8f7", "f8-f7", " Kf7# ", "Kf7+"])(
    "accepts %j",
    (input) => expect(matchesSolution(input)).toBe(true),
  );

  it.each(["", "f7", "Ke7", "Kg8", "Kxf7", "Bxd5", "Re7", "Kf7#x"])("rejects %j", (input) =>
    expect(matchesSolution(input)).toBe(false),
  );
});

describe("movePiece", () => {
  it("returns a new board with the piece relocated and the original untouched", () => {
    const board = parsePlacement(PUZZLE_FEN);
    const next = movePiece(board, "c4", "d5");
    expect(next.d5).toBe("B");
    expect(next.c4).toBeUndefined();
    expect(Object.keys(next)).toHaveLength(Object.keys(board).length - 1);
    expect(board.c4).toBe("B");
    expect(board.d5).toBe("n");
  });
});

describe("describeMove", () => {
  const board = parsePlacement(PUZZLE_FEN);

  it("writes long algebraic notation, marking captures with x", () => {
    expect(describeMove(board, "f8", "f7")).toBe("Kf8-f7");
    expect(describeMove(board, "c4", "d5")).toBe("Bc4xd5");
    expect(describeMove(board, "e8", "e1")).toBe("Re8-e1");
  });

  it("omits the letter for pawns", () => {
    expect(describeMove(board, "a2", "a4")).toBe("a2-a4");
  });
});
