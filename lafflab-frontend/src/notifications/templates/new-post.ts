// src/notifications/templates/new-post.ts

import type { NotificationTemplate } from "@/types/os";

export const NewPostTemplate: NotificationTemplate = {
  id: "new_post_from_favorite",
  title: "New Post",
  body: "A creator you follow just published a new post!",
  tone: "info",
};
