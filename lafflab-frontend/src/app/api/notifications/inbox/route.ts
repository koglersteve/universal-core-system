import { NextResponse } from "next/server";
import { handleNotificationEvent } from "@/notifications/engine";

export async function POST(req: Request) {
  const body = await req.json();
  const { userId, event } = body;

  await handleNotificationEvent(userId, event);

  return NextResponse.json({ ok: true });
}
