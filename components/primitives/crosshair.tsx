const CORNERS = {
  bl: "-left-[6px] -bottom-[5px]",
  br: "-right-[6px] -bottom-[5px]",
} as const;

/** A "+" registered on the intersection of a section's bottom border and the side rail. */
export function Crosshair({ corner }: { corner: keyof typeof CORNERS }) {
  return (
    <span
      aria-hidden
      data-crosshair
      className={`pointer-events-none absolute z-10 size-[11px] ${CORNERS[corner]}`}
    >
      <span className="absolute inset-y-0 left-[5px] w-px bg-hairline-strong" />
      <span className="absolute inset-x-0 top-[5px] h-px bg-hairline-strong" />
    </span>
  );
}
