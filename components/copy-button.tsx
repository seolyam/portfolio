"use client";

import { useEffect, useRef, useState } from "react";

export function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1600);
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="shrink-0 px-3 font-mono text-[11px] tracking-[0.06em] text-ink-muted transition-colors duration-200 hover:text-ink"
    >
      <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
      <span className="sr-only"> {label}</span>
    </button>
  );
}
