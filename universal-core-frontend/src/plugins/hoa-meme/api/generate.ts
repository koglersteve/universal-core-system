// src/app/api/hoa-meme/generate/route.ts

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  // In minimal mode, we return a mock generated meme
  return NextResponse.json({
    success: true,
    url: "/images/generated/sample-meme.jpg",
    input: body,
  });
}
