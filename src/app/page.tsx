import Link from "next/link";
import { GitHubStats } from "@/components/github/GitHubPanel";
import { ExperienceSnapshot } from "@/components/home/ExperienceSnapshot";
import { Focus } from "@/components/home/Focus";
import { Hero } from "@/components/home/Hero";
import { ArrowRight } from "@/components/icons";
import { LabCard } from "@/components/lab/LabCard";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { SkillGroup } from "@/components/skills/SkillGroup";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PostCard } from "@/components/writing/PostCard";
import { getExperience, getFeaturedProjects, getLabEntries, getPosts, getProfile, getSkills } from "@/lib/content";
import { getGitHubOverview } from "@/lib/github";

export default async function HomePage() {
  const [profile, projects, skills, experience, lab, posts, github] = await Promise.all([
    getProfile(),
    getFeaturedProjects(),
    getSkills(),
    getExperience(),
    getLabEntries(),
    getPosts(),
    getGitHubOverview(),
  ]);

  return (
    <>
      <Hero profile={profile} education={experience.education[0]} />

      <Section labelledBy="work-title" className="pt-8 sm:pt-12">
        <SectionHeading
          id="work-title"
          eyebrow="01 — Selected work"
          title="Projects that start with a question"
          description="Each one is a full case study: the problem, the approach, the pipeline and what the data actually said."
          action={{ href: "/projects", label: "All projects" }}
        />
        <div className="mt-12">
          <ProjectGrid projects={projects.slice(0, 3)} />
        </div>
      </Section>

      {profile.focus.length > 0 && (
        <Section labelledBy="focus-title" divider>
          <SectionHeading id="focus-title" eyebrow="02 — Focus" title="What I build" description={profile.summary} />
          <div className="mt-12">
            <Focus items={profile.focus} />
          </div>
        </Section>
      )}

      <Section labelledBy="skills-title" divider>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading
            id="skills-title"
            eyebrow="03 — Toolkit"
            title="Technical skills"
            description="Grouped by what they're for. Highlighted skills on the full page link to the projects where they were used."
            action={{ href: "/skills", label: "Explore skills" }}
            className="lg:flex-col lg:items-start lg:justify-start"
          />
          <Reveal className="divide-y divide-line border-y border-line">
            {skills.groups.slice(0, 6).map((group) => (
              <SkillGroup key={group.id} group={group} compact />
            ))}
          </Reveal>
        </div>
      </Section>

      <Section labelledBy="experience-title" divider>
        <SectionHeading
          id="experience-title"
          eyebrow="04 — Background"
          title="Experience snapshot"
          action={{ href: "/experience", label: "Experience & education" }}
        />
        <div className="mt-12">
          <ExperienceSnapshot experience={experience} />
        </div>
      </Section>

      {lab.length > 0 && (
        <Section labelledBy="lab-title" divider>
          <SectionHeading
            id="lab-title"
            eyebrow="05 — Lab"
            title="Experiments & smaller builds"
            description="Exploratory analyses, ML experiments and web apps built while learning."
            action={{ href: "/lab", label: "Open the lab" }}
          />
          <div className={github ? "mt-12 grid grid-cols-1 gap-5 lg:grid-cols-[1.6fr_1fr]" : "mt-12"}>
            <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {lab.slice(0, 4).map((entry, i) => (
                <Reveal as="li" key={entry.title} delay={(i % 2) * 0.06}>
                  <LabCard entry={entry} />
                </Reveal>
              ))}
            </ul>
            {github && (
              <Reveal delay={0.1}>
                <GitHubStats overview={github} className="h-full" />
              </Reveal>
            )}
          </div>
        </Section>
      )}

      {posts.length > 0 && (
        <Section labelledBy="writing-title" divider>
          <SectionHeading id="writing-title" eyebrow="06 — Writing" title="Latest notes" action={{ href: "/writing", label: "All writing" }} />
          <div className="mt-6 border-t border-line">
            {posts.slice(0, 3).map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </Section>
      )}

      <Section labelledBy="contact-cta-title" className="pb-8 sm:pb-12">
        <ContactCTA />
        <p className="mt-8 text-center text-sm text-muted">
          Prefer the long version?{" "}
          <Link href="/about" className="group inline-flex items-center gap-1 text-primary-soft hover:text-fg">
            Read more about me
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </p>
      </Section>
    </>
  );
}
