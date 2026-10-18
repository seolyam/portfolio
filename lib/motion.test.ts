import { describe, expect, it } from "vitest";
import { checker } from "./motion";

describe("checker", () => {
  it("lays out cols × rows tiles in reading order", () => {
    const tiles = checker(8, 8);
    expect(tiles).toHaveLength(64);
    expect(tiles[0]).toMatchObject({ row: 0, col: 0 });
    expect(tiles[9]).toMatchObject({ row: 1, col: 1 });
    expect(checker(5, 2).at(-1)).toMatchObject({ row: 1, col: 4 });
  });

  it("colours squares like a board seen from white: a8 light, b8 and a1 dark, e4 light", () => {
    const board = checker(8, 8);
    const at = (file: number, rank: number) => board[(8 - rank) * 8 + file];
    expect(at(0, 8).dark).toBe(false);
    expect(at(1, 8).dark).toBe(true);
    expect(at(0, 1).dark).toBe(true);
    expect(at(4, 4).dark).toBe(false);
  });

  it("measures each tile's distance in moves from an origin square, king-walk style", () => {
    const board = checker(8, 8);
    const e4 = { row: 4, col: 4 };
    expect(checker(8, 8, e4)[4 * 8 + 4].distance).toBe(0);
    expect(checker(8, 8, e4)[0].distance).toBe(4);
    expect(checker(8, 8, e4)[63].distance).toBe(3);
    expect(board[63].distance).toBe(7);
  });
});
