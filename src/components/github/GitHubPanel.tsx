import Link from "next/link";
import { ArrowUpRight, GitHub, Star } from "@/components/icons";
import type { GitHubOverview, Repo } from "@/lib/github";
import { cn, timeAgo } from "@/lib/utils";

const languageColors: Record<string, string> = {
  Python: "#6c63ff",
  "Jupyter Notebook": "#ff6584",
  HTML: "#a29dff",
  JavaScript: "#f0c674",
  TypeScript: "#5aa9ff",
  CSS: "#7dd3c0",
};
const colorFor = (language: string | null) => (language && languageColors[language]) || "#8b8ba3";

/** Live public-GitHub summary. Callers render nothing when the overview is null. */
export function GitHubStats({ overview, className }: { overview: GitHubOverview; className?: string }) {
  return (
    <div className={cn("rounded-3xl border border-line bg-surface/60 p-6 sm:p-7", className)}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow">Live from GitHub</p>
          <p className="mt-3 font-display text-4xl font-semibold text-fg">{overview.publicRepos}</p>
          <p className="text-sm text-muted">public repositories</p>
        </div>
        <a
          href={overview.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs text-fg-2 transition-colors hover:border-primary-soft/60 hover:text-fg"
        >
          <GitHub size={14} />@{overview.username}
          <span className="sr-only">(opens in new tab)</span>
        </a>
      </div>

      {overview.languages.length > 0 && (
        <div className="mt-7">
          <p className="text-xs text-muted">Most-used languages across repositories</p>
          <div className="mt-3 flex h-2 overflow-hidden rounded-full bg-white/5" aria-hidden="true">
            {overview.languages.map((lang) => (
              <span key={lang.name} style={{ width: `${lang.share * 100}%`, backgroundColor: colorFor(lang.name) }} />
            ))}
          </div>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
            {overview.languages.map((lang) => (
              <li key={lang.name} className="flex items-center gap-1.5 text-xs text-fg-2">
                <span aria-hidden="true" className="size-2 rounded-full" style={{ backgroundColor: colorFor(lang.name) }} />
                {lang.name}
                <span className="text-muted">{Math.round(lang.share * 100)}%</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {overview.recent.length > 0 && (
        <div className="mt-7 border-t border-line pt-5">
          <p className="text-xs text-muted">Recently updated</p>
          <ul className="mt-3 space-y-2.5">
            {overview.recent.map((repo) => (
              <li key={repo.name} className="flex items-center justify-between gap-3 text-sm">
                <a href={repo.url} target="_blank" rel="noopener noreferrer" className="truncate text-fg-2 hover:text-fg">
                  {repo.displayName}
                </a>
                <span className="shrink-0 font-mono text-xs text-muted">{timeAgo(repo.pushedAt)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function RepoCard({ repo }: { repo: Repo }) {
  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-line bg-surface/50 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:bg-surface">
      <div className="flex items-center justify-between gap-3">
        <GitHub size={18} className="text-fg-2" />
        <ArrowUpRight size={16} aria-hidden="true" className="text-muted transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg" />
      </div>
      <h3 className="mt-4 font-semibold text-fg">
        <a href={repo.url} target="_blank" rel="noopener noreferrer" className="after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus-visible:outline-none">
          {repo.displayName}
          <span className="sr-only"> on GitHub (opens in new tab)</span>
        </a>
      </h3>
      {repo.description && <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{repo.description}</p>}
      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-5 text-xs text-fg-2">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span aria-hidden="true" className="size-2 rounded-full" style={{ backgroundColor: colorFor(repo.language) }} />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1">
          <Star size={13} />
          {repo.stars}
          <span className="sr-only">stars</span>
        </span>
        <span className="font-mono text-muted">updated {timeAgo(repo.pushedAt)}</span>
        {repo.projectSlug && (
          <Link href={`/projects/${repo.projectSlug}`} className="relative z-10 ml-auto text-primary-soft hover:text-fg">
            Case study →
          </Link>
        )}
      </div>
    </article>
  );
}
