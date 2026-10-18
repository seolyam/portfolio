import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Metric, Project, TextSegment } from "@/lib/projects";
import { PAD_X } from "./primitives/spacing";

export function OutLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex items-center gap-1 font-mono text-[11px] tracking-[0.06em] text-ink underline decoration-hairline-strong underline-offset-4 transition-colors duration-200 hover:decoration-ink"
    >
      {children}
      <ArrowUpRight aria-hidden className="size-3" strokeWidth={1.5} />
    </a>
  );
}

function Logo({ src }: { src: string }) {
  return (
    <span className="relative size-10 shrink-0 overflow-hidden border border-hairline bg-paper">
      <Image
        src={src}
        alt=""
        fill
        sizes="40px"
        className="object-contain p-1 grayscale night:opacity-85"
      />
    </span>
  );
}

function Description({ segments }: { segments: TextSegment[] }) {
  return (
    <p className="max-w-[60ch] text-[15px] leading-relaxed whitespace-pre-line text-pretty text-ink-muted">
      {segments.map((segment, i) =>
        segment.bold ? (
          <strong key={i} className="font-medium text-ink">
            {segment.text}
          </strong>
        ) : (
          <span key={i}>{segment.text}</span>
        ),
      )}
    </p>
  );
}

function Metrics({ metrics }: { metrics: Metric[] }) {
  return (
    <dl className="flex flex-wrap gap-x-10 gap-y-4">
      {metrics.map((metric) => (
        <div key={metric.label} className="flex flex-col-reverse">
          <dt className="mt-1.5 font-mono text-[11px] tracking-[0.06em] text-ink-muted">
            {metric.label}
          </dt>
          <dd className="font-serif text-4xl leading-none tracking-[-0.02em] text-ink">
            {metric.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function Stack({ items }: { items: string[] }) {
  return (
    <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-muted">
      {items.join(" / ")}
    </p>
  );
}

/** Role and status reveal in sequence on hover or focus; always shown on touch. */
function Dossier({ project, index }: { project: Project; index: string }) {
  return (
    <div className="flex items-start justify-between gap-6 font-mono text-[11px] tracking-[0.06em] text-ink-muted">
      <span>{index}</span>
      <dl className="flex flex-wrap justify-end gap-x-6 gap-y-1">
        <div data-reveal style={{ "--i": 0 } as React.CSSProperties} className="flex gap-2">
          <dt className="uppercase">Role</dt>
          <dd className="text-ink">{project.role}</dd>
        </div>
        <div data-reveal style={{ "--i": 1 } as React.CSSProperties} className="flex gap-2">
          <dt className="uppercase">Status</dt>
          <dd className="flex items-center gap-1.5 text-ink">
            <span aria-hidden className="size-1.5 bg-ink" />
            {project.status}
          </dd>
        </div>
      </dl>
    </div>
  );
}

function Title({ project, featured }: { project: Project; featured?: boolean }) {
  return (
    <div className="flex items-center gap-4">
      <Logo src={project.logoSrc} />
      <h3
        className={`font-serif leading-none tracking-[-0.02em] text-ink ${
          featured ? "text-4xl sm:text-5xl" : "text-3xl"
        }`}
      >
        {project.title}
      </h3>
    </div>
  );
}

function SourceLinks({ project }: { project: Pick<Project, "title" | "repositoryUrl" | "liveUrl"> }) {
  return (
    <div className="flex gap-5">
      {project.repositoryUrl && (
        <OutLink href={project.repositoryUrl} label={`${project.title} source on GitHub`}>
          Source
        </OutLink>
      )}
      {project.liveUrl && (
        <OutLink href={project.liveUrl} label={`${project.title}, live site`}>
          Live
        </OutLink>
      )}
    </div>
  );
}

export function ProjectDossier({ project, index }: { project: Project; index: string }) {
  if (project.featured) {
    return (
      <article className={`dossier flex flex-col gap-10 py-10 sm:py-12 md:col-span-2 ${PAD_X}`}>
        <Dossier project={project} index={index} />
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <Title project={project} featured />
          </div>
          <div className="flex flex-col gap-6 md:col-span-7">
            {project.description && <Description segments={project.description} />}
            {project.metrics && <Metrics metrics={project.metrics} />}
            <div className="flex flex-wrap items-end justify-between gap-4 border-t border-hairline pt-5">
              {project.stack && <Stack items={project.stack} />}
              <SourceLinks project={project} />
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className={`dossier flex flex-col gap-8 py-10 sm:py-12 ${PAD_X}`}>
      <Dossier project={project} index={index} />
      <Title project={project} />
      {project.description && <Description segments={project.description} />}
      {project.metrics && <Metrics metrics={project.metrics} />}

      {project.subItems && (
        <ul className="border-t border-hairline">
          {project.subItems.map((item) => (
            <li key={item.title} className="border-b border-hairline py-5">
              <div className="flex items-baseline justify-between gap-4">
                <h4 className="text-[15px] font-medium text-ink">{item.title}</h4>
                <SourceLinks project={item} />
              </div>
              <p className="mt-2 text-sm leading-relaxed text-pretty text-ink-muted">
                {item.description}
              </p>
              <div className="mt-3">
                <Stack items={item.stack} />
              </div>
            </li>
          ))}
        </ul>
      )}

      {project.stack && (
        <div className="mt-auto flex flex-wrap items-end justify-between gap-4 border-t border-hairline pt-5">
          <Stack items={project.stack} />
          <SourceLinks project={project} />
        </div>
      )}
    </article>
  );
}
