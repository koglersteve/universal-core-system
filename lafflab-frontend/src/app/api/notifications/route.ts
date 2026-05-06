import { NextResponse } from "next/server";
import { getNotifications } from "@/core/notifications/engine";

export async function GET() {
  const items = getNotifications();
  return NextResponse.json({ items });
}
