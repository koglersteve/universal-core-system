import type { NotificationContextPayload } from "../templates/types";

export async function sendEmail(
  userId: string,
  context: NotificationContextPayload
) {
  // TODO: integrate with email provider
  console.log("sendEmail", userId, context);
}
