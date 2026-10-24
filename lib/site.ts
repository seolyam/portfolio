export const site = {
  name: "Lhiam Andrei Lingco",
  shortName: "Lhiam Lingco",
  role: "Software engineer",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://seolyam.com",
  email: "leeyam.dev@gmail.com",
  description:
    "Software engineer building scalable web systems with Next.js, TypeScript, and Supabase, plus game client scripting.",
  /** Set as one paragraph: the lead in ink, the aside muted. */
  bio: {
    lead: "I build full-stack web applications, from the data model to the interface, and contribute to open-source platforms at scale.",
    aside: "Off the main line, I write client-side scripts and mods for game clients.",
  },
  focus: "Next.js · TypeScript · Supabase",
  lead: "Web Dev Lead, GDG on Campus USLS",
  scale: "Umamin contributor, 3M+ users",
  education: "BS IT, Magna Cum Laude, 2026",
};

export const links = [
  { id: "github", label: "GitHub", href: "https://github.com/seolyam", display: "github.com/seolyam" },
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/seolyam/", display: "linkedin.com/in/seolyam" },
  { id: "resume", label: "Résumé", href: "/resume.pdf", display: "resume.pdf" },
] as const;

export const principles = [
  {
    title: "Structure before surface.",
    body: "Get the data model and the boundaries right, and the interface has room to stay simple.",
  },
  {
    title: "Tested at scale.",
    body: "QA on Umamin, through 3M users and 17.5M visits, taught me to treat scale as a design input, not an afterthought.",
  },
  {
    title: "Quiet by default.",
    body: "Fewer dependencies, fewer moving parts, fewer surprises. Everything shipped earns its place.",
  },
];
