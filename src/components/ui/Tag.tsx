import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type TagProps = {
  children: ReactNode;
  tone?: "default" | "primary" | "accent";
  className?: string;
};

const tones = {
  default: "border-line bg-white/[0.03] text-fg-2",
  primary: "border-primary/30 bg-primary/10 text-primary-soft",
  accent: "border-accent/30 bg-accent/10 text-accent-soft",
};

export function Tag({ children, tone = "default", className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[0.72rem] leading-5 tracking-tight",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function TagList({ items, limit, className }: { items: string[]; limit?: number; className?: string }) {
  const visible = limit ? items.slice(0, limit) : items;
  const hidden = items.length - visible.length;
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)} aria-label="Technologies">
      {visible.map((item) => (
        <li key={item}>
          <Tag>{item}</Tag>
        </li>
      ))}
      {hidden > 0 && (
        <li>
          <Tag className="text-muted">+{hidden}</Tag>
        </li>
      )}
    </ul>
  );
}
