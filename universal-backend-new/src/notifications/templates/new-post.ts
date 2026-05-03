import type { NotificationTemplate } from "./types";
import type { NotificationEvent } from "../engine";

export const NewPostTemplate: NotificationTemplate = {
  id: "new_post_from_favorite",
  channels: ["push", "inapp"],
  buildContext: (event: NotificationEvent) => {
    if (event.type !== "new_post_from_favorite") {
      throw new Error("Invalid event for NewPostTemplate");
    }

    return {
      title: "New from someone you like",
      body: "A creator you enjoy just dropped something new.",
      url: `/post/${event.postId}`,
    };
  },
};
