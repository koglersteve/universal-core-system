// src/lib/time.ts

/**
 * Normalize an array of date-like values into a clean string[].
 * Removes undefined, null, empty, and invalid entries.
 */
function normalizeDays(raw: unknown[]): string[] {
  const out: string[] = [];
  for (const d of raw) {
    if (typeof d === "string" && d.trim().length > 0) {
      out.push(d);
    }
  }
  return out;
}

/**
 * Calculate day‑to‑day differences between sorted date strings.
 * Returns an array of positive or negative deltas.
 */
export function getDayDifferences(rawDays: unknown[]): number[] {
  const days: string[] = normalizeDays(rawDays);

  if (days.length < 2) return [];

  const diffs: number[] = [];

  for (let i = 1; i < days.length; i++) {
    const prev = new Date(days[i - 1]);
    const curr = new Date(days[i]);

    const diff =
      (prev.getTime() - curr.getTime()) / (1000 * 60 * 60 * 24);

    diffs.push(diff);
  }

  return diffs;
}

/**
 * Get the number of days between two date strings.
 */
export function daysBetween(a: unknown, b: unknown): number | null {
  if (typeof a !== "string" || typeof b !== "string") return null;

  const d1 = new Date(a);
  const d2 = new Date(b);

  return (d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24);
}
