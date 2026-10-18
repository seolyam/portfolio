"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { PLAY_SOLUTION_EVENT, SOLUTION, matchesSolution } from "@/lib/chess";
import { sections } from "@/lib/sections";
import { links, site } from "@/lib/site";
import { getTheme, subscribeTheme, toggleTheme } from "@/lib/theme";

type Command = {
  id: string;
  group: "Navigate" | "Actions" | "Links" | "Endgame";
  label: string;
  hint: string;
  keywords?: string;
  run: () => void;
};

const noSubscription = () => () => {};
const detectMac = () => /Mac|iPhone|iPad/.test(navigator.userAgent);

/** "Zero" — the ⌘K / Ctrl+K command palette, built on a native modal <dialog>. */
export function CommandMenu() {
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [notice, setNotice] = useState("");
  const theme = useSyncExternalStore(subscribeTheme, getTheme, () => "day");
  const isMac = useSyncExternalStore(noSubscription, detectMac, () => true);

  const open = useCallback(() => {
    if (dialog.current?.open) return;
    dialog.current?.showModal();
    input.current?.focus();
  }, []);

  const close = useCallback(() => dialog.current?.close(), []);

  const commands = useMemo<Command[]>(
    () => [
      ...sections.map((section) => ({
        id: section.id,
        group: "Navigate" as const,
        label: section.name,
        hint: section.index,
        run: () => {
          close();
          document.getElementById(section.id)?.scrollIntoView();
        },
      })),
      {
        id: "theme",
        group: "Actions",
        label: theme === "night" ? "Return to Day" : "Engage Night Protocol",
        hint: "Theme",
        keywords: "dark light mode toggle night day",
        run: () => {
          close();
          toggleTheme();
        },
      },
      {
        id: "copy-email",
        group: "Actions",
        label: "Copy email address",
        hint: site.email,
        keywords: "contact clipboard",
        run: () => {
          navigator.clipboard
            .writeText(site.email)
            .then(() => setNotice("Email copied to clipboard"))
            .catch(() => setNotice(site.email));
        },
      },
      {
        id: "write-email",
        group: "Actions",
        label: "Write an email",
        hint: "mailto",
        keywords: "contact message",
        run: () => {
          close();
          window.location.href = `mailto:${site.email}`;
        },
      },
      ...links.map((link) => ({
        id: link.id,
        group: "Links" as const,
        label: `Open ${link.label}`,
        hint: link.display,
        run: () => {
          close();
          window.open(link.href, "_blank", "noopener,noreferrer");
        },
      })),
    ],
    [theme, close],
  );

  const results = useMemo<Command[]>(() => {
    if (matchesSolution(query)) {
      return [
        {
          id: "play",
          group: "Endgame",
          label: `Play 1. ${SOLUTION.san}`,
          hint: "Checkmate",
          run: () => {
            close();
            window.dispatchEvent(new Event(PLAY_SOLUTION_EVENT));
          },
        },
      ];
    }
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    return commands.filter((command) => {
      const haystack = `${command.label} ${command.hint} ${command.group} ${command.keywords ?? ""}`.toLowerCase();
      return terms.every((term) => haystack.includes(term));
    });
  }, [query, commands, close]);

  const groups = useMemo(
    () =>
      results.reduce<{ name: Command["group"]; items: { command: Command; index: number }[] }[]>(
        (acc, command, index) => {
          const last = acc.at(-1);
          if (last?.name === command.group) last.items.push({ command, index });
          else acc.push({ name: command.group, items: [{ command, index }] });
          return acc;
        },
        [],
      ),
    [results],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (dialog.current?.open) close();
        else open();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    document.getElementById(`cmd-${results[active]?.id}`)?.scrollIntoView({ block: "nearest" });
  }, [active, results]);

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!results.length) return;
      const step = event.key === "ArrowDown" ? 1 : -1;
      setActive((i) => (i + step + results.length) % results.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      results[active]?.run();
    }
  }

  function reset() {
    setQuery("");
    setActive(0);
    setNotice("");
  }

  const activeId = results[active] ? `cmd-${results[active].id}` : undefined;

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        aria-keyshortcuts="Meta+K Control+K"
        className="flex items-center gap-2.5 border-l border-hairline px-4 font-mono text-[11px] tracking-[0.06em] text-ink-muted transition-colors duration-200 hover:text-ink"
      >
        Command
        <kbd className="hidden border border-hairline px-1.5 py-px font-mono text-[10px] pointer-fine:inline-block">
          {isMac ? "⌘" : "Ctrl"} K
        </kbd>
      </button>

      <dialog
        ref={dialog}
        aria-label="Command menu"
        onClose={reset}
        onClick={(event) => event.target === event.currentTarget && close()}
        className="command-menu mx-auto mt-[14vh] mb-auto w-[min(36rem,calc(100vw-2rem))] max-w-none border border-hairline bg-paper p-0 text-ink shadow-[0_32px_80px_-40px_rgba(0,0,0,0.45)]"
      >
        <div className="flex items-center gap-3 border-b border-hairline px-4">
          <span aria-hidden className="font-mono text-[11px] text-ink-muted">
            Z/
          </span>
          <input
            ref={input}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
              setNotice("");
            }}
            onKeyDown={onKeyDown}
            role="combobox"
            aria-label="Command"
            aria-expanded="true"
            aria-controls="command-list"
            aria-autocomplete="list"
            aria-activedescendant={activeId}
            placeholder="Search sections and actions — or play a move"
            spellCheck={false}
            autoComplete="off"
            className="h-12 min-w-0 flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-ink-muted"
          />
          <kbd className="hidden border border-hairline px-1.5 py-px font-mono text-[10px] text-ink-muted pointer-fine:inline-block">
            esc
          </kbd>
        </div>

        <div
          id="command-list"
          role="listbox"
          aria-label="Commands"
          className="max-h-[min(22rem,50vh)] overflow-y-auto py-2"
        >
          {groups.map((group) => (
            <div key={group.name} role="group" aria-labelledby={`cmd-group-${group.name}`}>
              <div
                id={`cmd-group-${group.name}`}
                className="px-4 pt-3 pb-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted"
              >
                {group.name}
              </div>
              {group.items.map(({ command, index }) => {
                const selected = index === active;
                return (
                  <div
                    key={command.id}
                    id={`cmd-${command.id}`}
                    role="option"
                    aria-selected={selected}
                    onMouseMove={() => setActive(index)}
                    onClick={command.run}
                    className={`relative flex cursor-pointer items-center justify-between gap-6 px-4 py-2.5 text-sm transition-colors duration-150 ${
                      selected ? "bg-stone text-ink" : "text-ink-muted"
                    }`}
                  >
                    {selected && (
                      <span aria-hidden className="absolute inset-y-0 left-0 w-0.5 bg-crimson" />
                    )}
                    <span>{command.label}</span>
                    <span className="truncate font-mono text-[11px] text-ink-muted">
                      {command.hint}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
          {!results.length && (
            <p className="px-4 py-6 font-mono text-[11px] text-ink-muted">
              No legal moves. Try another search.
            </p>
          )}
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-hairline px-4 py-2.5 font-mono text-[10.5px] tracking-[0.04em] text-ink-muted">
          <span aria-live="polite">{notice || "↑↓ move · ↵ play · esc resign"}</span>
          <span aria-hidden className="hidden sm:inline">
            ZERO
          </span>
        </div>
      </dialog>
    </>
  );
}
