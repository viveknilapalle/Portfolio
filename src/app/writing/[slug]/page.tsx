import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { getPost, getPosts, getProfile } from "@/lib/content";
import { pageMetadata, siteUrl } from "@/lib/site";
import { formatDate } from "@/lib/utils";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getPosts()).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params) {
  const post = await getPost((await params).slug);
  if (!post) return {};
  return {
    ...pageMetadata({
      title: post.title,
      description: post.description,
      path: `/writing/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      image: post.image ? { url: post.image, alt: post.title } : undefined,
    }),
    keywords: post.tags,
  };
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const [post, profile] = await Promise.all([getPost(slug), getProfile()]);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: { "@type": "Person", name: profile.name, url: siteUrl },
    url: `${siteUrl}/writing/${post.slug}`,
    keywords: post.tags.join(", "),
  };

  return (
    <article className="relative pt-28 sm:pt-36">
      <div aria-hidden="true" className="glow-primary pointer-events-none absolute -top-40 left-1/2 h-[26rem] w-[44rem] -translate-x-1/2" />
      <Container size="narrow" className="relative">
        <Link href="/writing" className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg">
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
          All writing
        </Link>

        <header className="mt-10 animate-enter border-b border-line pb-10">
          {post.tags.length > 0 && (
            <ul className="flex flex-wrap gap-2" aria-label="Tags">
              {post.tags.map((tag) => (
                <li key={tag}>
                  <Tag tone="primary">#{tag}</Tag>
                </li>
              ))}
            </ul>
          )}
          <h1 className="mt-5 text-4xl leading-[1.1] font-semibold text-fg sm:text-5xl">{post.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">{post.description}</p>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-muted">
            <span className="flex items-center gap-2">
              <Calendar size={14} />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </span>
            <span className="flex items-center gap-2">
              <Clock size={14} />
              {post.readingTime} min read
            </span>
            {post.updated && <span>Updated {formatDate(post.updated)}</span>}
            {post.draft && <Tag tone="accent">draft — hidden in production</Tag>}
          </div>
        </header>

        <div
          className="prose prose-lg prose-portfolio mt-10 max-w-none prose-headings:font-display prose-headings:font-semibold"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        <footer className="mt-16 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            Written by <span className="text-fg-2">{profile.name}</span>
          </p>
          <Link href="/writing" className="text-sm text-primary-soft hover:text-fg">
            ← More writing
          </Link>
        </footer>
      </Container>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </article>
  );
}
