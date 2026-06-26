import { BentoGrid } from "@/components/bento-grid";
import { HeroCard } from "@/components/hero-card";
import { ProjectCard } from "@/components/project-card";
import { SuiteCard } from "@/components/suite-card";
import { projects } from "@/lib/projects";

export default function Home() {
  return (
    <main className="flex min-h-dvh flex-col items-center px-5 py-10 sm:px-8 sm:py-16">
      <div className="my-auto w-full max-w-6xl">
        <BentoGrid>
          <HeroCard />
          {projects.map((project) =>
            project.subItems ? (
              <SuiteCard key={project.title} project={project} />
            ) : (
              <ProjectCard key={project.title} project={project} />
            ),
          )}
        </BentoGrid>

        <footer className="mt-10 font-mono text-xs text-zinc-600">
          <p>&copy; {new Date().getFullYear()} Lhiam Andrei Lingco</p>
        </footer>
      </div>
    </main>
  );
}
