import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

// Temporary in-memory store (replace with DB later)
let POSTS: any[] = [];

export async function GET() {
  return NextResponse.json({ posts: POSTS });
}

export async function POST(req: Request) {
  const body = await req.json();

  const post = {
    id: randomUUID(),
    text: body.text || "",
    mediaUrl: body.mediaUrl || null,
    mediaType: body.mediaType || null,
    createdAt: new Date().toISOString(),
  };

  POSTS.unshift(post);

  return NextResponse.json({ post });
}
