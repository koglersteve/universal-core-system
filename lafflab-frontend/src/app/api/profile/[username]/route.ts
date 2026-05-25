import { NextResponse } from "next/server";
import { LaffLabApi } from "@/lib/LaffLabApi";

export async function GET(
  req: Request,
  { params }: { params: { username: string } }
) {
  try {
    const profile = await LaffLabApi.getProfile(params.username);
    return NextResponse.json({ profile });
  } catch (err) {
    console.error("API /api/profile error:", err);
    return NextResponse.json({ profile: null }, { status: 500 });
  }
}
