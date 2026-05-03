import type { QueuedNotification } from "./queue";
import type { NotificationTemplate } from "./templates/types";
import { sendPush } from "./channels/push";
import { sendInApp } from "./channels/inapp";
import { sendEmail } from "./channels/email";

export async function dispatchNotification(
  queued: QueuedNotification,
  template: NotificationTemplate
) {
  const { userId, payload } = queued;

  const context = template.buildContext(payload.event);

  for (const channel of template.channels) {
    if (channel === "push") {
      await sendPush(userId, context);
    } else if (channel === "inapp") {
      await sendInApp(userId, context);
    } else if (channel === "email") {
      await sendEmail(userId, context);
    }
  }
}
