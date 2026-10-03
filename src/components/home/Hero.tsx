import Image from "next/image";
import { ArrowRight, Download, GraduationCap, MapPin } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SocialLinks } from "@/components/ui/SocialLinks";
import type { EducationEntry, Profile } from "@/lib/schemas";

export function Hero({ profile, education }: { profile: Profile; education?: EducationEntry }) {
  const [firstName, ...rest] = profile.name.split(" ");
  const stack = profile.tagline?.split("·").map((s) => s.trim()) ?? [];

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pt-28 pb-20 sm:pt-36 lg:pt-44 lg:pb-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,#000_65%,transparent)]">
        <div className="bg-grid absolute inset-0" />
        <div className="glow-primary absolute -top-56 right-[-10%] h-[40rem] w-[52rem]" />
        <div className="glow-accent absolute top-1/2 left-[-20%] h-[30rem] w-[40rem]" />
      </div>

      <Container className="relative grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.3fr_1fr] lg:gap-12">
        <div>
          {profile.availability && (
            <p className="inline-flex animate-enter items-center gap-2.5 rounded-full border border-line bg-surface/70 py-1.5 pr-4 pl-3 text-xs text-fg-2 backdrop-blur sm:text-sm">
              <span aria-hidden="true" className="size-2 animate-pulse-dot rounded-full bg-emerald-400" />
              {profile.availability}
            </p>
          )}

          <h1 id="hero-title" className="mt-7 animate-enter text-[2.75rem] leading-[1.02] font-semibold text-fg [animation-delay:60ms] min-[400px]:text-5xl sm:text-6xl lg:text-7xl">
            {firstName} <span className="text-gradient">{rest.join(" ")}</span>
          </h1>
          <p className="mt-5 animate-enter font-display text-lg font-medium text-fg-2 [animation-delay:120ms] sm:text-xl">{profile.role}</p>
          <p className="mt-6 max-w-xl animate-enter text-base leading-relaxed text-muted [animation-delay:180ms] sm:text-lg">{profile.intro}</p>

          <div className="mt-9 flex animate-enter flex-wrap gap-3 [animation-delay:240ms]">
            <ButtonLink href="/projects" size="lg">
              View projects
              <ArrowRight size={17} className="transition-transform duration-300 group-hover/button:translate-x-0.5" />
            </ButtonLink>
            <ButtonLink href={profile.resume} variant="secondary" size="lg">
              <Download size={17} />
              Resume
            </ButtonLink>
          </div>

          <div className="mt-9 flex animate-enter flex-wrap items-center gap-x-6 gap-y-4 [animation-delay:300ms]">
            <SocialLinks socials={profile.socials} email={profile.email} />
            <p className="flex items-center gap-1.5 text-sm text-muted">
              <MapPin size={15} />
              {profile.location}
            </p>
          </div>
        </div>

        {/* Portrait */}
        <div className="relative mx-auto w-full max-w-[19rem] animate-enter [animation-delay:150ms] sm:max-w-sm lg:mr-0">
          <div aria-hidden="true" className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-primary/25 via-transparent to-accent/20 blur-2xl" />
          <div className="relative rounded-[2rem] bg-gradient-to-br from-primary-soft/70 via-primary/20 to-accent/70 p-px">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[calc(2rem-1px)] bg-surface">
              <Image
                src={profile.image}
                alt={`Portrait of ${profile.name}`}
                fill
                priority
                sizes="(min-width: 1024px) 384px, (min-width: 640px) 384px, 304px"
                className="object-cover object-[50%_25%]"
              />
              <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-base/70 to-transparent" />
            </div>
          </div>

          {education?.short && (
            <div className="absolute -top-4 -right-3 flex items-center gap-2 rounded-2xl border border-line-strong bg-base/85 px-3.5 py-2.5 text-xs shadow-xl backdrop-blur-md sm:-right-8">
              <GraduationCap size={16} className="text-primary-soft" />
              <span className="text-fg-2">
                {education.short} <span className="text-muted">· {education.end}</span>
              </span>
            </div>
          )}

          {stack.length > 0 && (
            <div aria-hidden="true" className="absolute -bottom-8 -left-3 w-[15.5rem] rounded-2xl border border-line-strong bg-base/90 p-4 font-mono text-[0.72rem] leading-relaxed shadow-2xl backdrop-blur-md sm:-left-12">
              <p className="mb-2 text-muted">
                <span className="text-accent-soft">●</span> toolkit.py
              </p>
              <p>
                <span className="text-primary-soft">focus</span> <span className="text-muted">=</span> [
              </p>
              {stack.map((item, i) => (
                <p key={item} className="pl-4">
                  <span className="text-emerald-300">&quot;{item}&quot;</span>
                  {i < stack.length - 1 && <span className="text-muted">,</span>}
                </p>
              ))}
              <p>]</p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
