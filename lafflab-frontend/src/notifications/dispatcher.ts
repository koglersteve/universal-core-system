// src/notifications/dispatcher.ts

export type NotificationTone = "neutral" | "playful" | "urgent" | "celebratory";

export type Notification = {
  id: string;
  userId: string;
  title?: string;
  message: string;
  url?: string;
  tone?: NotificationTone;
  createdAt: number;
  read: boolean;
};

export type NotificationTemplate = {
  id: string;
  title?: string;
  message: string;
  url?: string;
  tone?: NotificationTone;
};

export function buildNotification(
  userId: string,
  template: NotificationTemplate
): Notification {
  return {
    id: crypto.randomUUID(),
    userId,
    title: template.title,
    message: template.message,
    url: template.url,
    tone: template.tone ?? "neutral",
    createdAt: Date.now(),
    read: false,
  };
}
