import type { ReactNode } from "react";
import { Container } from "./Container";

type PageHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
};

/** Shared header for top-level pages: eyebrow, title, lead paragraph and optional actions. */
export function PageHeader({ eyebrow, title, description, children }: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden pt-32 pb-12 sm:pt-40 sm:pb-16">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="glow-primary pointer-events-none absolute -top-40 left-1/2 h-[28rem] w-[48rem] -translate-x-1/2" />
      <Container className="relative">
        <p className="eyebrow animate-enter">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl animate-enter text-4xl font-semibold leading-[1.08] text-fg [animation-delay:60ms] sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl animate-enter text-lg leading-relaxed text-muted [animation-delay:120ms]">{description}</p>
        )}
        {children && <div className="mt-8 animate-enter [animation-delay:180ms]">{children}</div>}
      </Container>
    </header>
  );
}
