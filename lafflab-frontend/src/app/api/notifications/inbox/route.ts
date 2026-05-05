// src/app/api/notifications/inbox/route.ts

import { NextResponse } from "next/server";
import { enqueueNotification } from "@/notifications/queue";
import type { Notification } from "@/types/os";

export async function POST(req: Request) {
  const body = await req.json();

  const notification: Notification = {
    id: crypto.randomUUID(),
    userId: body.userId,
    title: body.title,
    message: body.message,
    tone: body.tone,
    createdAt: Date.now(),
    read: false,
  };

  enqueueNotification(body.userId, notification);

  return NextResponse.json({ status: "ok" });
}
