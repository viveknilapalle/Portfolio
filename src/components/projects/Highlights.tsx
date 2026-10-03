import { cn } from "@/lib/utils";

type Highlight = { value: string; label: string };

const columns: Record<number, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
};

/** Key facts strip (dataset size, KPIs, etc.) taken verbatim from front matter. */
export function Highlights({ items }: { items: Highlight[] }) {
  if (items.length === 0) return null;
  const visible = items.slice(0, 4);

  return (
    <dl
      className={cn(
        "grid gap-px overflow-hidden rounded-3xl border border-line bg-line",
        visible.length === 1 ? "grid-cols-1" : "grid-cols-2",
        columns[visible.length],
      )}
    >
      {visible.map((item) => (
        <div key={item.label} className={cn("flex flex-col-reverse gap-1 bg-surface p-5 sm:p-7", visible.length === 3 && "last:col-span-2 md:last:col-span-1")}>
          <dt className="text-sm leading-snug text-muted">{item.label}</dt>
          <dd className="font-display text-2xl font-semibold sm:text-3xl">
            <span className="text-gradient">{item.value}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
