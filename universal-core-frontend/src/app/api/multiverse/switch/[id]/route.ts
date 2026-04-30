export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  const backend = process.env.NEXT_PUBLIC_API_BASE_URL;

  const res = await fetch(`${backend}/multiverse/switch/${params.id}`, {
    method: "POST",
    cache: "no-store",
  });

  const data = await res.json();

  const response = NextResponse.json(data);
  response.cookies.set("universeId", params.id, {
    path: "/",
    sameSite: "lax",
  });

  return response;
}
