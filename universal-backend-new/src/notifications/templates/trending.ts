import type { NotificationTemplate } from "./types";
import type { NotificationEvent } from "../engine";

export const TrendingTemplate: NotificationTemplate = {
  id: "trending_post",
  channels: ["push", "inapp"],
  buildContext: (event: NotificationEvent) => {
    if (event.type !== "post_trending") {
      throw new Error("Invalid event for TrendingTemplate");
    }

    return {
      title: "🔥 Something is blowing up",
      body: "A post is trending fast. Want to see why?",
      url: `/post/${event.postId}`,
    };
  },
};
