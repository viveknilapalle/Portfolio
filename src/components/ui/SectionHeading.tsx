import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "@/components/icons";
import { cn, isExternal } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  action?: { href: string; label: string };
  as?: "h2" | "h3";
  id?: string;
  className?: string;
};

export function SectionHeading({ eyebrow, title, description, action, as: Heading = "h2", id, className }: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between", className)}>
      <div className="max-w-2xl">
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <Heading id={id} className="text-2xl font-semibold text-fg sm:text-3xl md:text-[2.1rem] md:leading-tight">
          {title}
        </Heading>
        {description && <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">{description}</p>}
      </div>
      {action && (
        <Link
          href={action.href}
          {...(isExternal(action.href) && { target: "_blank", rel: "noopener noreferrer" })}
          className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-primary-soft transition-colors hover:text-fg"
        >
          {action.label}
          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
