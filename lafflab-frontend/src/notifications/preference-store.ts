// src/notifications/preference-store.ts

export type NotificationPreferences = {
  trending: boolean;
};

const prefs = new Map<string, NotificationPreferences>();

export function getUserPreferences(userId: string): Promise<NotificationPreferences> {
  if (!prefs.has(userId)) {
    prefs.set(userId, {
      trending: true, // default preference
    });
  }

  return Promise.resolve(prefs.get(userId)!);
}

export function setUserPreferences(
  userId: string,
  newPrefs: Partial<NotificationPreferences>
) {
  const existing = prefs.get(userId) ?? { trending: true };
  prefs.set(userId, { ...existing, ...newPrefs });
}
