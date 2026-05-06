// src/core/notifications/engine.ts

export type LocalNotification = {
  id: string;
  title: string;
  message: string;
  timestamp: number;
};

export type LocalNotificationTemplate = {
  id: string;
  title: string;
  message: string;
};

let notifications: LocalNotification[] = [];
let templates: Record<string, LocalNotificationTemplate> = {};

export function registerTemplate(template: LocalNotificationTemplate) {
  templates[template.id] = template;
}

export function enqueueNotification(id: string, _ctx: Record<string, unknown> = {}) {
  const template = templates[id];

  if (!template) return;

  notifications.push({
    id: template.id,
    title: template.title,
    message: template.message,
    timestamp: Date.now(),
  });
}

export function getNotifications() {
  return notifications;
}

export function clearNotifications() {
  notifications = [];
}
