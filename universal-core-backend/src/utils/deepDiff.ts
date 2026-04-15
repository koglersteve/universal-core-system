type Json = any;

export type DiffResult =
  | { type: "equal"; value: Json }
  | { type: "changed"; before: Json; after: Json }
  | { type: "added"; after: Json }
  | { type: "removed"; before: Json }
  | { type: "object"; children: Record<string, DiffResult> }
  | { type: "array"; children: DiffResult[] };

export const deepDiff = (a: Json, b: Json): DiffResult => {
  if (a === b) {
    return { type: "equal", value: a };
  }

  const aIsObj = a && typeof a === "object";
  const bIsObj = b && typeof b === "object";

  // Arrays
  if (Array.isArray(a) && Array.isArray(b)) {
    const maxLen = Math.max(a.length, b.length);
    const children: DiffResult[] = [];

    for (let i = 0; i < maxLen; i++) {
      if (i in a && i in b) {
        children.push(deepDiff(a[i], b[i]));
      } else if (i in a) {
        children.push({ type: "removed", before: a[i] });
      } else {
        children.push({ type: "added", after: b[i] });
      }
    }

    return { type: "array", children };
  }

  // Objects
  if (aIsObj && bIsObj && !Array.isArray(a) && !Array.isArray(b)) {
    const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
    const children: Record<string, DiffResult> = {};

    for (const key of keys) {
      if (key in a && key in b) {
        children[key] = deepDiff(a[key], b[key]);
      } else if (key in a) {
        children[key] = { type: "removed", before: a[key] };
      } else {
        children[key] = { type: "added", after: b[key] };
      }
    }

    return { type: "object", children };
  }

  // Primitive or type mismatch
  return { type: "changed", before: a, after: b };
};
