import type { Metadata } from "next";
import profile from "../../content/profile.json";

/**
 * Site-level configuration. The canonical URL comes from the environment when
 * set (e.g. a custom domain on Vercel) and falls back to content/profile.json.
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || profile.siteUrl).replace(/\/+$/, "");
export const siteName = profile.name;

export const sourceRepoUrl = "https://github.com/viveknilapalle/Portfolio";

type PageMetaInput = {
  title?: string;
  description: string;
  path: string;
  image?: { url: string; alt: string };
  type?: "website" | "article";
  publishedTime?: string;
};

/** Consistent per-page metadata: title, description, canonical URL and Open Graph. */
export function pageMetadata({ title, description, path, image, type = "website", publishedTime }: PageMetaInput): Metadata {
  const images = image ? [{ url: image.url, alt: image.alt }] : undefined;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName,
      title: title ? `${title} · ${siteName}` : siteName,
      description,
      ...(images && { images }),
      ...(publishedTime && { publishedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title: title ? `${title} · ${siteName}` : siteName,
      description,
      ...(images && { images }),
    },
  };
}
