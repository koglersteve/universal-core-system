export function deepDiff(a: any, b: any): any {
  if (a === b) return {};

  if (typeof a !== "object" || typeof b !== "object") {
    return b;
  }

  const diff: any = {};

  for (const key of new Set([...Object.keys(a), ...Object.keys(b)])) {
    if (a[key] !== b[key]) {
      diff[key] = deepDiff(a[key], b[key]);
    }
  }

  return diff;
}

