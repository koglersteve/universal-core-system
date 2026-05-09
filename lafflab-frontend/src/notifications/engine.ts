// src/notifications/engine.ts

import { enqueueNotification } from "./queue";
import { getUserPreferences } from "./preference-store";
import type { NotificationTemplate } from "./dispatcher";
import { TrendingTemplate } from "./templates/trending";

export async function processNotification(userId: string) {
  const prefs = await getUserPreferences(userId);

  let template: NotificationTemplate;

  if (prefs.trending) {
    template = TrendingTemplate;
  } else {
    template = {
      id: "default",
      message: "You have a new notification.",
      tone: "neutral",
    };
  }

  return enqueueNotification(userId, template);
}
