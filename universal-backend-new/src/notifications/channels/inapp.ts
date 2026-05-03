import type { NotificationContextPayload } from "../templates/types";

export async function sendInApp(
  userId: string,
  context: NotificationContextPayload
) {
  // TODO: store in in-app inbox
  console.log("sendInApp", userId, context);
}
