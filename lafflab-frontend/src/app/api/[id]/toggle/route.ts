import { NextResponse } from "next/server";
import { LaffLabApi } from "@/lib/LaffLabApi";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const result = await LaffLabApi.toggleFavorite(params.id);
    return NextResponse.json(result);
  } catch (err) {
    console.error("API /api/favorites/toggle error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
