import type { ReactNode } from "react";
import { TagList } from "@/components/ui/Tag";
import { cn } from "@/lib/utils";

type ExperienceItemProps = {
  title: string;
  organization: string;
  period: string;
  meta?: string;
  description?: string;
  responsibilities?: string[];
  technologies?: string[];
  icon?: ReactNode;
  last?: boolean;
};

/** One entry on a vertical timeline — used for both work and education. */
export function ExperienceItem({
  title,
  organization,
  period,
  meta,
  description,
  responsibilities = [],
  technologies = [],
  icon,
  last = false,
}: ExperienceItemProps) {
  return (
    <li className="relative grid grid-cols-1 gap-x-8 gap-y-2 pl-10 md:grid-cols-[9rem_1fr] md:pl-0">
      {/* Period (left column on desktop) */}
      <p className="font-mono text-xs tracking-wide text-muted md:pt-1.5 md:text-right">{period}</p>

      <div className={cn("relative md:pl-10", !last && "pb-12")}>
        {/* Rail + node */}
        <span
          aria-hidden="true"
          className={cn(
            "absolute top-1 -left-10 flex size-7 items-center justify-center rounded-full border border-primary/50 bg-base text-primary-soft md:left-[-14px]",
          )}
        >
          {icon ?? <span className="size-2 rounded-full bg-gradient-to-br from-primary to-accent" />}
        </span>
        {!last && (
          <span aria-hidden="true" className="absolute top-9 bottom-0 -left-[27px] w-px bg-gradient-to-b from-primary/50 via-line to-transparent md:left-[-1px]" />
        )}

        <h3 className="text-lg font-semibold text-fg">{title}</h3>
        <p className="mt-1 text-fg-2">{organization}</p>
        {meta && (
          <p className="mt-3 inline-flex rounded-full border border-accent/25 bg-accent/10 px-2.5 py-0.5 font-mono text-xs text-accent-soft">{meta}</p>
        )}
        {description && <p className="mt-3 leading-relaxed text-muted">{description}</p>}
        {responsibilities.length > 0 && (
          <ul className="mt-4 space-y-2">
            {responsibilities.map((item) => (
              <li key={item} className="flex gap-3 text-[0.95rem] leading-relaxed text-fg-2">
                <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-primary" />
                {item}
              </li>
            ))}
          </ul>
        )}
        {technologies.length > 0 && <TagList items={technologies} className="mt-5" />}
      </div>
    </li>
  );
}
