import { dispatchNotification } from "./dispatcher";
import type { NotificationTemplate } from "./templates/types";

export async function enqueueNotification(
  userId: string,
  template: NotificationTemplate,
  event: any
) {
  await dispatchNotification(userId, template, event);
}
