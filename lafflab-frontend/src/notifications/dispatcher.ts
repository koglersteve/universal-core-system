// src/notifications/dispatcher.ts

import { addToInbox } from "./inbox-store";

export type Notification = {
  id: string;
  userId: string;
  message: string;
  createdAt: number;
  read: boolean;
};

export type NotificationTemplate = {
  id: string;
  message: string;
};

export async function dispatchNotification(
  userId: string,
  template: NotificationTemplate
) {
  const notification: Notification = {
    id: crypto.randomUUID(),
    userId,
    message: template.message,
    createdAt: Date.now(),
    read: false,
  };

  addToInbox(userId, notification);

  return notification;
}
