import { z } from "zod";

/**
 * Schemas for everything under /content. Content is validated at build time,
 * so a typo in a JSON file or Markdown front matter fails the build with a
 * precise error instead of shipping a broken page.
 */

// YAML turns `2026-01-31` into a Date but leaves `2026-07` as a string.
const dateField = z
  .union([z.string(), z.date()])
  .transform((value) => (typeof value === "string" ? value : value.toISOString().slice(0, 10)));

const image = z.object({
  src: z.string(),
  alt: z.string(),
  caption: z.string().optional(),
});

export const socialSchema = z.object({
  label: z.string(),
  url: z.url(),
  icon: z.enum(["github", "linkedin", "mail", "globe"]),
  handle: z.string().optional(),
});

export const profileSchema = z.object({
  name: z.string(),
  shortName: z.string(),
  role: z.string(),
  tagline: z.string().optional(),
  intro: z.string(),
  summary: z.string(),
  availability: z.string().optional(),
  location: z.string(),
  email: z.email(),
  phone: z.string().optional(),
  siteUrl: z.url(),
  resume: z.string(),
  image: z.string(),
  socials: z.array(socialSchema),
  focus: z
    .array(
      z.object({
        title: z.string(),
        description: z.string(),
        icon: z.enum(["database", "chart", "cpu", "code", "layers"]).default("code"),
        technologies: z.array(z.string()).default([]),
      }),
    )
    .default([]),
  about: z.object({
    headline: z.string(),
    paragraphs: z.array(z.string()),
    interests: z.array(z.string()).default([]),
    learning: z.array(z.object({ title: z.string(), detail: z.string().optional() })).default([]),
  }),
});

export const skillsSchema = z.object({
  groups: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.string().optional(),
      items: z.array(z.string()).min(1),
    }),
  ),
});

export const experienceSchema = z.object({
  work: z
    .array(
      z.object({
        company: z.string(),
        role: z.string(),
        start: z.string(),
        end: z.string().default("Present"),
        location: z.string().optional(),
        url: z.url().optional(),
        description: z.string().optional(),
        responsibilities: z.array(z.string()).default([]),
        technologies: z.array(z.string()).default([]),
      }),
    )
    .default([]),
  education: z
    .array(
      z.object({
        institution: z.string(),
        credential: z.string(),
        /** Compact form for badges, e.g. "B.Tech, CSE". */
        short: z.string().optional(),
        start: z.string(),
        end: z.string(),
        score: z.string().optional(),
        description: z.string().optional(),
      }),
    )
    .default([]),
  certifications: z
    .array(
      z.object({
        name: z.string(),
        issuer: z.string(),
        date: z.string().optional(),
        url: z.url().optional(),
      }),
    )
    .default([]),
});

export const labSchema = z.object({
  entries: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      type: z.string(),
      technologies: z.array(z.string()).default([]),
      repo: z.url().optional(),
      demo: z.url().optional(),
      date: z.string().optional(),
    }),
  ),
});

export const githubConfigSchema = z.object({
  username: z.string(),
  featured: z.array(z.string()).default([]),
  exclude: z.array(z.string()).default([]),
});

export const projectFrontmatterSchema = z.object({
  title: z.string(),
  summary: z.string(),
  description: z.string().optional(),
  category: z.string(),
  technologies: z.array(z.string()).default([]),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
  github: z.url().optional(),
  demo: z.url().optional(),
  featured: z.boolean().default(false),
  order: z.number().default(999),
  status: z.string().default("Completed"),
  date: dateField.optional(),
  dataset: z.string().optional(),
  highlights: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
  problem: z.string().optional(),
  approach: z.string().optional(),
  workflow: z.array(z.object({ title: z.string(), detail: z.string().optional() })).default([]),
  architecture: image.optional(),
  solution: z.string().optional(),
  challenges: z.array(z.string()).default([]),
  outcome: z.string().optional(),
  findings: z.array(z.string()).default([]),
  learnings: z.array(z.string()).default([]),
  nextSteps: z.array(z.string()).default([]),
  gallery: z.array(image).default([]),
});

export const postFrontmatterSchema = z.object({
  title: z.string(),
  date: dateField,
  updated: dateField.optional(),
  description: z.string(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
  image: z.string().optional(),
});

export type Profile = z.infer<typeof profileSchema>;
export type Social = z.infer<typeof socialSchema>;
export type SkillGroup = z.infer<typeof skillsSchema>["groups"][number];
export type Experience = z.infer<typeof experienceSchema>;
export type WorkEntry = Experience["work"][number];
export type EducationEntry = Experience["education"][number];
export type LabEntry = z.infer<typeof labSchema>["entries"][number];
export type GitHubConfig = z.infer<typeof githubConfigSchema>;
export type ProjectFrontmatter = z.infer<typeof projectFrontmatterSchema>;
export type PostFrontmatter = z.infer<typeof postFrontmatterSchema>;
