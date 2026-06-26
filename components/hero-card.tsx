import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { BentoCard } from "./bento-card";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/seolyam", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/seolyam/", icon: Linkedin },
  { label: "Email", href: "mailto:leeyam.dev@gmail.com", icon: Mail },
] as const;

export function HeroCard() {
  return (
    <BentoCard className="md:col-span-2 lg:col-span-3 lg:row-span-2">
      <div className="flex h-full flex-col justify-between gap-8 p-6 sm:p-8">
        <div className="space-y-4">
          <p className="font-mono text-xs uppercase tracking-widest text-indigo-300/80">
            Full Stack Web Developer
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
            Lhiam Andrei Lingco
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-zinc-300 sm:text-base">
            I architect scalable web ecosystems and contribute to high-traffic
            open-source platforms. Magna Cum Laude IT graduate obsessed with
            performance optimization and clean code.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <nav className="flex items-center gap-5">
            {SOCIALS.map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex items-center gap-1.5 text-sm text-zinc-300 transition-colors duration-200 hover:text-zinc-50"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </BentoCard>
  );
}
