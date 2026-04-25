import { NextResponse } from "next/server";
import { addFavorite } from "../store";

export async function POST(req: Request) {
  const { jokeId } = await req.json();
  addFavorite(jokeId);
  return NextResponse.json({ ok: true });
}
