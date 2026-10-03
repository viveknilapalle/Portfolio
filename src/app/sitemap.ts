import type { MetadataRoute } from "next";
import { getPosts, getProjects } from "@/lib/content";
import { siteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, posts] = await Promise.all([getProjects(), getPosts()]);

  const pages = ["", "/about", "/projects", "/experience", "/skills", "/lab", "/writing", "/contact"].map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  return [
    ...pages,
    ...projects.map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      lastModified: project.date,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
    ...posts
      .filter((post) => !post.draft)
      .map((post) => ({
        url: `${siteUrl}/writing/${post.slug}`,
        lastModified: post.updated ?? post.date,
        changeFrequency: "yearly" as const,
        priority: 0.6,
      })),
  ];
}
