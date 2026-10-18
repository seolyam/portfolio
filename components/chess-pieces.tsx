import { isWhite, type Piece } from "@/lib/chess";
import { PIECE_SHAPES, PLINTH } from "@/lib/piece-shapes";

const LINE = { vectorEffect: "non-scaling-stroke" } as const;

export function PieceIcon({ piece, className }: { piece: Piece; className?: string }) {
  const shape = PIECE_SHAPES[piece.toUpperCase() as keyof typeof PIECE_SHAPES];
  const fill = isWhite(piece) ? "var(--piece-white)" : "var(--piece-black)";
  const detail = isWhite(piece) ? "var(--piece-black)" : "var(--piece-white)";

  return (
    <svg
      viewBox="0 0 40 40"
      aria-hidden
      className={className}
      style={{ fill, stroke: "var(--text-primary)", strokeWidth: 1, strokeLinejoin: "round" }}
    >
      {[PLINTH, ...shape.body].map((d) => (
        <path key={d} d={d} {...LINE} />
      ))}
      {shape.dots?.map(([cx, cy, r]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} {...LINE} />
      ))}
      {shape.details?.map((d) => (
        <path key={d} d={d} style={{ fill: "none", stroke: detail }} {...LINE} />
      ))}
      {shape.marks?.map(([cx, cy, r]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} style={{ fill: detail, stroke: "none" }} />
      ))}
    </svg>
  );
}
