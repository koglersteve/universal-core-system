import { NextResponse } from "next/server";
import { removeFavorite } from "../store";

export async function POST(req: Request) {
  const { jokeId } = await req.json();
  removeFavorite(jokeId);
  return NextResponse.json({ ok: true });
}
