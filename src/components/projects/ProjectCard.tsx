import Link from "next/link";
import { ArrowUpRight, GitHub } from "@/components/icons";
import { TagList } from "@/components/ui/Tag";
import type { Project } from "@/lib/content";
import { cn, formatDate } from "@/lib/utils";
import { ImageFrame } from "./ImageFrame";

type ProjectCardProps = {
  project: Project;
  variant?: "default" | "feature";
  index?: number;
  priority?: boolean;
};

/**
 * Project summary card. The title link is stretched over the whole card so the
 * entire surface is clickable, while the GitHub link stays independently focusable.
 */
export function ProjectCard({ project, variant = "default", index, priority }: ProjectCardProps) {
  const href = `/projects/${project.slug}`;
  const feature = variant === "feature";

  return (
    <article
      className={cn(
        "gradient-border group relative grid h-full grid-cols-1 overflow-hidden rounded-3xl bg-surface/70 [--border-opacity:0.35] hover:[--border-opacity:1]",
        "transition-transform duration-500 ease-out-soft hover:-translate-y-1",
        feature ? "gap-0 lg:grid-cols-[1.15fr_1fr]" : "grid-rows-[auto_1fr]",
      )}
    >
      {project.image && (
        <div className={cn("relative p-3 pb-0", feature && "lg:p-4 lg:pr-0")}>
          <ImageFrame
            src={project.image}
            alt={project.imageAlt ?? `${project.title} screenshot`}
            label={project.github?.replace("https://github.com/", "")}
            priority={priority}
            sizes={feature ? "(min-width: 1024px) 600px, 100vw" : "(min-width: 768px) 50vw, 100vw"}
            aspect={feature ? "aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-80" : "aspect-[16/10]"}
            className={cn(feature && "lg:h-full")}
            imageClassName="transition-transform duration-700 ease-out-soft group-hover:scale-[1.035]"
          />
        </div>
      )}

      <div className={cn("flex flex-col p-6 sm:p-7", feature && "lg:justify-center lg:p-10")}>
        <div className="flex items-center gap-3 font-mono text-xs text-muted">
          {typeof index === "number" && <span className="text-primary-soft">{String(index + 1).padStart(2, "0")}</span>}
          <span>{project.category}</span>
          {project.date && (
            <>
              <span aria-hidden="true" className="h-3 w-px bg-line-strong" />
              <time dateTime={project.date}>{formatDate(project.date)}</time>
            </>
          )}
        </div>

        <h3 className={cn("mt-3 font-semibold text-fg", feature ? "text-2xl sm:text-3xl" : "text-xl")}>
          <Link href={href} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
            {project.title}
          </Link>
        </h3>

        <p className={cn("mt-3 leading-relaxed text-muted", feature ? "text-base sm:text-lg" : "text-[0.95rem]")}>{project.summary}</p>

        {feature && project.highlights.length > 0 && (
          <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-5 sm:grid-cols-3">
            {project.highlights.slice(0, 3).map((item) => (
              <div key={item.label}>
                <dt className="sr-only">{item.label}</dt>
                <dd className="font-display text-lg font-semibold text-fg">{item.value}</dd>
                <dd className="mt-0.5 text-xs leading-snug text-muted">{item.label}</dd>
              </div>
            ))}
          </dl>
        )}

        <TagList items={project.technologies} limit={feature ? 6 : 4} className="mt-6" />

        <div className="mt-auto flex items-center justify-between gap-4 pt-7">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-soft transition-colors group-hover:text-fg">
            Read case study
            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex size-9 items-center justify-center rounded-full border border-line text-fg-2 transition-colors hover:border-primary-soft/60 hover:text-fg"
              aria-label={`${project.title} source code on GitHub (opens in new tab)`}
            >
              <GitHub size={16} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
