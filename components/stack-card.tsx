import { BentoCard } from "./bento-card";

const STACK = [
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Supabase",
  "Drizzle ORM",
];

export function StackCard() {
  return (
    <BentoCard className="lg:col-span-1 lg:row-span-1">
      <div className="flex h-full flex-col gap-3 p-5">
        <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">
          Stack
        </p>
        <div className="flex flex-wrap gap-2">
          {STACK.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 font-mono text-xs text-zinc-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </BentoCard>
  );
}
