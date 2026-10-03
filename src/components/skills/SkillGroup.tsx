import Link from "next/link";
import type { SkillGroup as SkillGroupData } from "@/lib/schemas";
import { cn } from "@/lib/utils";

type Usage = { slug: string; title: string }[];

type SkillGroupProps = {
  group: SkillGroupData;
  /** Projects that use each skill, keyed by skill name. */
  usage?: Record<string, Usage>;
  compact?: boolean;
  className?: string;
};

/**
 * A titled cluster of technologies. Skills that appear in a project's
 * `technologies` list are marked and linked — evidence instead of percentages.
 */
export function SkillGroup({ group, usage = {}, compact = false, className }: SkillGroupProps) {
  const projects = new Map<string, string>();
  for (const item of group.items) for (const p of usage[item] ?? []) projects.set(p.slug, p.title);

  if (compact) {
    return (
      <div className={cn("grid grid-cols-1 gap-2 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6", className)}>
        <h3 className="font-mono text-xs tracking-wide text-primary-soft uppercase sm:pt-1">{group.title}</h3>
        <p className="text-[0.95rem] leading-relaxed text-fg-2">{group.items.join(" · ")}</p>
      </div>
    );
  }

  return (
    <section
      aria-labelledby={`skills-${group.id}`}
      className={cn("gradient-border flex h-full flex-col rounded-3xl bg-surface/60 p-6 [--border-opacity:0.3] hover:[--border-opacity:0.8] sm:p-7", className)}
    >
      <h2 id={`skills-${group.id}`} className="text-lg font-semibold text-fg">
        {group.title}
      </h2>
      {group.description && <p className="mt-1.5 text-sm leading-relaxed text-muted">{group.description}</p>}

      <ul className="mt-5 flex flex-wrap gap-2">
        {group.items.map((item) => {
          const used = (usage[item]?.length ?? 0) > 0;
          return (
            <li
              key={item}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm",
                used ? "border-primary/35 bg-primary/10 text-fg" : "border-line bg-white/[0.02] text-fg-2",
              )}
            >
              {used && <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />}
              {item}
              {used && <span className="sr-only">(used in projects)</span>}
            </li>
          );
        })}
      </ul>

      {projects.size > 0 && (
        <p className="mt-auto pt-6 text-xs leading-relaxed text-muted">
          Applied in{" "}
          {[...projects.entries()].map(([slug, title], i, all) => (
            <span key={slug}>
              <Link href={`/projects/${slug}`} className="text-primary-soft underline-offset-4 hover:text-fg hover:underline">
                {title}
              </Link>
              {i < all.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>
      )}
    </section>
  );
}
