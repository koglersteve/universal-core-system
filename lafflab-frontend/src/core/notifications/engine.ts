// src/core/notifications/engine.ts

import type { Notification } from "@/types/os";

let notifications: Notification[] = [];

/**
 * Push a new notification into the store.
 */
export function pushNotification(notification: Notification) {
  notifications.push(notification);
}

/**
 * Get all notifications for a specific user.
 */
export function getNotificationsForUser(userId: string): Notification[] {
  return notifications.filter((n) => n.userId === userId);
}

/**
 * Mark a notification as read.
 */
export function markNotificationRead(id: string) {
  const n = notifications.find((n) => n.id === id);
  if (n) n.read = true;
}
