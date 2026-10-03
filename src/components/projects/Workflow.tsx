type Step = { title: string; detail?: string };

/**
 * Renders a project's pipeline as a connected diagram: a vertical flow on small
 * screens and a horizontal one on wide screens. Driven entirely by the
 * `workflow` list in the project's front matter.
 */
export function Workflow({ steps }: { steps: Step[] }) {
  if (steps.length === 0) return null;

  return (
    <ol className="relative grid gap-3 lg:grid-flow-col lg:auto-cols-fr lg:gap-0">
      {steps.map((step, index) => {
        const last = index === steps.length - 1;
        return (
          <li key={step.title} className="relative flex gap-4 lg:flex-col lg:gap-0">
            {/* Node + connector */}
            <div className="relative flex flex-col items-center lg:flex-row lg:items-center" aria-hidden="true">
              <span className="relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full border border-primary/50 bg-base font-mono text-xs text-primary-soft shadow-[0_0_0_4px_var(--color-base)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              {!last && (
                <>
                  <span className="w-px flex-1 bg-gradient-to-b from-primary/60 to-accent/40 lg:hidden" />
                  <span className="hidden h-px flex-1 bg-gradient-to-r from-primary/60 to-accent/40 lg:block" />
                </>
              )}
            </div>

            <div className="pb-6 lg:pt-5 lg:pr-5 lg:pb-0">
              <p className="font-display text-base font-semibold text-fg">{step.title}</p>
              {step.detail && <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.detail}</p>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
