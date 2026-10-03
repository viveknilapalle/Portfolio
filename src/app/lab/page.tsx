import { GitHubStats } from "@/components/github/GitHubPanel";
import { Flask } from "@/components/icons";
import { LabCard } from "@/components/lab/LabCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { getLabEntries } from "@/lib/content";
import { getGitHubOverview } from "@/lib/github";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Lab",
  description: "Experiments, exploratory analyses, ML prototypes and small web apps — the work in between the case studies.",
  path: "/lab",
});

const anchor = (type: string) => type.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export default async function LabPage() {
  const [entries, github] = await Promise.all([getLabEntries(), getGitHubOverview()]);

  // Group by type, keeping groups in order of their most recent entry.
  const groups = new Map<string, typeof entries>();
  for (const entry of entries) groups.set(entry.type, [...(groups.get(entry.type) ?? []), entry]);

  return (
    <>
      <PageHeader
        eyebrow="Lab"
        title={
          <>
            Experiments & <span className="text-gradient">smaller builds</span>
          </>
        }
        description="Not everything needs a case study. This is where exploratory analyses, ML prototypes and practice apps live — useful for seeing how the skills developed."
      >
        {groups.size > 0 && (
          <ul className="flex flex-wrap gap-2" aria-label="Jump to type">
            {[...groups.entries()].map(([type, items]) => (
              <li key={type}>
                <a
                  href={`#${anchor(type)}`}
                  className="inline-flex rounded-full border border-line bg-surface/60 px-3.5 py-1.5 text-sm text-fg-2 transition-colors hover:border-line-strong hover:text-fg"
                >
                  {type}
                  <span className="ml-2 font-mono text-xs text-muted">{items.length}</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </PageHeader>

      <Section className="pt-4 sm:pt-8">
        {entries.length === 0 ? (
          <EmptyState icon={<Flask size={20} />} title="The lab is empty — for now">
            New experiments will show up here.
          </EmptyState>
        ) : (
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_20rem]">
            <div className="space-y-16">
              {[...groups.entries()].map(([type, items]) => (
                <section key={type} id={anchor(type)} aria-labelledby={`lab-${anchor(type)}`}>
                  <h2 id={`lab-${anchor(type)}`} className="flex items-center gap-3 text-xl font-semibold text-fg">
                    {type}
                    <span className="h-px flex-1 bg-line" aria-hidden="true" />
                    <span className="font-mono text-xs font-normal text-muted">{items.length}</span>
                  </h2>
                  <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {items.map((entry, i) => (
                      <Reveal as="li" key={entry.title} delay={(i % 2) * 0.05}>
                        <LabCard entry={entry} />
                      </Reveal>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
            {github && (
              <aside aria-label="GitHub activity" className="lg:sticky lg:top-28 lg:self-start">
                <GitHubStats overview={github} />
              </aside>
            )}
          </div>
        )}
      </Section>
    </>
  );
}
