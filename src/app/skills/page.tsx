import { SkillGroup } from "@/components/skills/SkillGroup";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { getSkills, projectsUsing } from "@/lib/content";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Skills",
  description: "Languages, data analysis, BI, machine learning, deep learning and tooling — grouped by purpose and linked to the projects that use them.",
  path: "/skills",
});

export default async function SkillsPage() {
  const { groups } = await getSkills();

  // Resolve project usage for every listed skill once, at build time.
  const allSkills = [...new Set(groups.flatMap((g) => g.items))];
  const usage = Object.fromEntries(await Promise.all(allSkills.map(async (skill) => [skill, await projectsUsing(skill)] as const)));
  const usedCount = allSkills.filter((skill) => usage[skill].length > 0).length;

  return (
    <>
      <PageHeader
        eyebrow="Skills"
        title="The toolkit, grouped by purpose"
        description="No progress bars or percentages. Skills marked with a dot are used in a published case study — follow the links to see them in context."
      >
        <dl className="flex flex-wrap gap-x-10 gap-y-4">
          <div>
            <dt className="text-sm text-muted">Technologies</dt>
            <dd className="font-display text-3xl font-semibold text-fg">{allSkills.length}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted">Groups</dt>
            <dd className="font-display text-3xl font-semibold text-fg">{groups.length}</dd>
          </div>
          <div>
            <dt className="flex items-center gap-2 text-sm text-muted">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
              Used in case studies
            </dt>
            <dd className="font-display text-3xl font-semibold text-fg">{usedCount}</dd>
          </div>
        </dl>
      </PageHeader>

      <Section className="pt-4 sm:pt-8">
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group, i) => (
            <Reveal as="li" key={group.id} delay={(i % 3) * 0.06}>
              <SkillGroup group={group} usage={usage} />
            </Reveal>
          ))}
        </ul>
      </Section>
    </>
  );
}
