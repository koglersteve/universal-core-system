// src/notifications/templates/creator-update.ts

import type { NotificationTemplate } from "../dispatcher";

export const CreatorUpdateTemplate = (creator: string): NotificationTemplate => ({
  id: "creator-update",
  title: `${creator} has an update`,
  message: "A creator you follow just updated their profile.",
  tone: "neutral",
});
