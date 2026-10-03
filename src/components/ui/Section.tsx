import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

type SectionProps = {
  children: ReactNode;
  id?: string;
  labelledBy?: string;
  className?: string;
  containerClassName?: string;
  divider?: boolean;
};

export function Section({ children, id, labelledBy, className, containerClassName, divider = false }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("relative py-20 sm:py-28", className)}>
      {divider && (
        <div aria-hidden="true" className="absolute inset-x-0 top-0 mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-line-strong to-transparent" />
      )}
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
