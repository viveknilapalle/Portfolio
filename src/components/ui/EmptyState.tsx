import type { ReactNode } from "react";

export function EmptyState({ icon, title, children }: { icon?: ReactNode; title: string; children?: ReactNode }) {
  return (
    <div className="flex flex-col items-center rounded-3xl border border-dashed border-line-strong bg-surface/30 px-6 py-16 text-center">
      {icon && <div className="mb-5 flex size-12 items-center justify-center rounded-2xl border border-line bg-surface text-primary-soft">{icon}</div>}
      <p className="font-display text-xl font-semibold text-fg">{title}</p>
      {children && <div className="mt-2 max-w-md leading-relaxed text-muted">{children}</div>}
    </div>
  );
}
