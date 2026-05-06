import { NextResponse } from "next/server";
import { enqueueNotification } from "@/notifications/queue";

export async function POST(req: Request) {
  const body = await req.json();

  const userId = body.id ?? "unknown";

  const template = {
    id: "inbox-generic",
    message: body.message ?? "You have a new notification.",
  };

  await enqueueNotification(userId, template);

  return NextResponse.json({ ok: true });
}
