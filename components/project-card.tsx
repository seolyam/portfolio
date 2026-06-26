import Link from "next/link";
import { Github } from "lucide-react";
import { BentoCard } from "./bento-card";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  const spans = project.featured
    ? "md:col-span-2 lg:col-span-2 lg:row-span-2"
    : project.metrics
      ? "md:col-span-2 lg:col-span-2 lg:row-span-1"
      : "lg:col-span-1 lg:row-span-1";

  const typeIcons = Array.isArray(project.typeIcon) ? project.typeIcon : [project.typeIcon];
  const repositoryLinks = Array.isArray(project.repositoryUrl)
    ? project.repositoryUrl
    : [{ url: project.repositoryUrl, label: "GitHub Repository" }];

  return (
    <BentoCard className={spans}>
      <div className="flex h-full flex-col gap-4 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {typeIcons.map((Icon, idx) => (
                <span key={idx} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-zinc-900 shadow-sm text-zinc-300 relative z-[1]">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
              ))}
            </div>
            <h3 className="text-base font-semibold tracking-tight text-zinc-50">
              {project.title}
            </h3>
          </div>
          <div className="flex gap-2">
            {repositoryLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} source on GitHub - ${link.label}`}
                title={link.label}
                className="shrink-0 text-zinc-500 transition-colors duration-200 hover:text-zinc-100"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>

        {project.metrics && (
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {project.metrics.map((metric) => (
              <div key={metric.label}>
                <p
                  className={`font-mono font-semibold tracking-tight text-zinc-50 ${
                    project.featured ? "text-2xl sm:text-3xl" : "text-xl"
                  }`}
                >
                  {metric.value}
                </p>
                <p className="font-mono text-xs text-zinc-500">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        )}

        <p className="text-sm leading-relaxed text-zinc-400">
          {project.description.map((segment, index) =>
            segment.bold ? (
              <strong key={index} className="font-semibold text-zinc-100">
                {segment.text}
              </strong>
            ) : (
              <span key={index}>{segment.text}</span>
            ),
          )}
        </p>

        <div className="mt-auto flex flex-wrap gap-2 pt-1">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-white/[0.06] px-2 py-0.5 font-mono text-[11px] text-zinc-400"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </BentoCard>
  );
}
