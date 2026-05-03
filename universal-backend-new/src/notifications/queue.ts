import type { NotificationEvent } from "./engine";
import type { NotificationTemplate } from "./templates/types";
import { dispatchNotification } from "./dispatcher";

export type QueuedNotification = {
  userId: string;
  templateId: string;
  payload: any;
};

export async function enqueueNotification(
  userId: string,
  template: NotificationTemplate,
  event: NotificationEvent
) {
  const queued: QueuedNotification = {
    userId,
    templateId: template.id,
    payload: { event },
  };

  // TODO: push to real queue; for now, dispatch inline
  await dispatchNotification(queued, template);
}
