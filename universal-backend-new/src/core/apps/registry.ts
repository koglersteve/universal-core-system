import type { AppDefinition, AppId } from "./app-types.js";

/**
 * Compact app definitions.
 * Easy to maintain, scalable, and avoids bloated arrays.
 */
const APP_DEFINITIONS: Record<AppId, Omit<AppDefinition, "id">> = {
  lafflab:       { name: "LAFFlab",       slug: "lafflab",       enabled: true,  isPrimary: true },
  mememydog:     { name: "MemeMyDog",     slug: "mememydog",     enabled: true },
  mememycat:     { name: "MemeMyCat",     slug: "mememycat",     enabled: true },
  "hoa-meme":    { name: "HOA Meme",      slug: "hoa-meme",      enabled: true },
  dramanextdoor: { name: "DramaNextDoor", slug: "dramanextdoor", enabled: true },
  idlyily:       { name: "IDLYILY",       slug: "idlyily",       enabled: true },
  moodcheck:     { name: "MoodCheck",     slug: "moodcheck",     enabled: true },
  northstar:     { name: "NorthStar",     slug: "northstar",     enabled: true },
  "aurelia-buildlab": { name: "Aurelia BuildLab", slug: "aurelia-buildlab", enabled: true },
};

/**
 * Convert compact map → full registry array.
 */
export const APP_REGISTRY: AppDefinition[] = Object.entries(APP_DEFINITIONS).map(
  ([id, def]) => ({
    id: id as AppId,
    ...def,
  })
);

/**
 * Registry helpers
 */
export function getAllApps(): AppDefinition[] {
  return APP_REGISTRY;
}

export function getEnabledApps(): AppDefinition[] {
  return APP_REGISTRY.filter((app) => app.enabled);
}

export function getAppById(id: AppId): AppDefinition | undefined {
  return APP_REGISTRY.find((app) => app.id === id);
}

export function getOtherApps(sourceAppId: AppId): AppDefinition[] {
  return getEnabledApps().filter((app) => app.id !== sourceAppId);
}

export function isValidAppId(id: AppId): boolean {
  return !!getAppById(id);
}
