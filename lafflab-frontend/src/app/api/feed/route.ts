import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/core/lafflab/feed`);
  const data = await res.json();
  return NextResponse.json({ posts: data.posts ?? [] });
}
