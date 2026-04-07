// src/app/api/idlyily/create-entry/route.ts

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const entry = {
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    ...body,
  };

  // In minimal mode, we just return the entry
  return NextResponse.json({
    success: true,
    entry,
  });
}
