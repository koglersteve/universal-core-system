// src/app/api/notifications/inbox/route.ts

import { NextResponse } from "next/server";
import { enqueueNotification } from "@/notifications/queue";

export async function POST(req: Request) {
  const body = await req.json();

  await enqueueNotification(
    {
      id: body.id ?? "",
      title: body.title ?? "",
      message: body.message ?? "",
      timestamp: Date.now(),
    },
    {}
  );

  return NextResponse.json({ ok: true });
}
