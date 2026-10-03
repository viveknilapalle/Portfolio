import { RepoCard } from "@/components/github/GitHubPanel";
import { Layers } from "@/components/icons";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getProjects } from "@/lib/content";
import { getGitHubOverview } from "@/lib/github";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Projects",
  description: "Case studies in SQL analytics, business intelligence dashboards and machine learning — problem, approach, pipeline and findings.",
  path: "/projects",
});

export default async function ProjectsPage() {
  const [projects, github] = await Promise.all([getProjects(), getGitHubOverview()]);
  const categories = [...new Set(projects.map((p) => p.category))];
  // Featured repositories that don't already have a case study on this page.
  const moreRepos = github?.featured.filter((repo) => !repo.projectSlug) ?? [];

  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title={
          <>
            Case studies, <span className="text-gradient">not just screenshots</span>
          </>
        }
        description="Every project here is written up end-to-end: the question behind it, how the data was prepared, the pipeline, and what came out of it."
      >
        {categories.length > 0 && (
          <ul className="flex flex-wrap gap-2" aria-label="Project categories">
            {categories.map((category) => (
              <li key={category} className="rounded-full border border-line bg-surface/60 px-3.5 py-1.5 text-sm text-fg-2">
                {category}
                <span className="ml-2 font-mono text-xs text-muted">{projects.filter((p) => p.category === category).length}</span>
              </li>
            ))}
          </ul>
        )}
      </PageHeader>

      <Section className="pt-4 sm:pt-6">
        {projects.length > 0 ? (
          <ProjectGrid projects={projects} />
        ) : (
          <EmptyState icon={<Layers size={20} />} title="No projects yet">
            Projects will appear here soon.
          </EmptyState>
        )}
      </Section>

      {moreRepos.length > 0 && (
        <Section divider labelledBy="repos-title">
          <SectionHeading
            id="repos-title"
            eyebrow="Also on GitHub"
            title="More repositories"
            description="Selected public work pulled live from GitHub."
            action={github ? { href: github.profileUrl, label: "GitHub profile" } : undefined}
          />
          <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {moreRepos.map((repo, i) => (
              <Reveal as="li" key={repo.name} delay={(i % 3) * 0.06}>
                <RepoCard repo={repo} />
              </Reveal>
            ))}
          </ul>
        </Section>
      )}

      <Section divider className="pb-8 sm:pb-12">
        <ContactCTA />
      </Section>
    </>
  );
}
