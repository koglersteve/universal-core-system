import { NextResponse } from "next/server";
import { LaffLabApi } from "@/lib/LaffLabApi";

export async function GET() {
  try {
    const data = await LaffLabApi.getHistory?.();
    return NextResponse.json({ history: data ?? [] });
  } catch (err) {
    console.error("API /api/history error:", err);
    return NextResponse.json({ history: [] }, { status: 500 });
  }
}
