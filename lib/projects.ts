import {
  CalendarDays,
  Gamepad2,
  Images,
  Users,
  type LucideIcon,
} from "lucide-react";

export type TextSegment = {
  text: string;
  bold?: boolean;
};

export type Metric = {
  value: string;
  label: string;
};

export type ProjectLink = {
  url: string;
  label: string;
};

export type Project = {
  title: string;
  typeIcon: LucideIcon | LucideIcon[];
  repositoryUrl: string | ProjectLink[];
  description: TextSegment[];
  metrics?: Metric[];
  stack: string[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "Transmorpher Suite",
    typeIcon: [Images, Gamepad2],
    repositoryUrl: [
      { url: "https://github.com/seolyam/transmorpher-hub", label: "Transmorpher Hub" },
      { url: "https://github.com/Kirazul/Transmorpher", label: "Transmorpher Addon" }
    ],
    description: [
      { text: "A full client-side appearance and morphing suite for " },
      { text: "World of Warcraft: WotLK (3.3.5a)", bold: true },
      { text: ", alongside a community-driven web gallery for sharing transmog loadouts." },
    ],
    stack: ["Next.js", "Supabase", "Lua", "WoW API"],
    featured: true,
  },
  {
    title: "GDGOC Event Platform",
    typeIcon: CalendarDays,
    repositoryUrl: "https://github.com/seolyam/event",
    description: [
      { text: "Official event and project showcase platform for " },
      { text: "Google Developer Groups on Campus USLS", bold: true },
      { text: "." },
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Drizzle ORM"],
  },
  {
    title: "Umamin",
    typeIcon: Users,
    repositoryUrl: "https://github.com/omsimos/umamin",
    description: [
      { text: "A social platform for sending and receiving encrypted anonymous messages. Reached over " },
      { text: "2.6 million users", bold: true },
      { text: " with more than " },
      { text: "14.5 million page visits", bold: true },
      { text: "." },
    ],
    metrics: [
      { value: "2.6M+", label: "users" },
      { value: "14.5M", label: "page visits" },
    ],
    stack: ["Next.js", "TypeScript", "Supabase"],
  },
];
