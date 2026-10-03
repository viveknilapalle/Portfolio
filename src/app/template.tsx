import type { ReactNode } from "react";

/**
 * Templates remount on every navigation, so this CSS-only fade replays on each
 * page change without shipping JavaScript (and without hiding server-rendered
 * content before hydration). Disabled under prefers-reduced-motion in globals.css.
 */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="animate-page">{children}</div>;
}
