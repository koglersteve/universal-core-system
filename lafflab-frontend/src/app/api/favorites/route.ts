import { NextResponse } from "next/server";
import { LaffLabApi } from "@/lib/LaffLabApi";

export async function GET() {
  try {
    const favorites = await LaffLabApi.getFavorites();
    return NextResponse.json({ favorites });
  } catch (err) {
    console.error("API /api/favorites error:", err);
    return NextResponse.json({ favorites: [] }, { status: 500 });
  }
}
