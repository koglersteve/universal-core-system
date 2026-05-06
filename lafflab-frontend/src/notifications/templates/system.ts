// src/notifications/templates/system.ts

import type { NotificationTemplate } from "@/notifications/dispatcher";

/**
 * System-level notification template.
 * Used for global announcements, maintenance notices,
 * and other platform-wide informational messages.
 */
export const SystemTemplate: NotificationTemplate = {
  id: "system_message",
  message: "You have a new system message.",
};
