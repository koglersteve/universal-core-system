import type { NotificationTemplate, NotificationEvent } from "@/types/os";

export const SystemTemplate: NotificationTemplate = {
  id: "system_message",
  channels: ["inapp"],
  buildContext: (event: NotificationEvent) => {
    if (event.type !== "system_message") {
      throw new Error("Invalid event for SystemTemplate");
    }
    return {
      title: "LaffLab",
      body: event.message,
      tone: "neutral",
    };
  },
};
