// src/app/api/notifications/route.ts

import { NextResponse } from "next/server";
import { getNotificationsForUser } from "@/core/notifications/engine";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  const notifications = getNotificationsForUser(userId);
  return NextResponse.json(notifications);
}
