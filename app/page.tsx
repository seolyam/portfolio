import { BentoGrid } from "@/components/bento-grid";
import { HeroCard } from "@/components/hero-card";
import { StatusCard } from "@/components/status-card";
import { StackCard } from "@/components/stack-card";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/projects";

export default function Home() {
  return (
    <main className="mx-auto min-h-dvh max-w-6xl px-5 py-10 sm:px-8 sm:py-16">
      <BentoGrid>
        <HeroCard />
        <StatusCard />
        <StackCard />
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </BentoGrid>

      <footer className="mt-10 font-mono text-xs text-zinc-600">
        <p>&copy; {new Date().getFullYear()} Lhiam Andrei Lingco</p>
      </footer>
    </main>
  );
}
