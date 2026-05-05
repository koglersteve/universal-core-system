// src/core/notifications/engine.ts

import { Notification } from "@/types/os";

let notifications: Notification[] = [];

/**
 * Initialize the notification engine.
 * (Currently a no-op, but kept for API compatibility.)
 */
export function initNotificationEngine() {
  notifications = notifications || [];
}

/**
 * Add a notification to the in-memory store.
 */
export function addNotification(notification: Notification) {
  notifications.push(notification);
}

/**
 * Get all notifications for a specific user.
 */
export function getNotificationsForUser(userId: string): Notification[] {
  return notifications.filter((n) => n.userId === userId);
}
