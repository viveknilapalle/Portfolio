import { ArrowRight, Download, Mail } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { getProfile } from "@/lib/content";

export async function ContactCTA({ title = "Have a dataset that needs answers?" }: { title?: string }) {
  const profile = await getProfile();

  return (
    <Reveal>
      <div className="gradient-border relative overflow-hidden rounded-[2rem] bg-surface/70 px-6 py-12 [--border-opacity:0.8] sm:px-12 sm:py-16">
        <div aria-hidden="true" className="glow-primary pointer-events-none absolute -top-32 -right-24 h-96 w-[32rem]" />
        <div aria-hidden="true" className="glow-accent pointer-events-none absolute -bottom-40 -left-20 h-96 w-[28rem]" />
        <div className="relative grid grid-cols-1 items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="eyebrow">Contact</p>
            <h2 id="contact-cta-title" className="mt-4 text-3xl font-semibold text-fg sm:text-4xl">{title}</h2>
            {profile.availability && <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">{profile.availability}. The fastest way to reach me is email.</p>}
          </div>
          <div className="flex flex-col gap-5 lg:items-end">
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={`mailto:${profile.email}`} size="lg">
                <Mail size={17} />
                Email me
              </ButtonLink>
              <ButtonLink href={profile.resume} variant="secondary" size="lg">
                <Download size={17} />
                Resume
              </ButtonLink>
            </div>
            <div className="flex items-center gap-4">
              <SocialLinks socials={profile.socials} />
              <ButtonLink href="/contact" variant="ghost" size="sm">
                All contact options
                <ArrowRight size={15} />
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
