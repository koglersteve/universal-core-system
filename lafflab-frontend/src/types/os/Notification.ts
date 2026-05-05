// src/types/os/Notification.ts

/**
 * Canonical Emotional OS tone taxonomy.
 * All notification templates and engines must use these tones.
 */
export type NotificationTone =
  | "neutral"
  | "info"
  | "playful"
  | "success"
  | "warning"
  | "error";

/**
 * Static notification template definition.
 * Used by the Emotional OS notification engine.
 */
export type NotificationTemplate = {
  id: string;
  title: string;
  body: string;
  tone: NotificationTone;
};

/**
 * Fully rendered notification object delivered to the user.
 */
export type Notification = {
  id: string;
  userId: string;
  title: string;
  message: string;
  tone: NotificationTone;
  createdAt: number;
  read: boolean;
};
