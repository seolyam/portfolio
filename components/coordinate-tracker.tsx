"use client";

import { useEffect, useRef } from "react";
import { squareAt } from "@/lib/chess";

/** Maps the cursor onto an invisible 8x8 board laid over the viewport. */
export function CoordinateTracker() {
  const readout = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;
    let x = 0;
    let y = 0;

    const paint = () => {
      frame = 0;
      const square = squareAt(x, y, window.innerWidth, window.innerHeight).toUpperCase();
      if (readout.current && readout.current.textContent !== square) {
        readout.current.textContent = square;
      }
    };

    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <span
      aria-hidden
      className="hidden items-center gap-1.5 border-l border-hairline px-4 font-mono text-[11px] tracking-[0.06em] text-ink-muted tabular-nums pointer-fine:flex"
    >
      POS <span>{"//"}</span>
      <span ref={readout} className="inline-block w-[2ch] text-ink">
        E4
      </span>
    </span>
  );
}
