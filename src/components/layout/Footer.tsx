import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { getProfile } from "@/lib/content";
import { footerItems } from "@/lib/navigation";
import { sourceRepoUrl } from "@/lib/site";

export async function Footer() {
  const profile = await getProfile();
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-12 border-t border-line bg-base-2/60">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <Container className="grid grid-cols-1 gap-12 py-14 md:grid-cols-[1.4fr_1fr]">
        <div className="max-w-sm">
          <Link href="/" className="font-display text-lg font-semibold text-fg">
            {profile.name}
          </Link>
          <p className="mt-3 text-sm leading-relaxed text-muted">{profile.role}</p>
          <a href={`mailto:${profile.email}`} className="mt-4 inline-block text-sm text-primary-soft underline-offset-4 hover:text-fg hover:underline">
            {profile.email}
          </a>
          <SocialLinks socials={profile.socials} className="mt-6" />
        </div>

        <nav aria-label="Footer">
          <p className="eyebrow mb-4">Explore</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-3 md:grid-cols-2">
            {footerItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-fg-2 transition-colors hover:text-fg">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="text-sm text-fg-2 transition-colors hover:text-fg">
                Resume
              </a>
            </li>
          </ul>
        </nav>
      </Container>

      <Container>
        <div className="flex flex-col gap-2 border-t border-line py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.name}
          </p>
          <p>
            Built with Next.js & Tailwind CSS · content managed in{" "}
            <a href={sourceRepoUrl} target="_blank" rel="noopener noreferrer" className="text-fg-2 underline-offset-4 hover:text-fg hover:underline">
              Git
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
