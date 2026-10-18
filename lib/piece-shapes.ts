/** Geometric hairline chess set, drawn on a 40×40 grid with a shared plinth. */
export type PieceShape = {
  /** Filled outlines, drawn in the piece's colour. */
  body: string[];
  /** Filled circles as [cx, cy, r]. */
  dots?: [number, number, number][];
  /** Interior strokes, drawn in the opposing colour. */
  details?: string[];
  /** Interior points as [cx, cy, r], filled in the opposing colour. */
  marks?: [number, number, number][];
};

export const PLINTH = "M10 33 H30 V30.5 H10 Z";

export const PIECE_SHAPES: Record<"K" | "Q" | "R" | "B" | "N" | "P", PieceShape> = {
  P: {
    body: ["M14.5 30.5 L17 19.5 H23 L25.5 30.5 Z"],
    dots: [[20, 13.5, 4.5]],
  },
  R: {
    body: [
      "M12 30.5 L13.5 27 H26.5 L28 30.5 Z",
      "M15 27 V16 H25 V27 Z",
      "M13 16 V8.5 H16.5 V11 H18.5 V8.5 H21.5 V11 H23.5 V8.5 H27 V16 Z",
    ],
  },
  B: {
    body: [
      "M13 30.5 L15 26.5 H25 L27 30.5 Z",
      "M14.5 24.5 H25.5 V26.5 H14.5 Z",
      "M20 7.5 C25.5 11.5 27 17 23.5 24.5 H16.5 C13 17 14.5 11.5 20 7.5 Z",
    ],
    dots: [[20, 5.4, 1.6]],
    details: ["M22.4 12.4 L18.6 16.8"],
  },
  N: {
    body: [
      "M13 30.5 L15.5 21 L11.5 18.8 L11 15.6 L18 9.5 L19 6 L21.5 8.5 C27.5 9.5 29.5 15.5 28.5 22 L27.5 30.5 Z",
    ],
    marks: [[17.6, 12.8, 0.95]],
  },
  Q: {
    body: [
      "M12.5 30.5 L14 26.5 H26 L27.5 30.5 Z",
      "M14 26.5 L10.5 13 L13 19 L15.2 10.5 L17.6 18.5 L20 9 L22.4 18.5 L24.8 10.5 L27 19 L29.5 13 L26 26.5 Z",
    ],
    dots: [
      [10.5, 11.4, 1.4],
      [15.2, 8.9, 1.4],
      [20, 7.4, 1.4],
      [24.8, 8.9, 1.4],
      [29.5, 11.4, 1.4],
    ],
    details: ["M14.8 23.5 H25.2"],
  },
  K: {
    body: [
      "M12.5 30.5 L14 26.5 H26 L27.5 30.5 Z",
      "M19 3.5 H21 V6.5 H24 V8.5 H21 V14.5 H19 V8.5 H16 V6.5 H19 Z",
      "M14 26.5 L11.5 16.5 Q20 12.5 28.5 16.5 L26 26.5 Z",
    ],
    details: ["M14.8 23.5 H25.2"],
  },
};
