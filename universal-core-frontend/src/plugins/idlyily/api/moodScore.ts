// src/app/api/idlyily/mood-score/route.ts

import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const mood = searchParams.get("mood") || "neutral";

  const scoreMap: Record<string, number> = {
    angry: 85,
    frustrated: 70,
    stressed: 65,
    overwhelmed: 60,
    anxious: 55,
    bored: 40,
    neutral: 50,
    happy: 75,
    excited: 90,
    proud: 80,
  };

  const score = scoreMap[mood] ?? 50;

  return NextResponse.json({
    mood,
    score,
  });
}
