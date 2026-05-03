import type { NotificationContextPayload } from "../templates/types";

export async function sendPush(
  userId: string,
  context: NotificationContextPayload
) {
  // TODO: integrate with push provider
  console.log("sendPush", userId, context);
}
