import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn, isExternal } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group/button inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap select-none " +
  "transition-[transform,background-color,border-color,color,box-shadow] duration-300 ease-out-soft " +
  "active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-primary to-primary-dark text-white shadow-[0_8px_24px_-10px_rgb(108_99_255/0.8)] " +
    "hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-12px_rgb(108_99_255/0.9)] hover:from-[#7a72ff] hover:to-primary",
  secondary:
    "border border-line-strong bg-surface/60 text-fg backdrop-blur hover:-translate-y-0.5 hover:border-primary-soft/60 hover:bg-surface-2",
  ghost: "text-fg-2 hover:text-fg hover:bg-white/5",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-12 px-6 text-base",
};

export function buttonClasses({ variant = "primary", size = "md", className }: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href"> & {
  href: string;
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

/**
 * Link styled as a button. External URLs open in a new tab with safe `rel`;
 * internal routes use Next.js client navigation.
 */
export function ButtonLink({ href, variant, size, className, children, ...props }: ButtonLinkProps) {
  const classes = buttonClasses({ variant, size, className });
  const isFile = /\.(pdf|zip)$/i.test(href);

  if (isExternal(href) || isFile) {
    const opensTab = href.startsWith("http") || isFile;
    return (
      <a
        href={href}
        className={classes}
        {...(opensTab && { target: "_blank", rel: "noopener noreferrer" })}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
