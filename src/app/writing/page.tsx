import { Pen } from "@/components/icons";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { PostCard } from "@/components/writing/PostCard";
import { getPosts } from "@/lib/content";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Writing",
  description: "Notes on data analysis, SQL, machine learning and the things learned while building projects.",
  path: "/writing",
});

export default async function WritingPage() {
  const posts = await getPosts();
  const tags = [...new Set(posts.flatMap((p) => p.tags))].sort();

  return (
    <>
      <PageHeader
        eyebrow="Writing"
        title="Notes & write-ups"
        description="Notes on data analysis, SQL, machine learning and what I learn while building projects."
      >
        {tags.length > 0 && (
          <ul className="flex flex-wrap gap-2" aria-label="Topics">
            {tags.map((tag) => (
              <li key={tag}>
                <Tag>#{tag}</Tag>
              </li>
            ))}
          </ul>
        )}
      </PageHeader>

      <Section className="pt-0 sm:pt-4" containerClassName="max-w-4xl">
        {posts.length > 0 ? (
          <div className="border-t border-line">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <EmptyState icon={<Pen size={20} />} title="Nothing published yet">
            The first notes are on their way. In the meantime, the project case studies go deep on how each one was built.
          </EmptyState>
        )}
      </Section>
    </>
  );
}
