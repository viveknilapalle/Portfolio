import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, GraduationCap, Mail, MapPin } from "@/components/icons";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { ButtonLink } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { getExperience, getProfile } from "@/lib/content";
import { pageMetadata } from "@/lib/site";

export async function generateMetadata() {
  const profile = await getProfile();
  return pageMetadata({ title: "About", description: `About ${profile.name}: background, education, interests and what I'm learning now.`, path: "/about" });
}

export default async function AboutPage() {
  const [profile, experience] = await Promise.all([getProfile(), getExperience()]);
  const [degree] = experience.education;

  const facts = [
    { icon: MapPin, label: "Based in", value: profile.location },
    degree && { icon: GraduationCap, label: "Education", value: `${degree.short ?? degree.credential}, ${degree.end}` },
    { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  ].filter(Boolean) as { icon: typeof MapPin; label: string; value: string; href?: string }[];

  return (
    <>
      <PageHeader eyebrow="About" title={profile.about.headline} description={profile.summary}>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={profile.resume}>
            <Download size={16} />
            Download resume
          </ButtonLink>
          <ButtonLink href="/projects" variant="secondary">
            See the work
            <ArrowRight size={16} />
          </ButtonLink>
        </div>
      </PageHeader>

      <Section className="pt-4 sm:pt-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-3xl border border-line bg-surface">
              <div className="relative aspect-[5/4]">
                <Image
                  src="/images/about-banner.png"
                  alt="Illustration of a developer at a laptop surrounded by Python, SQL, machine-learning and dashboard visuals"
                  fill
                  sizes="(min-width: 1024px) 460px, 100vw"
                  className="object-cover"
                />
              </div>
              <dl className="divide-y divide-line">
                {facts.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-center gap-4 px-6 py-4">
                    <Icon size={18} className="shrink-0 text-primary-soft" />
                    <dt className="w-24 shrink-0 text-sm text-muted">{label}</dt>
                    <dd className="min-w-0 truncate text-sm text-fg-2">
                      {href ? (
                        <a href={href} className="hover:text-fg">
                          {value}
                        </a>
                      ) : (
                        value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <h2 className="eyebrow">Background</h2>
              <div className="mt-5 space-y-5 text-lg leading-relaxed text-fg-2">
                {profile.about.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </div>
            </Reveal>

            {profile.about.interests.length > 0 && (
              <Reveal className="mt-14">
                <h2 className="eyebrow">Interests</h2>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {profile.about.interests.map((interest) => (
                    <li key={interest}>
                      <Tag tone="primary" className="px-3 py-1 text-[0.8rem]">
                        {interest}
                      </Tag>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {profile.about.learning.length > 0 && (
              <Reveal className="mt-14">
                <h2 className="eyebrow">Currently deepening</h2>
                <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {profile.about.learning.map((item) => (
                    <li key={item.title} className="rounded-2xl border border-line bg-surface/50 p-5">
                      <p className="font-semibold text-fg">{item.title}</p>
                      {item.detail && <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.detail}</p>}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {experience.education.length > 0 && (
              <Reveal className="mt-14">
                <h2 className="eyebrow">Education</h2>
                <ul className="mt-5 divide-y divide-line border-y border-line">
                  {experience.education.map((entry) => (
                    <li key={entry.institution} className="grid grid-cols-1 gap-1 py-5 sm:grid-cols-[1fr_auto] sm:gap-6">
                      <div>
                        <p className="font-semibold text-fg">{entry.credential}</p>
                        <p className="mt-0.5 text-sm text-muted">{entry.institution}</p>
                      </div>
                      <div className="font-mono text-xs text-muted sm:text-right">
                        <p>
                          {entry.start} — {entry.end}
                        </p>
                        {entry.score && <p className="mt-1 text-accent-soft">{entry.score}</p>}
                      </div>
                    </li>
                  ))}
                </ul>
                <Link href="/experience" className="group mt-5 inline-flex items-center gap-1.5 text-sm text-primary-soft hover:text-fg">
                  Certifications & full timeline
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Reveal>
            )}
          </div>
        </div>
      </Section>

      <Section divider className="pb-8 sm:pb-12">
        <ContactCTA />
      </Section>
    </>
  );
}
