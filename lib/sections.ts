/** The page reads as one game, from opening to endgame. */
export const sections = [
  { id: "opening", index: "01", name: "Opening", note: "Position and principles." },
  { id: "record", index: "02", name: "Record", note: "Where I've played." },
  { id: "moves", index: "03", name: "Selected Moves", note: "Development with intent." },
  { id: "arsenal", index: "04", name: "Arsenal", note: "Every piece has a square." },
  { id: "endgame", index: "05", name: "Endgame", note: "The king moves first." },
] as const;

export type Section = (typeof sections)[number];
export type SectionId = Section["id"];

export const getSection = (id: SectionId) => sections.find((s) => s.id === id)!;

/** Numbers an item within a section: the 2nd item of section 03 is "3.2". */
export const itemIndex = (id: SectionId, i: number) => `${Number(getSection(id).index)}.${i + 1}`;
