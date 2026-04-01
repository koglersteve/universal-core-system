// src/app/api/dramanextdoor/scene/route.ts
import { NextResponse } from "next/server";
import {
  buildNarrativeScene,
  type NarrativeContext
} from "@/plugins/dramanextdoor/narrativeTemplates";
import { logDramaAnalytics } from "@/plugins/dramanextdoor/logging";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const mood = searchParams.get("mood") || undefined;
  const world = searchParams.get("world") || undefined;
  const trait = searchParams.get("trait") || undefined;
  const agent = searchParams.get("agent") || undefined;

  const ctx: NarrativeContext = {
    mood,
    world,
    trait,
    agent
  };

  // Generate the scene
  const scene = buildNarrativeScene(ctx);

  // Fire-and-forget analytics
  logDramaAnalytics({
    mood,
    world,
    trait,
    agent,
    sceneType: detectSceneType(scene),
    timestamp: Date.now()
  });

  return NextResponse.json({ scene });
}

// Simple classifier for analytics
function detectSceneType(scene: string): string {
  if (scene.includes("spark") || scene.includes("explode")) return "high-tension";
  if (scene.includes("grounded") || scene.includes("calm")) return "low-tension";
  if (scene.includes("mischievous") || scene.includes("chaos")) return "chaotic";
  return "neutral";
}

