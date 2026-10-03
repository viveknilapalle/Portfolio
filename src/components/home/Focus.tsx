import { focusIcons } from "@/components/icons";
import { Reveal } from "@/components/ui/Reveal";
import type { Profile } from "@/lib/schemas";

/** "What I build" — three columns separated by hairlines rather than three more cards. */
export function Focus({ items }: { items: Profile["focus"] }) {
  if (items.length === 0) return null;

  return (
    <ul className="grid grid-cols-1 overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-3 md:gap-px">
      {items.map((item, index) => {
        const Icon = focusIcons[item.icon];
        return (
          <Reveal as="li" key={item.title} delay={index * 0.08} className="border-line bg-base p-7 not-last:border-b sm:p-8 md:not-last:border-b-0">
            <div className="flex size-11 items-center justify-center rounded-xl border border-primary/30 bg-gradient-to-br from-primary/20 to-accent/10 text-primary-soft">
              <Icon size={20} />
            </div>
            <h3 className="mt-6 text-lg font-semibold text-fg">{item.title}</h3>
            <p className="mt-2.5 leading-relaxed text-muted">{item.description}</p>
            {item.technologies.length > 0 && (
              <p className="mt-5 font-mono text-xs text-primary-soft">{item.technologies.join(" / ")}</p>
            )}
          </Reveal>
        );
      })}
    </ul>
  );
}
