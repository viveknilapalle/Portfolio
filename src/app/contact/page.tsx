import { ContactComposer } from "@/components/contact/ContactComposer";
import { CopyButton } from "@/components/contact/CopyButton";
import { ArrowUpRight, Download, Mail, MapPin, Phone, socialIcons } from "@/components/icons";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { getProfile } from "@/lib/content";
import { pageMetadata } from "@/lib/site";

export async function generateMetadata() {
  const profile = await getProfile();
  return pageMetadata({ title: "Contact", description: `Get in touch with ${profile.name} by email, LinkedIn or GitHub.`, path: "/contact" });
}

export default async function ContactPage() {
  const profile = await getProfile();

  const row =
    "group relative flex items-center gap-4 rounded-2xl border border-line bg-surface/50 p-4 transition-all hover:border-line-strong hover:bg-surface sm:p-5";
  const iconBox = "flex size-11 shrink-0 items-center justify-center rounded-xl border border-line bg-base text-primary-soft";

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Let&apos;s <span className="text-gradient">talk data</span>
          </>
        }
        description={`${profile.availability ? `${profile.availability}. ` : ""}Whether it's a role, a project or a question about one of my case studies, my inbox is open.`}
      />

      <Section className="pt-0 sm:pt-4">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
          <Reveal>
            <h2 className="eyebrow">Direct</h2>
            <ul className="mt-5 space-y-3">
              <li className={row}>
                <span className={iconBox}>
                  <Mail size={18} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted">Email</p>
                  <a href={`mailto:${profile.email}`} className="block truncate text-fg after:absolute after:inset-0 after:content-[''] hover:text-primary-soft">
                    {profile.email}
                  </a>
                </div>
                <CopyButton value={profile.email} label="email address" />
              </li>

              {profile.socials.map((social) => {
                const Icon = socialIcons[social.icon];
                return (
                  <li key={social.url} className={row}>
                    <span className={iconBox}>
                      <Icon size={18} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-muted">{social.label}</p>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer me"
                        className="block truncate text-fg after:absolute after:inset-0 after:content-[''] group-hover:text-primary-soft"
                      >
                        {social.handle ?? social.url}
                        <span className="sr-only"> (opens in new tab)</span>
                      </a>
                    </div>
                    <ArrowUpRight size={18} aria-hidden="true" className="text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg" />
                  </li>
                );
              })}

              {profile.phone && (
                <li className={row}>
                  <span className={iconBox}>
                    <Phone size={18} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted">Phone</p>
                    <a href={`tel:${profile.phone.replace(/\s+/g, "")}`} className="block text-fg after:absolute after:inset-0 after:content-[''] group-hover:text-primary-soft">
                      {profile.phone}
                    </a>
                  </div>
                </li>
              )}
            </ul>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-dashed border-line-strong px-5 py-4">
              <p className="flex items-center gap-2 text-sm text-fg-2">
                <MapPin size={16} className="text-primary-soft" />
                {profile.location}
              </p>
              <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-primary-soft hover:text-fg">
                <Download size={16} />
                Resume (PDF)
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="gradient-border rounded-3xl bg-surface/60 p-6 [--border-opacity:0.7] sm:p-8">
              <h2 className="font-display text-xl font-semibold text-fg">Write a message</h2>
              <p className="mt-1.5 mb-7 text-sm text-muted">Drafts an email to {profile.email}.</p>
              <ContactComposer email={profile.email} />
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
