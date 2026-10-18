export type Entry = {
  title: string;
  org: string;
  period: string;
  points: string[];
};

export const experience: Entry[] = [
  {
    title: "Web Development Lead",
    org: "Google Developer Groups on Campus, USLS",
    period: "Aug 2024 – 2026",
    points: [
      "Architected and built the chapter's web ecosystem with Next.js, TypeScript and Tailwind CSS, serving 1,000+ participants.",
      "Delivered internal tools and the project showcase end to end, from responsive interfaces to the services behind them.",
    ],
  },
  {
    title: "Open-Source Developer",
    org: "Independent",
    period: "Jul 2022 – Present",
    points: [
      "QA testing and feature work on Umamin, an anonymous messaging platform with 2.6M+ users, alongside its founders.",
      "Client-side scripts and automation tooling for the Skua and Transmorpher game frameworks, in Lua and C#, fixing core bugs with the repository founders.",
    ],
  },
];

export const education: Entry[] = [
  {
    title: "BS Information Technology",
    org: "University of St. La Salle",
    period: "Aug 2022 – Apr 2026",
    points: ["Magna Cum Laude, GWA 1.36 (96.4)"],
  },
  {
    title: "IT in Mobile App & Web Development",
    org: "STI West Negros University",
    period: "Jun 2020 – Aug 2022",
    points: ["Highest Honors, 98 average", "Research Colloquium 2022 champion"],
  },
];
