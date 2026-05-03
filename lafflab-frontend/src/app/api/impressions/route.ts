import { NextResponse } from "next/server";

let IMPRESSIONS: Record<
  string,
  { [emoji: string]: number }
> = {};

export async function POST(req: Request) {
  const { postId, emoji } = await req.json();

  if (!postId || !emoji) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  if (!IMPRESSIONS[postId]) {
    IMPRESSIONS[postId] = {};
  }

  IMPRESSIONS[postId][emoji] = (IMPRESSIONS[postId][emoji] || 0) + 1;

  return NextResponse.json({
    ok: true,
    counts: IMPRESSIONS[postId],
  });
}

export async function GET() {
  return NextResponse.json({ impressions: IMPRESSIONS });
}
