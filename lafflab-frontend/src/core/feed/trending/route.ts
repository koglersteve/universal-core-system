import { NextResponse } from "next/server";
import { LaffLabApi } from "@/lib/api";

export async function GET() {
  const posts = await LaffLabApi.getTrending();
  return NextResponse.json({ posts });
}
