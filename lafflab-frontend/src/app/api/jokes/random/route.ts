import { NextResponse } from "next/server";
import { getRandomJokeServer } from "@/lib/server/jokes";

export async function GET() {
  const joke = await getRandomJokeServer();
  return NextResponse.json(joke);
}
