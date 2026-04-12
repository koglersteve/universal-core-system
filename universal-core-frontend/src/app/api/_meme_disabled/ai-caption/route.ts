import { NextRequest, NextResponse } from "next/server";
import { generateCaption } from "@/lib/ai";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { mood, app } = body as { mood?: string; app?: string };

  const prompt = `Generate a short, funny meme caption for app=${app || "generic"} and mood=${mood || "neutral"}.`;

  const caption = await generateCaption(prompt);

  return NextResponse.json({ caption });
}
