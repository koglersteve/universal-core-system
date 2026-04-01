import { NextRequest, NextResponse } from "next/server";
import { generateStickerLabel } from "@/lib/ai";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { mood, app } = body as { mood?: string; app?: string };

  const prompt = `Generate a short sticker idea (emoji or 1–2 words) for app=${app || "generic"} and mood=${mood || "neutral"}.`;

  const sticker = await generateStickerLabel(prompt);

  return NextResponse.json({ sticker });
}
