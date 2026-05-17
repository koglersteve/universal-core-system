export function deepDiff(a: any, b: any): any {
  if (a === b) return {};

  if (typeof a !== "object" || typeof b !== "object" || !a || !b) {
    return b;
  }

  const diff: any = {};

  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);

  for (const key of keys) {
    if (!(key in b)) {
      diff[key] = undefined;
      continue;
    }

    if (!(key in a)) {
      diff[key] = b[key];
      continue;
    }

    const valueA = a[key];
    const valueB = b[key];

    if (valueA === valueB) continue;

    if (
      typeof valueA === "object" &&
      typeof valueB === "object" &&
      valueA &&
      valueB
    ) {
      const nested = deepDiff(valueA, valueB);
      if (Object.keys(nested).length > 0) diff[key] = nested;
    } else {
      diff[key] = valueB;
    }
  }

  return diff;
}
