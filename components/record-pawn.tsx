"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { PieceIcon } from "./chess-pieces";

const SIZE = 24;

/** Distance from an ancestor's top through the offset chain, so in-flight transforms don't skew it. */
function offsetWithin(el: HTMLElement, ancestor: HTMLElement) {
  let top = 0;
  for (let node: HTMLElement | null = el; node && node !== ancestor; node = node.offsetParent as HTMLElement | null) {
    top += node.offsetTop;
  }
  return top;
}

/**
 * The record's pawn. It stands on the left rail and advances a rank for each entry as the
 * reader goes down the record; on the last rank, the degree, it promotes to a queen.
 * Scrolling back takes the moves back, like stepping through a game.
 */
export function RecordPawn() {
  const root = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const piece = root.current!;
      const section = piece.closest("section")!;
      const ranks = gsap.utils.toArray<HTMLElement>("[data-rank]", section);
      const last = ranks.length - 1;
      const reduced = prefersReducedMotion();
      const top = (i: number) => {
        const mark = ranks[i].querySelector<HTMLElement>("[data-rank-mark]") ?? ranks[i];
        return offsetWithin(mark, section) + mark.offsetHeight / 2 - SIZE / 2;
      };

      gsap.set("[data-queen]", { scaleY: 0 });
      gsap.set("[data-burst], [data-note]", { autoAlpha: 0 });
      const promotion = gsap
        .timeline({ paused: true })
        .to("[data-pawn]", { scaleY: 0, duration: 0.18, ease: "power2.in" })
        .to("[data-queen]", { scaleY: 1, duration: 0.45, ease: "back.out(2.2)" })
        .set("[data-burst]", { autoAlpha: 1, scale: 0.6 }, "<")
        .to("[data-burst]", { autoAlpha: 0, scale: 2.4, duration: 0.8, ease: "power2.out" }, "<")
        .fromTo("[data-note]", { x: 6 }, { autoAlpha: 1, x: 0, duration: 0.4 }, "<0.1");

      let at = -1;
      const go = (i: number) => {
        if (i === at) return;
        const promoting = i === last;
        const demoting = at === last;
        const duration = reduced || at < 0 ? 0 : 0.6;
        at = i;
        gsap.to(piece, { y: top(i), duration, ease: "power3.inOut", overwrite: "auto" });
        if (promoting) {
          gsap.to(promotion, {
            progress: 1,
            duration: reduced ? 0 : promotion.duration(),
            delay: duration * 0.8,
            ease: "none",
            overwrite: true,
          });
        } else if (demoting) {
          gsap.to(promotion, { progress: 0, duration: reduced ? 0 : 0.3, ease: "none", overwrite: true });
        }
      };

      // The pawn is set down on its first rank as the record comes into view.
      ScrollTrigger.create({
        trigger: ranks[0],
        start: "top 85%",
        once: true,
        onEnter: () => {
          if (at < 0) go(0);
          gsap.fromTo(
            piece,
            { autoAlpha: 0, yPercent: -40 },
            { autoAlpha: 1, yPercent: 0, duration: reduced ? 0 : 0.34, ease: "power2.in" },
          );
        },
      });
      ranks.forEach((rank, i) =>
        ScrollTrigger.create({
          trigger: rank,
          start: "top 60%",
          onEnter: () => go(i),
          onLeaveBack: () => go(Math.max(0, i - 1)),
        }),
      );

      const realign = () => at >= 0 && gsap.set(piece, { y: top(at) });
      ScrollTrigger.addEventListener("refresh", realign);
      return () => ScrollTrigger.removeEventListener("refresh", realign);
    },
    { scope: root },
  );

  return (
    <span
      ref={root}
      aria-hidden
      className="pointer-events-none invisible absolute top-0 -left-3 z-10 size-6"
    >
      <span data-pawn className="absolute inset-0 origin-[50%_82%]">
        <PieceIcon piece="P" className="size-full" />
      </span>
      <span data-queen className="absolute inset-0 origin-[50%_82%]">
        <PieceIcon piece="Q" className="size-full" />
      </span>
      <span data-burst className="absolute -inset-1 rounded-full border border-crimson opacity-0" />
      <span
        data-note
        className="absolute top-1/2 right-full mr-1.5 hidden -translate-y-1/2 font-mono text-[10px] tracking-[0.06em] text-crimson opacity-0 lg:block"
      >
        =Q
      </span>
    </span>
  );
}
