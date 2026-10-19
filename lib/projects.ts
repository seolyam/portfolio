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
  liveUrl?: string;
  description: string;
  stack: string[];
};

export type ProjectStatus = "Live" | "In development" | "Archived";

/** A first-viewport capture of the live site, shown as a figure plate. */
export type Plate = {
  src: string;
  alt: string;
};

export type Project = {
  title: string;
  logoSrc: string;
  role: string;
  status: ProjectStatus;
  repositoryUrl?: string;
  liveUrl?: string;
  description?: TextSegment[];
  metrics?: Metric[];
  stack?: string[];
  featured?: boolean;
  plate?: Plate;
  subItems?: SubProject[];
};

export const projects: Project[] = [
  {
    title: "Art N Me",
    logoSrc: "/images/artnme-logo.jpg",
    role: "Creator",
    status: "Live",
    repositoryUrl: "https://github.com/seolyam/artnme",
    liveUrl: "https://artnme.vercel.app",
    description: [
      { text: "Engineered a full-stack order management system and public site for a local printing business, streamlining shop operations and customer quote requests." },
      { text: "\n\nDeveloped a 3D interactive apparel customizer utilizing " },
      { text: "React Three Fiber and Three.js", bold: true },
      { text: ", enabling users to upload graphics, configure colors, and export 360° designs." },
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Drizzle ORM", "Three.js"],
    featured: true,
    plate: {
      src: "/images/artnme-plate.jpg",
      alt: "The Art N Me homepage: a digital print studio hero beside a jersey proof.",
    },
  },
  {
    title: "Transmorpher Suite",
    logoSrc: "/images/transmorpher.png",
    role: "Contributor / Hub creator",
    status: "Live",
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
        liveUrl: "https://transmorpher-hub.vercel.app",
        description:
          "A community gallery for sharing WotLK (3.3.5a) transmog loadouts, with OAuth sign-in and social features.",
        stack: ["Next.js", "TypeScript", "Supabase"],
      },
    ],
    metrics: [{ value: "100+", label: "users" }],
  },
  {
    title: "GDGOC Event Platform",
    logoSrc: "/images/gdg-logo.png",
    role: "Lead developer",
    status: "Live",
    repositoryUrl: "https://github.com/seolyam/event",
    liveUrl: "https://gdgoc-event.vercel.app",
    description: [
      { text: "Official event and project showcase platform for " },
      { text: "Google Developer Groups on Campus USLS", bold: true },
      { text: ", serving a community of more than 1,000 participants." },
    ],
    metrics: [{ value: "1,000+", label: "participants" }],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Umamin",
    logoSrc: "/images/umamin.png",
    role: "QA / Contributor",
    status: "Live",
    repositoryUrl: "https://github.com/omsimos/umamin",
    liveUrl: "https://umamin.link",
    description: [
      { text: "An open-source platform for AES-256 encrypted anonymous messages, started in the Philippines in 2022. I ran QA and shipped feature updates alongside the founders as it reached almost " },
      { text: "3 million users", bold: true },
      { text: " and " },
      { text: "14.5 million page visits", bold: true },
      { text: "." },
    ],
    metrics: [
      { value: "~3M", label: "users" },
      { value: "17.5M+", label: "page visits" },
    ],
    stack: ["TypeScript", "React", "Drizzle ORM", "Turso"],
  },
];
