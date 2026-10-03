import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Award, Briefcase, GraduationCap } from "@/components/icons";
import { Reveal } from "@/components/ui/Reveal";
import type { Experience } from "@/lib/schemas";

export function ExperienceSnapshot({ experience }: { experience: Experience }) {
  const [latestWork] = experience.work;

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.2fr_1fr]">
      <Reveal className="flex flex-col gap-5">
        {latestWork && (
          <SnapshotRow icon={<Briefcase size={18} />} label="Latest role" period={`${latestWork.start} — ${latestWork.end}`}>
            <p className="font-semibold text-fg">{latestWork.role}</p>
            <p className="text-sm text-muted">{latestWork.company}</p>
          </SnapshotRow>
        )}
        {experience.education.slice(0, latestWork ? 1 : 2).map((entry) => (
          <SnapshotRow key={entry.institution} icon={<GraduationCap size={18} />} label="Education" period={`${entry.start} — ${entry.end}`}>
            <p className="font-semibold text-fg">{entry.credential}</p>
            <p className="text-sm text-muted">
              {entry.institution}
              {entry.score && <span className="text-fg-2"> · {entry.score}</span>}
            </p>
          </SnapshotRow>
        ))}
      </Reveal>

      {experience.certifications.length > 0 && (
        <Reveal delay={0.08} className="rounded-3xl border border-line bg-surface/50 p-6 sm:p-7">
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-2 text-sm font-medium text-fg">
              <Award size={18} className="text-accent-soft" />
              Certifications
            </p>
            <span className="font-mono text-xs text-muted">{experience.certifications.length} total</span>
          </div>
          <ul className="mt-5 divide-y divide-line">
            {experience.certifications.map((cert) => (
              <li key={cert.name} className="flex items-baseline justify-between gap-4 py-3 text-sm">
                <span className="text-fg-2">{cert.name}</span>
                <span className="shrink-0 font-mono text-xs text-muted">{cert.issuer}</span>
              </li>
            ))}
          </ul>
          <Link href="/experience" className="group mt-4 inline-flex items-center gap-1.5 text-sm text-primary-soft hover:text-fg">
            Full timeline
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      )}
    </div>
  );
}

function SnapshotRow({ icon, label, period, children }: { icon: ReactNode; label: string; period: string; children: ReactNode }) {
  return (
    <div className="flex gap-5 rounded-3xl border border-line bg-surface/50 p-6 sm:p-7">
      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-line bg-base text-primary-soft">{icon}</div>
      <div className="min-w-0 flex-1">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-muted">
          <span className="tracking-wide uppercase">{label}</span>
          <span>{period}</span>
        </div>
        {children}
      </div>
    </div>
  );
}
