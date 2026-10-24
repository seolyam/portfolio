/**
 * Grouped by what each set of tools is for, not by tool type. Recruiters still scan
 * for the names; hiring managers look for where they were used, so every group
 * points at a project on this page.
 */
export const arsenal = [
  {
    title: "Interface",
    summary: "Typed, responsive product UI, rendered on the server where it counts.",
    items: ["TypeScript", "React", "Next.js", "Tailwind CSS"],
    proof: ["Art N Me", "GDGOC Event Platform"],
  },
  {
    title: "Backend & data",
    summary: "Schemas, queries and OAuth sign-in behind the interface.",
    items: ["Node.js", "PostgreSQL / Supabase", "SQL", "Drizzle ORM", "Turso"],
    proof: ["Art N Me", "Transmorpher Hub"],
  },
  {
    title: "Quality",
    summary: "Unit and end-to-end tests, and QA on a platform with 3M users.",
    items: ["Vitest", "Playwright", "QA testing"],
    proof: ["Umamin", "Art N Me"],
  },
  {
    title: "3D",
    summary: "Real-time 3D in the browser, from graphic upload to 360° export.",
    items: ["Three.js", "React Three Fiber"],
    proof: ["Art N Me"],
  },
  {
    title: "Game clients",
    summary: "Client-side scripts, mods and automation for native game clients.",
    items: ["C++", "Python", "Direct3D 9", "Lua", "C#"],
    proof: ["Eclipse", "Transmorpher", "Skua"],
  },
  {
    title: "Delivery",
    summary: "Version control, CI and hosting, from first commit to production.",
    items: ["Git", "GitHub Actions", "Vercel", "Railway"],
    proof: ["Art N Me", "GDGOC Event Platform", "Transmorpher Hub"],
  },
];
