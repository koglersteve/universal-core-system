import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL;

  const res = await fetch(`${backend}/core/lafflab/feed`, {
    cache: "no-store",
  });

  const data = await res.json();
  return NextResponse.json({ posts: data.posts ?? [] });
}
