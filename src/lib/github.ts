import { cache } from "react";
import { getGitHubConfig, getProjects } from "./content";

/**
 * Public GitHub data is an enhancement, never a dependency. Every request has a
 * short timeout, failures resolve to `null`, and callers hide the UI that needs
 * it. Responses are cached and revalidated hourly (ISR), so a rate-limited
 * build simply retries on the next revalidation.
 */

const API = "https://api.github.com";
const REVALIDATE_SECONDS = 60 * 60;
const TIMEOUT_MS = 5000;

type ApiUser = { public_repos: number; html_url: string; followers: number };
type ApiRepo = {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
};

export type Repo = {
  name: string;
  displayName: string;
  url: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  pushedAt: string;
  /** Slug of the local case study for this repo, when one exists. */
  projectSlug?: string;
};

export type GitHubOverview = {
  username: string;
  profileUrl: string;
  publicRepos: number;
  languages: { name: string; count: number; share: number }[];
  featured: Repo[];
  recent: Repo[];
};

async function request<T>(endpoint: string): Promise<T | null> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  try {
    const response = await fetch(`${API}${endpoint}`, {
      headers,
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

/** "Movie_Recommender_System" → "Movie Recommender System" */
const prettify = (name: string) =>
  name
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const repoKey = (url: string) => url.toLowerCase().replace(/\/+$/, "");

export const getGitHubOverview = cache(async (): Promise<GitHubOverview | null> => {
  const config = await getGitHubConfig();
  const [user, repos] = await Promise.all([
    request<ApiUser>(`/users/${config.username}`),
    request<ApiRepo[]>(`/users/${config.username}/repos?per_page=100&sort=pushed`),
  ]);
  if (!user || !Array.isArray(repos)) return null;

  const projectByRepo = new Map(
    (await getProjects()).filter((p) => p.github).map((p) => [repoKey(p.github!), p.slug]),
  );
  const excluded = new Set(config.exclude.map((name) => name.toLowerCase()));

  const visible: Repo[] = repos
    .filter((repo) => !repo.fork && !repo.archived && !excluded.has(repo.name.toLowerCase()))
    .map((repo) => ({
      name: repo.name,
      displayName: prettify(repo.name),
      url: repo.html_url,
      description: repo.description,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      pushedAt: repo.pushed_at,
      projectSlug: projectByRepo.get(repoKey(repo.html_url)),
    }));

  const byName = new Map(visible.map((repo) => [repo.name.toLowerCase(), repo]));
  const featured = config.featured
    .map((name) => byName.get(name.toLowerCase()))
    .filter((repo): repo is Repo => Boolean(repo));

  const counts = new Map<string, number>();
  for (const repo of visible) {
    if (repo.language) counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1);
  }
  const withLanguage = [...counts.values()].reduce((sum, n) => sum + n, 0);
  const languages = [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({ name, count, share: withLanguage ? count / withLanguage : 0 }));

  return {
    username: config.username,
    profileUrl: user.html_url,
    publicRepos: user.public_repos,
    languages,
    featured,
    recent: [...visible].sort((a, b) => b.pushedAt.localeCompare(a.pushedAt)).slice(0, 4),
  };
});
