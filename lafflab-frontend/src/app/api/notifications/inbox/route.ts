// src/app/api/notifications/inbox/route.ts

import { NextResponse } from "next/server";
import { enqueueNotification } from "@/notifications/queue";

export async function POST(req: Request) {
  const body = await req.json();

  await enqueueNotification(body.id ?? "");

  return NextResponse.json({ ok: true });
}
