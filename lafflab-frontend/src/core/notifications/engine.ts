// src/core/notifications/engine.ts

import type { Notification, NotificationTemplate } from "@/types/os";

let notifications: Notification[] = [];
let templates: Record<string, NotificationTemplate> = {};

/**
 * Register a notification template.
 */
export function registerNotificationTemplate(template: NotificationTemplate) {
  templates[template.id] = template;
}

/**
 * Push a new notification using a template.
 */
export function pushNotificationFromTemplate(
  userId: string,
  templateId: string
) {
  const template = templates[templateId];
  if (!template) return;

  const notification: Notification = {
    id: crypto.randomUUID(),
    userId,
    title: template.title,
    message: template.body,
    tone: template.tone,
    createdAt: Date.now(),
    read: false,
  };

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
