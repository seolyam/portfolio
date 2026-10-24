export type Entry = {
  title: string;
  org: string;
  period: string;
  points: string[];
};

export const experience: Entry[] = [
  {
    title: "Software Developer Intern",
    org: "Negros Electric and Power Corporation (Negros Power)",
    period: "Jan 2026 – Mar 2026",
    points: [
      "Built an internal budget submission tool with a 3-tier approval workflow (Requester → Reviewer → Approver) in Next.js, TypeScript, Supabase and Drizzle ORM.",
      "Built a booking and visitor management system with QR code check-ins, request tracking, audit logs, email notifications and PDF/PNG export.",
    ],
  },
  {
    title: "Web Development Lead",
    org: "Google Developer Groups on Campus, USLS",
    period: "Aug 2024 – Apr 2026",
    points: [
      "Architected and built the chapter's web ecosystem with Next.js, TypeScript and Tailwind CSS, serving 550+ members and 1,000+ participants across 20+ events.",
      "Delivered internal tools and the project showcase end to end, from responsive interfaces to the services behind them.",
    ],
  },
  {
    title: "Open-Source Developer",
    org: "Independent",
    period: "Jul 2022 – Present",
    points: [
      "QA testing and feature work on Umamin, an anonymous messaging platform with 3M+ users, alongside its founders.",
      "Co-maintainer of Eclipse, a C++ cosmetic overlay for World of Warcraft 3.3.5a with 1,000+ concurrent players.",
      "Transmorpher: merged loadout import/export and the v1.1.9 release (performance improvements, legacy cleanup); Skua: a merged C# automation script.",
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
