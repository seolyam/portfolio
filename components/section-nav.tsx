"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { sections, type SectionId } from "@/lib/sections";

const MARK = 5;

/**
 * Section links with a crimson square under the section in the middle of the viewport.
 * When the section changes the square is picked up and set down on the next link, the
 * way a piece is moved, rather than sliding along the rank.
 */
export function SectionNav() {
  const [active, setActive] = useState<SectionId>(sections[0].id);
  const nav = useRef<HTMLElement>(null);
  const marker = useRef<HTMLSpanElement>(null);
  const placed = useRef<SectionId | null>(null);

  const place = (id: SectionId, hop: boolean) => {
    const link = nav.current?.querySelector<HTMLElement>(`[href="#${id}"]`);
    if (!link || !marker.current) return;
    const x = link.offsetLeft + link.offsetWidth / 2 - MARK / 2;
    if (!hop || prefersReducedMotion()) {
      gsap.set(marker.current, { x, y: 0, autoAlpha: 1, overwrite: true });
      return;
    }
    gsap.to(marker.current, { x, duration: 0.5, ease: "power3.inOut", overwrite: "auto" });
    gsap.to(marker.current, {
      keyframes: [
        { y: -8, duration: 0.25, ease: "sine.out" },
        { y: 0, duration: 0.25, ease: "sine.in" },
      ],
      overwrite: "auto",
    });
  };

  useGSAP(() => {
    for (const { id } of sections) {
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: "top center",
        end: "bottom center",
        onToggle: (self) => self.isActive && setActive(id),
      });
    }
    // Link widths change across breakpoints (the xl index appears), so re-measure on refresh.
    const remeasure = () => placed.current && place(placed.current, false);
    ScrollTrigger.addEventListener("refresh", remeasure);
    return () => ScrollTrigger.removeEventListener("refresh", remeasure);
  });

  useGSAP(
    () => {
      place(active, placed.current !== null);
      placed.current = active;
    },
    { dependencies: [active] },
  );

  return (
    <nav ref={nav} aria-label="Sections" className="relative hidden items-center gap-5 lg:flex xl:gap-7">
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          aria-current={section.id === active ? "true" : undefined}
          className="font-mono text-[11px] tracking-[0.06em] text-ink-muted transition-colors duration-200 hover:text-ink aria-[current=true]:text-ink"
        >
          <span className="mr-1 hidden xl:inline">{section.index}</span> {section.name}
        </a>
      ))}
      <span
        ref={marker}
        aria-hidden
        className="pointer-events-none invisible absolute top-1/2 left-0 mt-[11px] size-[5px] bg-crimson"
      />
    </nav>
  );
}
