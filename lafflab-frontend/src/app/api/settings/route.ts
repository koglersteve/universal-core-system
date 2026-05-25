import { NextResponse } from "next/server";
import { LaffLabApi } from "@/lib/LaffLabApi";

export async function GET() {
  try {
    const settings = await LaffLabApi.getSettings?.();
    return NextResponse.json({ settings: settings ?? {} });
  } catch (err) {
    console.error("API /api/settings error:", err);
    return NextResponse.json({ settings: {} }, { status: 500 });
  }
}
