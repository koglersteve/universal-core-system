import { NextResponse } from "next/server";
import { getAllEvents } from "@/core/reactions/stream";

export async function GET() {
  const events = getAllEvents();
  return NextResponse.json(events);
}
