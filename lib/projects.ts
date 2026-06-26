export type TextSegment = {
  text: string;
  bold?: boolean;
};

export type Metric = {
  value: string;
  label: string;
};

export type SubProject = {
  title: string;
  repositoryUrl: string;
  description: string;
  stack: string[];
};

export type Project = {
  title: string;
  logoSrc: string;
  repositoryUrl?: string;
  description?: TextSegment[];
  metrics?: Metric[];
  stack?: string[];
  featured?: boolean;
  subItems?: SubProject[];
};

export const projects: Project[] = [
  {
    title: "Transmorpher Suite",
    logoSrc: "/images/transmorpher.png",
    subItems: [
      {
        title: "Transmorpher",
        repositoryUrl: "https://github.com/Kirazul/Transmorpher",
        description:
          "A full client-side appearance and morphing suite for World of Warcraft: Wrath of the Lich King 3.3.5a.",
        stack: ["Lua", "C++"],
      },
      {
        title: "Transmorpher Hub",
        repositoryUrl: "https://github.com/seolyam/transmorpher-hub",
        description:
          "A community-driven web gallery built with Next.js and Supabase for sharing WotLK (3.3.5a) transmog loadouts.",
        stack: ["TypeScript", "React", "Tailwind CSS"],
      },
    ],
    metrics: [
      { value: "100+", label: "users" },
      { value: "Still", label: "growing" },
    ],
    featured: true,
  },
  {
    title: "GDGOC Event Platform",
    logoSrc: "/images/gdg-logo.png",
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
    logoSrc: "/images/umamin.png",
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
