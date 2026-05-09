// src/notifications/templates/new-post.ts

import type { NotificationTemplate } from "../dispatcher";

export const NewPostTemplate = (creator: string): NotificationTemplate => ({
  id: "new-post",
  title: `${creator} posted something new`,
  message: "Check out the latest post!",
  tone: "playful",
});


