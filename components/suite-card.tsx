import Image from "next/image";
import Link from "next/link";
import { Github } from "lucide-react";
import { BentoCard } from "./bento-card";
import type { Project } from "@/lib/projects";

const LOGO_CLASS = "object-contain grayscale invert contrast-125";

export function SuiteCard({ project }: { project: Project }) {
  const subItems = project.subItems ?? [];

  return (
    <BentoCard className="md:col-span-2 lg:col-span-2 lg:row-span-2">
      <div className="flex h-full flex-col gap-4 p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.03]">
            <Image
              src={project.logoSrc}
              alt="Transmorpher logo"
              fill
              sizes="36px"
              className={LOGO_CLASS}
            />
          </span>
          <h3 className="text-base font-semibold tracking-tight text-zinc-50">
            {project.title}
          </h3>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-3">
          {subItems.map((item) => (
            <div
              key={item.title}
              className="flex flex-1 flex-col rounded-lg border border-white/[0.04] bg-white/[0.01] p-4"
            >
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-medium text-zinc-100">
                  {item.title}
                </h4>
                <Link
                  href={item.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${item.title} source on GitHub`}
                  title={item.title}
                  className="shrink-0 text-zinc-300 transition-colors duration-200 hover:text-zinc-100"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-zinc-300">
                {item.description}
              </p>
              <div className="mt-auto flex flex-wrap gap-2 pt-4">
                {item.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-white/[0.06] px-2 py-0.5 font-mono text-[11px] text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </BentoCard>
  );
}
