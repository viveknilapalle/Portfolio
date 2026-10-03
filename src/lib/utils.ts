export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

const monthYear = new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric", timeZone: "UTC" });
const fullDate = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

/** Formats "2026-07" as "Jul 2026" and "2026-07-19" as "19 Jul 2026". */
export function formatDate(value: string): string {
  if (/^\d{4}$/.test(value)) return value;
  const isMonth = /^\d{4}-\d{2}$/.test(value);
  const date = new Date(isMonth ? `${value}-01T00:00:00Z` : `${value.slice(0, 10)}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return value;
  return (isMonth ? monthYear : fullDate).format(date);
}

/** "3 days ago"-style relative time for GitHub activity. */
export function timeAgo(iso: string, now = Date.now()): string {
  const seconds = Math.round((new Date(iso).getTime() - now) / 1000);
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 31_536_000],
    ["month", 2_592_000],
    ["week", 604_800],
    ["day", 86_400],
    ["hour", 3_600],
    ["minute", 60],
  ];
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  for (const [unit, size] of units) {
    if (Math.abs(seconds) >= size) return rtf.format(Math.round(seconds / size), unit);
  }
  return "just now";
}

export const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href);
