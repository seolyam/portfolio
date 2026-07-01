import { BentoGrid } from "@/components/bento-grid";
import { HeroCard } from "@/components/hero-card";
import { ProjectCard } from "@/components/project-card";
import { SectionHeader } from "@/components/section-header";
import { SuiteCard } from "@/components/suite-card";
import { projects } from "@/lib/projects";

export default function Home() {
  return (
    <main className="flex min-h-dvh flex-col items-center px-5 py-10 sm:px-8 sm:py-16">
      <div className="my-auto w-full max-w-5xl flex flex-col gap-2">
        <BentoGrid>
          <HeroCard />
        </BentoGrid>
        
        <SectionHeader title="Featured Projects" />
        
        <BentoGrid>
          {projects.map((project) =>
            project.subItems ? (
              <SuiteCard key={project.title} project={project} />
            ) : (
              <ProjectCard key={project.title} project={project} />
            ),
          )}
        </BentoGrid>
      </div>
    </main>
  );
}
