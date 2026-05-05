import { NextResponse } from "next/server";
import {
  getNotificationsForUser,
  initNotificationEngine,
} from "@/core/notifications/engine";

export async function GET(req: Request) {
  initNotificationEngine();

  const userId = req.headers.get("x-user-id");
  if (!userId) {
    return NextResponse.json([], { status: 200 });
  }

  const notifications = getNotificationsForUser(userId);
  return NextResponse.json(notifications);
}
