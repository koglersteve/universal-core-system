// src/notifications/templates/new-post.ts

import type { NotificationTemplate } from "@/notifications/dispatcher";

export const NewPostTemplate: NotificationTemplate = {
  id: "new_post_from_favorite",
  message: "A creator you follow has posted something new.",
};
