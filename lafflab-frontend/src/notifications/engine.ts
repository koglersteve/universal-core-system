// src/notifications/engine.ts

import type { NotificationTemplate, Notification } from "@/types/os";
import { enqueueNotification } from "./queue";
import { getUserPreferences } from "./preference-store";
import { TrendingTemplate } from "./templates/trending";

/**
 * Dispatch a notification to a user based on their preferences.
 */
export async function sendNotification(
  userId: string,
  template: NotificationTemplate
) {
  const prefs = await getUserPreferences(userId);

  // If user has disabled this tone, skip
  if (prefs?.disabledTones?.includes(template.tone)) {
    return;
  }

  const notification: Notification = {
    id: crypto.randomUUID(),
    userId,
    title: template.title,
    message: template.body,
    tone: template.tone,
    createdAt: Date.now(),
    read: false,
  };

  enqueueNotification(userId, notification);
}

/**
 * Example: send trending notification
 */
export async function sendTrendingNotification(userId: string) {
  await sendNotification(userId, TrendingTemplate);
}
