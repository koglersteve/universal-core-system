// src/notifications/queue.ts

import type { Notification, NotificationTemplate } from "./dispatcher";

const queue: Record<string, Notification[]> = {};

export function enqueueNotification(
  userId: string,
  template: NotificationTemplate
): Notification {
  const notification: Notification = {
    id: crypto.randomUUID(),
    userId,
    message: template.message,
    createdAt: Date.now(),
    read: false,
  };

  if (!queue[userId]) {
    queue[userId] = [];
  }

  queue[userId].push(notification);
  return notification;
}

export function dequeueNotifications(userId: string): Notification[] {
  const items = queue[userId] ?? [];
  queue[userId] = [];
  return items;
}

export function peekQueue(userId: string): Notification[] {
  return queue[userId] ?? [];
}

export function clearQueue(userId: string) {
  queue[userId] = [];
}

export function clearAllQueues() {
  for (const key in queue) {
    delete queue[key];
  }
}
