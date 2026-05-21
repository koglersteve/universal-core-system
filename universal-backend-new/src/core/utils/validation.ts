// src/core/utils/validation.ts

export function requireFields(obj: any, fields: string[]): string[] {
  const missing: string[] = [];

  for (const field of fields) {
    if (obj[field] === undefined || obj[field] === null) {
      missing.push(field);
    }
  }

  return missing;
}

export function isNonEmptyString(value: any): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

export function validateId(id: any): boolean {
  return isNonEmptyString(id);
}
