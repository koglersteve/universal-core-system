import type { NotificationTemplate, NotificationEvent } from "@/types/os";

export const TrendingTemplate: NotificationTemplate = {
  id: "trending_post",
  channels: ["push", "inapp"],
  buildContext: (event: NotificationEvent) => {
    if (event.type !== "post_trending") {
      throw new Error("Invalid event for TrendingTemplate");
    }
    return {
      title: "🔥 Something is blowing up",
      body: "A post that matches your taste is trending fast. Want to see why?",
      url: `/post/${event.postId}`,
      tone: "playful",
    };
  },
};
