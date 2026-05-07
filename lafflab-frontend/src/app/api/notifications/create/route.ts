import { NextResponse } from "next/server";
import { queueNotification } from "@notifications/queue";
import { validateNotification } from "@notifications/templates";

export async function POST(req: Request) {
  const json = await req.json();
  const payload = validateNotification(json);
  await queueNotification(payload);
  return NextResponse.json({ ok: true });
}
