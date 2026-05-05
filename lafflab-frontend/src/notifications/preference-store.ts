// src/notifications/preference-store.ts

export type NotificationPreferences = {
  disabledTones: string[];
};

const prefs: Record<string, NotificationPreferences> = {};

export async function getUserPreferences(
  userId: string
): Promise<NotificationPreferences> {
  return prefs[userId] ?? { disabledTones: [] };
}
