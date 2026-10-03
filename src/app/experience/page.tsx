import Link from "next/link";
import { ExperienceItem } from "@/components/experience/ExperienceItem";
import { ArrowUpRight, Award, Briefcase, GraduationCap } from "@/components/icons";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { ButtonLink } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getExperience, getProfile, getProjects } from "@/lib/content";
import { pageMetadata } from "@/lib/site";
import { formatDate } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Experience",
  description: "Education, certifications and hands-on project work in data analytics and machine learning.",
  path: "/experience",
});

export default async function ExperiencePage() {
  const [experience, profile, projects] = await Promise.all([getExperience(), getProfile(), getProjects()]);
  const hasWork = experience.work.length > 0;

  return (
    <>
      <PageHeader
        eyebrow="Experience"
        title={hasWork ? "Where I've worked and studied" : "Education, certifications & hands-on work"}
        description={profile.availability ? `${profile.availability}.` : undefined}
      >
        <ButtonLink href={profile.resume} variant="secondary">
          View full resume
          <ArrowUpRight size={16} />
        </ButtonLink>
      </PageHeader>

      {hasWork && (
        <Section className="pt-4 sm:pt-8" labelledBy="work-title">
          <SectionHeading id="work-title" eyebrow="Work" title="Professional experience" />
          <ol className="mt-12">
            {experience.work.map((job, i) => (
              <ExperienceItem
                key={`${job.company}-${job.start}`}
                title={job.role}
                organization={job.location ? `${job.company} · ${job.location}` : job.company}
                period={`${job.start} — ${job.end}`}
                description={job.description}
                responsibilities={job.responsibilities}
                technologies={job.technologies}
                icon={<Briefcase size={14} />}
                last={i === experience.work.length - 1}
              />
            ))}
          </ol>
        </Section>
      )}

      {projects.length > 0 && (
        <Section className={hasWork ? undefined : "pt-4 sm:pt-8"} divider={hasWork} labelledBy="hands-on-title">
          <SectionHeading
            id="hands-on-title"
            eyebrow="Hands-on"
            title="Project experience"
            description="End-to-end projects, each with a written case study."
          />
          <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {projects.map((project, i) => (
              <Reveal as="li" key={project.slug} delay={i * 0.06}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="group flex h-full flex-col rounded-3xl border border-line bg-surface/50 p-6 transition-all hover:-translate-y-0.5 hover:border-line-strong hover:bg-surface"
                >
                  <span className="flex items-center justify-between font-mono text-xs text-muted">
                    <span className="text-primary-soft">{project.category}</span>
                    {project.date && <time dateTime={project.date}>{formatDate(project.date)}</time>}
                  </span>
                  <span className="mt-4 font-display text-lg font-semibold text-fg">{project.title}</span>
                  <span className="mt-2 text-sm leading-relaxed text-muted">{project.technologies.slice(0, 4).join(" · ")}</span>
                  <span className="mt-auto flex items-center gap-1.5 pt-5 text-sm text-primary-soft group-hover:text-fg">
                    Case study
                    <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Section>
      )}

      {experience.education.length > 0 && (
        <Section divider labelledBy="education-title">
          <SectionHeading id="education-title" eyebrow="Education" title="Academic timeline" />
          <ol className="mt-12">
            {experience.education.map((entry, i) => (
              <ExperienceItem
                key={entry.institution}
                title={entry.credential}
                organization={entry.institution}
                period={`${entry.start} — ${entry.end}`}
                meta={entry.score}
                description={entry.description}
                icon={<GraduationCap size={14} />}
                last={i === experience.education.length - 1}
              />
            ))}
          </ol>
        </Section>
      )}

      {experience.certifications.length > 0 && (
        <Section divider labelledBy="certs-title">
          <SectionHeading id="certs-title" eyebrow="Certifications" title="Courses completed" />
          <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {experience.certifications.map((cert, i) => (
              <Reveal as="li" key={cert.name} delay={(i % 2) * 0.06}>
                <div className="flex h-full items-start gap-4 rounded-2xl border border-line bg-surface/50 p-5">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent-soft">
                    <Award size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-fg">
                      {cert.url ? (
                        <a href={cert.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary-soft">
                          {cert.name}
                        </a>
                      ) : (
                        cert.name
                      )}
                    </p>
                    <p className="mt-1 font-mono text-xs text-muted">
                      {cert.issuer}
                      {cert.date && ` · ${formatDate(cert.date)}`}
                    </p>
                  </div>
                </div>
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
