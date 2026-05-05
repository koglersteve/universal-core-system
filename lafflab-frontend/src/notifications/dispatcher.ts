// src/notifications/dispatcher.ts

import { addToInbox } from "./inbox-store";
import type { NotificationTemplate, Notification } from "@/types/os";

export async function dispatchNotification(
  userId: string,
  template: NotificationTemplate
) {
  const notification: Notification = {
    id: crypto.randomUUID(),
    userId,
    title: template.title,
    message: template.body,
    tone: template.tone,
    createdAt: Date.now(),
    read: false,
  };

  addToInbox(userId, notification);
}
