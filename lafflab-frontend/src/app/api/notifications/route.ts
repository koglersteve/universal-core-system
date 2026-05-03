import { NextResponse } from "next/server";
import {
  getNotificationsForUser,
  initNotificationEngine,
} from "@/core/notifications/engine";

export async function GET(req: Request) {
  initNotificationEngine();

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId") || "user-123";

  const notifications = getNotificationsForUser(userId);

  return NextResponse.json({
    ok: true,
    notifications,
  });
}
