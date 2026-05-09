// src/notifications/templates/trending.ts

import type { NotificationTemplate } from "../dispatcher";

export const TrendingTemplate: NotificationTemplate = {
  id: "trending",
  title: "🔥 Trending Now",
  message: "A post you follow is trending!",
  tone: "celebratory",
};
