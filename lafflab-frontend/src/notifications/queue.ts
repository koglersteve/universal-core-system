// src/notifications/queue.ts

import type { Notification } from "@/types/os";

const queue: Record<string, Notification[]> = {};

export function enqueueNotification(userId: string, notification: Notification) {
  if (!queue[userId]) queue[userId] = [];
  queue[userId].push(notification);
}

export function getQueuedNotifications(userId: string): Notification[] {
  return queue[userId] ?? [];
}
