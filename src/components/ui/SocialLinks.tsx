import { Mail, socialIcons } from "@/components/icons";
import type { Social } from "@/lib/schemas";
import { cn } from "@/lib/utils";

type SocialLinksProps = {
  socials: Social[];
  email?: string;
  className?: string;
};

export function SocialLinks({ socials, email, className }: SocialLinksProps) {
  const itemClass =
    "inline-flex size-10 items-center justify-center rounded-full border border-line text-fg-2 transition-all duration-300 " +
    "hover:-translate-y-0.5 hover:border-primary-soft/60 hover:bg-primary/15 hover:text-fg";

  return (
    <ul className={cn("flex items-center gap-2.5", className)}>
      {socials.map((social) => {
        const Icon = socialIcons[social.icon];
        return (
          <li key={social.url}>
            <a href={social.url} target="_blank" rel="noopener noreferrer me" className={itemClass} aria-label={`${social.label} (opens in new tab)`}>
              <Icon size={17} />
            </a>
          </li>
        );
      })}
      {email && (
        <li>
          <a href={`mailto:${email}`} className={itemClass} aria-label={`Email ${email}`}>
            <Mail size={17} />
          </a>
        </li>
      )}
    </ul>
  );
}
