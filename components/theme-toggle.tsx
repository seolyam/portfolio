"use client";

import { useSyncExternalStore } from "react";
import { getTheme, subscribeTheme, toggleTheme } from "@/lib/theme";

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeTheme, getTheme, () => "day");

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={theme === "night"}
      className="flex items-center gap-2.5 border-l border-hairline px-4 font-mono text-[11px] tracking-[0.06em] text-ink-muted transition-colors duration-200 hover:text-ink night:text-ink"
    >
      <svg
        viewBox="0 0 12 12"
        aria-hidden
        className="size-3 transition-transform duration-500 ease-quiet night:rotate-180"
      >
        <circle cx="6" cy="6" r="5.25" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M6 0.75 A5.25 5.25 0 0 0 6 11.25 Z" fill="currentColor" />
      </svg>
      <span className="sr-only sm:not-sr-only">Night</span>
      <span className="sr-only"> Protocol</span>
    </button>
  );
}
