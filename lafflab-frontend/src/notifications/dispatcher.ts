import { addToInbox } from "./inbox-store";
import type { NotificationTemplate } from "./templates/types";

export async function dispatchNotification(
  userId: string,
  template: NotificationTemplate,
  event: any
) {
  const ctx = template.buildContext(event);

  if (template.channels.includes("inapp")) {
    await addToInbox({
      userId,
      title: ctx.title,
      body: ctx.body,
      url: ctx.url,
      tone: ctx.tone,
    });
  }

  if (template.channels.includes("push")) {
    console.log("PUSH →", userId, ctx);
  }

  if (template.channels.includes("email")) {
    console.log("EMAIL →", userId, ctx);
  }
}
