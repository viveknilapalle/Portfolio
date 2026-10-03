import { ArrowUpRight, GitHub } from "@/components/icons";
import { TagList } from "@/components/ui/Tag";
import type { LabEntry } from "@/lib/schemas";
import { formatDate } from "@/lib/utils";

export function LabCard({ entry }: { entry: LabEntry }) {
  const href = entry.demo ?? entry.repo;

  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-line bg-surface/50 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:bg-surface sm:p-6">
      <div className="flex items-center justify-between gap-3 font-mono text-[0.7rem] tracking-wide text-muted uppercase">
        <span className="text-primary-soft">{entry.type}</span>
        {entry.date && <time dateTime={entry.date}>{formatDate(entry.date)}</time>}
      </div>

      <h3 className="mt-3 text-base font-semibold text-fg sm:text-lg">
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className="after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus-visible:outline-none">
            {entry.title}
            <span className="sr-only"> (opens in new tab)</span>
          </a>
        ) : (
          entry.title
        )}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{entry.description}</p>

      <TagList items={entry.technologies} limit={4} className="mt-5" />

      {href && (
        <span aria-hidden="true" className="mt-auto flex items-center gap-1.5 pt-5 text-xs text-fg-2 transition-colors group-hover:text-fg">
          {entry.demo ? <ArrowUpRight size={14} /> : <GitHub size={14} />}
          {entry.demo ? "Live demo" : "Repository"}
        </span>
      )}
    </article>
  );
}
