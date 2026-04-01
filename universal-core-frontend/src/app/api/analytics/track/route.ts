// src/app/api/analytics/track/route.ts
import { NextResponse } from "next/server";
import type { EmotionalEvent } from "@/lib/analytics/schema";
import { persistEvent } from "@/lib/analytics/storage";

export async function POST(req: Request) {
  const body = (await req.json()) as EmotionalEvent;

  // minimal validation
  if (!body.app || !body.type || !body.ts) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // fire-and-forget persistence
  persistEvent(body).catch(() => {});

  return NextResponse.json({ ok: true });
}
