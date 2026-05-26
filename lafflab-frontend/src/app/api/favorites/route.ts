import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const userId = new URL(req.url).searchParams.get("userId");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/core/lafflab/favorites?userId=${userId}`
  );

  const data = await res.json();
  return NextResponse.json({ favorites: data.favorites ?? [] });
}
