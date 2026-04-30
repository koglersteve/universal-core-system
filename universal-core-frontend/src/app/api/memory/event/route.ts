export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

export async function POST(req) {
  const backend = process.env.NEXT_PUBLIC_API_BASE_URL;
  const body = await req.json();

  const res = await fetch(`${backend}/memory/event`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  const data = await res.json();
  return NextResponse.json(data);
}
