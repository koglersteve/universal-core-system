// src/app/api/idlyily/suggest-templates/route.ts

import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const mood = searchParams.get("mood") || "neutral";
  const world = searchParams.get("world") || "general";

  const suggestions = [
    {
      id: "reflection",
      label: "Emotional Reflection",
      match: ["sad", "overwhelmed", "thoughtful"],
    },
    {
      id: "victory",
      label: "Small Win Celebration",
      match: ["happy", "proud", "excited"],
    },
    {
      id: "chaos",
      label: "Chaos Processing",
      match: ["chaotic", "angry", "frustrated"],
    },
    {
      id: "grounding",
      label: "Grounding Exercise",
      match: ["anxious", "stressed"],
    },
  ];

  const filtered = suggestions.filter((s) => s.match.includes(mood));

  return NextResponse.json({
    mood,
    world,
    templates: filtered.length ? filtered : suggestions.slice(0, 2),
  });
}
