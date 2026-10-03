import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";
import type { z } from "zod";
import { readingTime, renderMarkdown } from "./markdown";
import {
  experienceSchema,
  githubConfigSchema,
  labSchema,
  postFrontmatterSchema,
  profileSchema,
  projectFrontmatterSchema,
  skillsSchema,
  type PostFrontmatter,
  type ProjectFrontmatter,
} from "./schemas";

/**
 * All personal data lives in /content and is read here at build time.
 * Components never import content files directly — they receive typed,
 * validated data from these loaders.
 */

const CONTENT_DIR = path.join(process.cwd(), "content");

function parse<T extends z.ZodType>(schema: T, data: unknown, source: string): z.infer<T> {
  const result = schema.safeParse(data);
  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `  • ${issue.path.join(".") || "(root)"}: ${issue.message}`)
      .join("\n");
    throw new Error(`Invalid content in ${source}:\n${issues}`);
  }
  return result.data;
}

async function readJson<T extends z.ZodType>(file: string, schema: T): Promise<z.infer<T>> {
  const fullPath = path.join(CONTENT_DIR, file);
  const raw = await fs.readFile(fullPath, "utf8");
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch (error) {
    throw new Error(`content/${file} is not valid JSON: ${(error as Error).message}`);
  }
  return parse(schema, data, `content/${file}`);
}

/** Markdown files in a content folder, ignoring templates and partials prefixed with "_". */
async function listMarkdown(dir: string): Promise<string[]> {
  try {
    const files = await fs.readdir(path.join(CONTENT_DIR, dir));
    return files.filter((file) => file.endsWith(".md") && !file.startsWith("_")).sort();
  } catch {
    return [];
  }
}

const slugFromFile = (file: string) => file.replace(/\.md$/, "");

// ─── JSON content ────────────────────────────────────────────────────────────

export const getProfile = cache(() => readJson("profile.json", profileSchema));
export const getSkills = cache(() => readJson("skills.json", skillsSchema));
export const getExperience = cache(() => readJson("experience.json", experienceSchema));
export const getGitHubConfig = cache(() => readJson("github.json", githubConfigSchema));

export const getLabEntries = cache(async () => {
  const { entries } = await readJson("lab.json", labSchema);
  return [...entries].sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
});

// ─── Projects ────────────────────────────────────────────────────────────────

export type Project = ProjectFrontmatter & { slug: string; body: string };
export type ProjectWithHtml = Project & { html: string };

export const getProjects = cache(async (): Promise<Project[]> => {
  const files = await listMarkdown("projects");
  const projects = await Promise.all(
    files.map(async (file) => {
      const source = `content/projects/${file}`;
      const raw = await fs.readFile(path.join(CONTENT_DIR, "projects", file), "utf8");
      const { data, content } = matter(raw);
      const frontmatter = parse(projectFrontmatterSchema, data, source);
      return { ...frontmatter, slug: slugFromFile(file), body: content.trim() };
    }),
  );
  return projects.sort(
    (a, b) => a.order - b.order || (b.date ?? "").localeCompare(a.date ?? "") || a.title.localeCompare(b.title),
  );
});

export const getFeaturedProjects = cache(async () => {
  const projects = await getProjects();
  const featured = projects.filter((project) => project.featured);
  return featured.length > 0 ? featured : projects.slice(0, 3);
});

export const getProject = cache(async (slug: string): Promise<ProjectWithHtml | null> => {
  const project = (await getProjects()).find((p) => p.slug === slug);
  if (!project) return null;
  return { ...project, html: project.body ? await renderMarkdown(project.body, { demoteHeadings: 1 }) : "" };
});

// ─── Posts ───────────────────────────────────────────────────────────────────

export type Post = PostFrontmatter & { slug: string; body: string; readingTime: number };
export type PostWithHtml = Post & { html: string };

const showDrafts = process.env.NODE_ENV !== "production";

export const getPosts = cache(async (): Promise<Post[]> => {
  const files = await listMarkdown("posts");
  const posts = await Promise.all(
    files.map(async (file) => {
      const source = `content/posts/${file}`;
      const raw = await fs.readFile(path.join(CONTENT_DIR, "posts", file), "utf8");
      const { data, content } = matter(raw);
      const frontmatter = parse(postFrontmatterSchema, data, source);
      return { ...frontmatter, slug: slugFromFile(file), body: content.trim(), readingTime: readingTime(content) };
    }),
  );
  return posts.filter((post) => showDrafts || !post.draft).sort((a, b) => b.date.localeCompare(a.date));
});

export const getPost = cache(async (slug: string): Promise<PostWithHtml | null> => {
  const post = (await getPosts()).find((p) => p.slug === slug);
  if (!post) return null;
  return { ...post, html: await renderMarkdown(post.body) };
});

// ─── Derived data ────────────────────────────────────────────────────────────

const normalise = (value: string) => value.trim().toLowerCase();

/**
 * Maps each technology (lower-cased) to the projects that list it, so skills
 * can show where they were actually used without duplicating that information.
 */
export const getTechnologyUsage = cache(async () => {
  const usage = new Map<string, { slug: string; title: string }[]>();
  for (const project of await getProjects()) {
    for (const tech of project.technologies) {
      const key = normalise(tech);
      usage.set(key, [...(usage.get(key) ?? []), { slug: project.slug, title: project.title }]);
    }
  }
  return usage;
});

export async function projectsUsing(technology: string) {
  return (await getTechnologyUsage()).get(normalise(technology)) ?? [];
}
