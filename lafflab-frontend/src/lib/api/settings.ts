import { get, patch } from "./httpclient";

export type AppSettings = {
  darkMode: boolean;
  creatorMode: boolean;
  pushNotifications: boolean;
  // Add more settings as your backend exposes them
};

export async function getSettings() {
  return get<AppSettings>("/settings");
}

export async function updateSetting<K extends keyof AppSettings>(
  key: K,
  value: AppSettings[K]
) {
  return patch<AppSettings>("/settings", { [key]: value });
}
