import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Calendar, Database, GitHub } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { TagList } from "@/components/ui/Tag";
import type { Project } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import { ImageFrame } from "./ImageFrame";

export function ProjectHero({ project }: { project: Project }) {
  const meta = [
    project.date && { icon: Calendar, label: "Date", value: formatDate(project.date) },
    project.dataset && { icon: Database, label: "Dataset", value: project.dataset },
  ].filter(Boolean) as { icon: typeof Calendar; label: string; value: string }[];

  return (
    <header className="relative overflow-hidden pt-28 sm:pt-36">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,#000_65%,transparent)]">
        <div className="bg-grid absolute inset-0" />
        <div className="glow-primary absolute -top-48 right-[-10%] h-[34rem] w-[44rem]" />
        <div className="glow-accent absolute top-40 left-[-15%] h-[24rem] w-[34rem]" />
      </div>

      <Container className="relative">
        <Link href="/projects" className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg">
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
          All projects
        </Link>

        <div className="mt-8 grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div className="animate-enter">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="eyebrow">{project.category}</span>
              <span aria-hidden="true" className="text-line-strong">/</span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-0.5 text-xs text-emerald-300">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-emerald-400" />
                {project.status}
              </span>
            </div>

            <h1 className="mt-4 text-4xl font-semibold leading-[1.08] text-fg sm:text-5xl">{project.title}</h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">{project.description ?? project.summary}</p>

            {meta.length > 0 && (
              <dl className="mt-7 flex flex-wrap gap-x-7 gap-y-3">
                {meta.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-2 text-sm">
                    <Icon size={16} className="text-primary-soft" />
                    <dt className="sr-only">{label}</dt>
                    <dd className="text-fg-2">{value}</dd>
                  </div>
                ))}
              </dl>
            )}

            <TagList items={project.technologies} className="mt-7" />

            <div className="mt-8 flex flex-wrap gap-3">
              {project.github && (
                <ButtonLink href={project.github}>
                  <GitHub size={16} />
                  View source
                </ButtonLink>
              )}
              {project.demo && (
                <ButtonLink href={project.demo} variant="secondary">
                  Live demo
                  <ArrowUpRight size={16} />
                </ButtonLink>
              )}
            </div>
          </div>

          {project.image && (
            <div className="animate-enter [animation-delay:120ms]">
              <ImageFrame
                src={project.image}
                alt={project.imageAlt ?? `${project.title} screenshot`}
                label={project.github?.replace("https://github.com/", "")}
                priority
                sizes="(min-width: 1024px) 560px, 100vw"
                className="shadow-[0_40px_80px_-40px_rgb(108_99_255/0.55)]"
              />
            </div>
          )}
        </div>
      </Container>
    </header>
  );
}
