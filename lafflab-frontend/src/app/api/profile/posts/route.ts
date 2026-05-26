import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL;

  const url = new URL(req.url);
  const username = url.searchParams.get("username");

  if (!backend) {
    return NextResponse.json(
      { error: "Backend URL not configured" },
      { status: 500 }
    );
  }

  if (!username) {
    return NextResponse.json(
      { error: "Missing username" },
      { status: 400 }
    );
  }

  const res = await fetch(
    `${backend}/core/lafflab/profile/posts?username=${username}`,
    { cache: "no-store" }
  );

  const data = await res.json();
  return NextResponse.json({ posts: data.posts ?? [] });
}
