import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, GitHub } from "@/components/icons";
import { Gallery } from "@/components/projects/Gallery";
import { Highlights } from "@/components/projects/Highlights";
import { ProjectHero } from "@/components/projects/ProjectHero";
import { Workflow } from "@/components/projects/Workflow";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { getProject, getProjects } from "@/lib/content";
import { pageMetadata } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getProjects()).map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params) {
  const project = await getProject((await params).slug);
  if (!project) return {};
  return pageMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
    type: "article",
    image: project.image ? { url: project.image, alt: project.imageAlt ?? project.title } : undefined,
  });
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const [project, projects] = await Promise.all([getProject(slug), getProjects()]);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const previous = index > 0 ? projects[index - 1] : undefined;
  const next = index < projects.length - 1 ? projects[index + 1] : undefined;

  // Each section renders only when its content exists in the front matter / body.
  const sections: { id: string; title: string; content: ReactNode }[] = [];
  if (project.problem) sections.push({ id: "problem", title: "Problem", content: <Lead>{project.problem}</Lead> });
  if (project.approach || project.solution)
    sections.push({
      id: "approach",
      title: "Approach",
      content: (
        <div className="space-y-4">
          {project.approach && <Lead>{project.approach}</Lead>}
          {project.solution && <Lead>{project.solution}</Lead>}
        </div>
      ),
    });
  if (project.workflow.length > 0 || project.architecture)
    sections.push({
      id: "architecture",
      title: "Architecture & workflow",
      content: (
        <div className="space-y-8">
          {project.workflow.length > 0 && (
            <div className="rounded-3xl border border-line bg-surface/50 p-6 sm:p-8">
              <Workflow steps={project.workflow} />
            </div>
          )}
          {project.architecture && (
            <figure className="overflow-hidden rounded-3xl border border-line bg-surface">
              <div className="relative aspect-[16/9]">
                <Image src={project.architecture.src} alt={project.architecture.alt} fill sizes="(min-width: 1024px) 800px, 100vw" className="object-contain p-4" />
              </div>
              {project.architecture.caption && <figcaption className="border-t border-line px-5 py-3 text-sm text-muted">{project.architecture.caption}</figcaption>}
            </figure>
          )}
        </div>
      ),
    });
  if (project.html)
    sections.push({
      id: "implementation",
      title: "Implementation",
      content: <div className="prose prose-portfolio max-w-none prose-headings:font-display" dangerouslySetInnerHTML={{ __html: project.html }} />,
    });
  if (project.challenges.length > 0) sections.push({ id: "challenges", title: "Challenges", content: <Bullets items={project.challenges} /> });
  if (project.outcome || project.findings.length > 0)
    sections.push({
      id: "outcome",
      title: "Result & findings",
      content: (
        <div className="space-y-6">
          {project.outcome && <Lead>{project.outcome}</Lead>}
          {project.findings.length > 0 && (
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {project.findings.map((finding, i) => (
                <li key={finding} className="flex gap-4 rounded-2xl border border-line bg-surface/50 p-5 text-[0.95rem] leading-relaxed text-fg-2">
                  <span className="font-mono text-xs text-accent-soft">{String(i + 1).padStart(2, "0")}</span>
                  {finding}
                </li>
              ))}
            </ul>
          )}
        </div>
      ),
    });
  if (project.gallery.length > 0) sections.push({ id: "gallery", title: "Screens", content: <Gallery images={project.gallery} /> });
  if (project.learnings.length > 0) sections.push({ id: "learnings", title: "Learnings", content: <Bullets items={project.learnings} /> });
  if (project.nextSteps.length > 0) sections.push({ id: "next-steps", title: "What's next", content: <Bullets items={project.nextSteps} /> });

  return (
    <article>
      <ProjectHero project={project} />

      {project.highlights.length > 0 && (
        <Container className="mt-16 sm:mt-20">
          <Reveal>
            <Highlights items={project.highlights} />
          </Reveal>
        </Container>
      )}

      <Container className="mt-16 grid grid-cols-1 gap-12 sm:mt-24 lg:grid-cols-[12rem_1fr] lg:gap-16">
        {sections.length > 1 && (
          <nav aria-label="On this page" className="hidden lg:block">
            <div className="sticky top-28">
              <p className="eyebrow">On this page</p>
              <ol className="mt-4 space-y-1 border-l border-line">
                {sections.map((section, i) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`} className="-ml-px block border-l border-transparent py-1.5 pl-4 text-sm text-muted transition-colors hover:border-primary-soft hover:text-fg">
                      <span className="mr-2 font-mono text-xs text-primary-soft/70">{String(i + 1).padStart(2, "0")}</span>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>
        )}

        <div className="min-w-0 space-y-20 sm:space-y-24">
          {sections.map((section, i) => (
            <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`}>
              <Reveal>
                <div className="mb-7 flex items-baseline gap-4">
                  <span className="font-mono text-sm text-primary-soft">{String(i + 1).padStart(2, "0")}</span>
                  <h2 id={`${section.id}-title`} className="text-2xl font-semibold text-fg sm:text-3xl">
                    {section.title}
                  </h2>
                </div>
                {section.content}
              </Reveal>
            </section>
          ))}

          {(project.github || project.demo) && (
            <Reveal>
              <div className="gradient-border flex flex-col gap-6 rounded-3xl bg-surface/60 p-7 [--border-opacity:0.8] sm:flex-row sm:items-center sm:justify-between sm:p-9">
                <div>
                  <p className="font-display text-xl font-semibold text-fg">Explore the project</p>
                  <p className="mt-1.5 text-muted">Code, data and notebooks are public.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {project.github && (
                    <ButtonLink href={project.github}>
                      <GitHub size={16} />
                      GitHub repository
                    </ButtonLink>
                  )}
                  {project.demo && (
                    <ButtonLink href={project.demo} variant="secondary">
                      Live demo
                      <ArrowUpRight size={16} />
                    </ButtonLink>
                  )}
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </Container>

      {(previous || next) && (
        <Container as="nav" aria-label="More projects" className="mt-24 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {previous ? <ProjectLink project={previous} direction="previous" /> : <span className="hidden sm:block" />}
          {next && <ProjectLink project={next} direction="next" />}
        </Container>
      )}
    </article>
  );
}

function Lead({ children }: { children: ReactNode }) {
  return <p className="max-w-3xl text-lg leading-relaxed text-fg-2">{children}</p>;
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-4 text-lg leading-relaxed text-fg-2">
          <span aria-hidden="true" className="mt-3.5 h-px w-4 shrink-0 bg-gradient-to-r from-primary to-accent" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function ProjectLink({ project, direction }: { project: { slug: string; title: string; category: string }; direction: "previous" | "next" }) {
  const isNext = direction === "next";
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group flex flex-col gap-2 rounded-3xl border border-line bg-surface/40 p-6 transition-all hover:-translate-y-0.5 hover:border-line-strong hover:bg-surface ${isNext ? "sm:items-end sm:text-right" : ""}`}
    >
      <span className="flex items-center gap-2 font-mono text-xs text-muted">
        {!isNext && <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />}
        {isNext ? "Next project" : "Previous project"}
        {isNext && <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />}
      </span>
      <span className="font-display text-lg font-semibold text-fg">{project.title}</span>
      <span className="text-sm text-muted">{project.category}</span>
    </Link>
  );
}
