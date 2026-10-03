import { Reveal } from "@/components/ui/Reveal";
import type { Project } from "@/lib/content";
import { ProjectCard } from "./ProjectCard";

type ProjectGridProps = {
  projects: Project[];
  /** Render the first project as a wide feature card. */
  leadFeature?: boolean;
};

/**
 * Lays out projects as one wide lead card followed by a two-column grid, so a
 * row of identical cards never repeats. Works for any number of projects.
 */
export function ProjectGrid({ projects, leadFeature = true }: ProjectGridProps) {
  if (projects.length === 0) return null;
  const [lead, ...rest] = leadFeature ? projects : [undefined, ...projects];

  return (
    <div className="grid grid-cols-1 gap-6">
      {lead && (
        <Reveal>
          <ProjectCard project={lead} variant="feature" index={0} priority />
        </Reveal>
      )}
      {rest.length > 0 && (
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {rest.map((project, i) =>
            project ? (
              <Reveal as="li" key={project.slug} delay={(i % 2) * 0.08}>
                <ProjectCard project={project} index={i + (lead ? 1 : 0)} />
              </Reveal>
            ) : null,
          )}
        </ul>
      )}
    </div>
  );
}
