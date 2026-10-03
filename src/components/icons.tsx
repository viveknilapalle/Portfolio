import type { SVGProps } from "react";

/**
 * A small inline icon set (stroke icons in the Lucide style plus brand marks),
 * so the site doesn't ship an icon font or a full icon library.
 */
type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Stroke({ size = 18, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const ArrowRight = (p: IconProps) => (
  <Stroke {...p}><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></Stroke>
);
export const ArrowLeft = (p: IconProps) => (
  <Stroke {...p}><path d="M19 12H5" /><path d="m11 18-6-6 6-6" /></Stroke>
);
export const ArrowUpRight = (p: IconProps) => (
  <Stroke {...p}><path d="M7 17 17 7" /><path d="M8 7h9v9" /></Stroke>
);
export const Download = (p: IconProps) => (
  <Stroke {...p}><path d="M12 4v11" /><path d="m7 10 5 5 5-5" /><path d="M5 20h14" /></Stroke>
);
export const Mail = (p: IconProps) => (
  <Stroke {...p}><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m4 7 8 6 8-6" /></Stroke>
);
export const Phone = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
  </Stroke>
);
export const MapPin = (p: IconProps) => (
  <Stroke {...p}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></Stroke>
);
export const Menu = (p: IconProps) => (
  <Stroke {...p}><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></Stroke>
);
export const Close = (p: IconProps) => (
  <Stroke {...p}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></Stroke>
);
export const Database = (p: IconProps) => (
  <Stroke {...p}>
    <ellipse cx="12" cy="5" rx="8" ry="3" />
    <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
    <path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
  </Stroke>
);
export const Chart = (p: IconProps) => (
  <Stroke {...p}><path d="M3 3v18h18" /><path d="M8 16v-4" /><path d="M12 16V8" /><path d="M16 16v-6" /><path d="M20 16V5" /></Stroke>
);
export const Cpu = (p: IconProps) => (
  <Stroke {...p}>
    <rect x="5" y="5" width="14" height="14" rx="2" />
    <rect x="9" y="9" width="6" height="6" rx="1" />
    <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
  </Stroke>
);
export const Code = (p: IconProps) => (
  <Stroke {...p}><path d="m8 7-5 5 5 5" /><path d="m16 7 5 5-5 5" /></Stroke>
);
export const Layers = (p: IconProps) => (
  <Stroke {...p}><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 13 9 5 9-5" /></Stroke>
);
export const Star = (p: IconProps) => (
  <Stroke {...p}><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9L12 3Z" /></Stroke>
);
export const Calendar = (p: IconProps) => (
  <Stroke {...p}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></Stroke>
);
export const Clock = (p: IconProps) => (
  <Stroke {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Stroke>
);
export const GraduationCap = (p: IconProps) => (
  <Stroke {...p}><path d="m2 9 10-5 10 5-10 5L2 9Z" /><path d="M6 11v5c3 2 9 2 12 0v-5" /><path d="M22 9v6" /></Stroke>
);
export const Award = (p: IconProps) => (
  <Stroke {...p}><circle cx="12" cy="9" r="6" /><path d="m8.5 14-1.5 8 5-3 5 3-1.5-8" /></Stroke>
);
export const Briefcase = (p: IconProps) => (
  <Stroke {...p}><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" /><path d="M3 13h18" /></Stroke>
);
export const Flask = (p: IconProps) => (
  <Stroke {...p}><path d="M9 3h6" /><path d="M10 3v6L4.5 18.5A1.7 1.7 0 0 0 6 21h12a1.7 1.7 0 0 0 1.5-2.5L14 9V3" /><path d="M7 15h10" /></Stroke>
);
export const Pen = (p: IconProps) => (
  <Stroke {...p}><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></Stroke>
);
export const Copy = (p: IconProps) => (
  <Stroke {...p}><rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" /></Stroke>
);
export const Check = (p: IconProps) => (
  <Stroke {...p}><path d="m5 12 5 5L20 7" /></Stroke>
);
export const Send = (p: IconProps) => (
  <Stroke {...p}><path d="M22 2 11 13" /><path d="m22 2-7 20-4-9-9-4 20-7Z" /></Stroke>
);
export const FileText = (p: IconProps) => (
  <Stroke {...p}><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6Z" /><path d="M14 3v6h6" /><path d="M8 13h8M8 17h5" /></Stroke>
);
export const Globe = (p: IconProps) => (
  <Stroke {...p}><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18" /></Stroke>
);

export function GitHub({ size = 18, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.27 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

export function LinkedIn({ size = 18, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

export const socialIcons = { github: GitHub, linkedin: LinkedIn, mail: Mail, globe: Globe } as const;
export const focusIcons = { database: Database, chart: Chart, cpu: Cpu, code: Code, layers: Layers } as const;
