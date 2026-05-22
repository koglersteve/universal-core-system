// src/core/apps/registry.ts

import type { AppDefinition, AppId } from "./app-types.js";

export const APP_REGISTRY: AppDefinition[] = [
  {
    id: "lafflab",
    name: "LAFFlab",
    slug: "lafflab",
    enabled: true,
    isPrimary: true,
  },
  // Add additional apps here as they come online
  // {
  //   id: "moodpad",
  //   name: "MoodPad",
  //   slug: "moodpad",
  //   enabled: true,
  // },
];

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
