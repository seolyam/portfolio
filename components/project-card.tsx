import Image from "next/image";
import Link from "next/link";
import { Github } from "lucide-react";
import { BentoCard } from "./bento-card";
import type { Project } from "@/lib/projects";

const LOGO_CLASS = "object-contain grayscale invert contrast-125";

export function ProjectCard({ project }: { project: Project }) {
  const spans = "lg:col-span-1 lg:row-span-1";

  return (
    <BentoCard className={spans}>
      <div className="flex h-full flex-col gap-4 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.03]">
              <Image
                src={project.logoSrc}
                alt={`${project.title} logo`}
                fill
                sizes="36px"
                className={LOGO_CLASS}
              />
            </span>
            <h3 className="text-base font-semibold tracking-tight text-zinc-50">
              {project.title}
            </h3>
          </div>
          <Link
            href={project.repositoryUrl!}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} source on GitHub`}
            className="shrink-0 text-zinc-300 transition-colors duration-200 hover:text-zinc-100"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {project.metrics && (
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {project.metrics.map((metric) => (
              <div key={metric.label}>
                <p className="font-mono text-xl font-semibold tracking-tight text-zinc-50">
                  {metric.value}
                </p>
                <p className="font-mono text-xs text-zinc-500">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        )}

        <p className="text-sm leading-relaxed text-zinc-300">
          {project.description!.map((segment, index) =>
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
          {project.stack!.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-white/[0.06] px-2 py-0.5 font-mono text-[11px] text-zinc-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </BentoCard>
  );
}
