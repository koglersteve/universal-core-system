// src/notifications/templates/system.ts

import type { NotificationTemplate } from "@/types/os";

/**
 * System-level notification template.
 * Used for global announcements, maintenance notices,
 * and other platform-wide informational messages.
 */
export const SystemTemplate: NotificationTemplate = {
  id: "system_message",
  title: "LaffLab",
  body: "You have a new system message.",
  tone: "neutral",
};
