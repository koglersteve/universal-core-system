import { NextResponse } from "next/server";
import { getAllEvents } from "@/core/reactions/stream";

export async function GET() {
  return NextResponse.json(getAllEvents());
}
