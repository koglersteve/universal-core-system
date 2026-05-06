// src/notifications/engine.ts

import type { Notification, NotificationTemplate } from "./dispatcher";
import { enqueueNotification } from "./queue";
import { getUserPreferences } from "./preference-store";
import { TrendingTemplate } from "./templates/trending";

/**
 * Notification engine:
 * Chooses templates based on user preferences and dispatches them.
 */

export async function processNotification(userId: string) {
  const prefs = await getUserPreferences(userId);

  let template: NotificationTemplate;

  if (prefs.trending) {
    template = TrendingTemplate;
  } else {
    template = {
      id: "default",
      message: "You have a new notification.",
    };
  }

  return enqueueNotification(userId, template);
}
