// src/app/api/hoa-meme/template/route.ts

import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const mood = searchParams.get("mood") || "default";

  // Simple deterministic template selection
  const templateMap: Record<string, string> = {
    angry: "/images/hoa/angry-lady.jpg",
    annoyed: "/images/hoa/violation.jpg",
    frustrated: "/images/hoa/fence-drama.jpg",
    bored: "/images/hoa/lawn.jpg",
    default: "/images/hoa/default-template.jpg",
  };

  const template = templateMap[mood] || templateMap.default;

  return NextResponse.json({ template });
}
