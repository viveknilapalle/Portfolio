import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { Tag } from "@/components/ui/Tag";
import type { Post } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="group relative grid grid-cols-1 gap-3 border-b border-line py-7 sm:grid-cols-[9rem_1fr] sm:gap-8">
      <div className="font-mono text-xs text-muted sm:pt-1.5">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <p className="mt-1">{post.readingTime} min read</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-fg transition-colors group-hover:text-primary-soft">
          <Link href={`/writing/${post.slug}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
            {post.title}
          </Link>
          {post.draft && <Tag tone="accent" className="ml-3 align-middle">draft</Tag>}
        </h3>
        <p className="mt-2 leading-relaxed text-muted">{post.description}</p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {post.tags.map((tag) => (
            <Tag key={tag}>#{tag}</Tag>
          ))}
          <ArrowRight size={16} aria-hidden="true" className="ml-auto text-primary-soft opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
        </div>
      </div>
    </article>
  );
}
