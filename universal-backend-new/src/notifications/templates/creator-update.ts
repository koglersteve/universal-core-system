import type { NotificationTemplate } from "./types";
import type { NotificationEvent } from "../engine";

export const CreatorUpdateTemplate: NotificationTemplate = {
  id: "creator_update",
  channels: ["inapp"],
  buildContext: (event: NotificationEvent) => {
    if (event.type !== "creator_update") {
      throw new Error("Invalid event for CreatorUpdateTemplate");
    }

    return {
      title: "Creator update",
      body: "A creator you follow has an update.",
    };
  },
};
