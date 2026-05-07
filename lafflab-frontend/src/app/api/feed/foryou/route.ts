import { NextResponse } from "next/server";
import personalizedRanking from "@core/feed/personalizedRanking";
import { getTrending } from "@lib/server/jokes";
import { getUserIdentity } from "@hooks/UserIdentity";

export async function GET() {
  const user = await getUserIdentity();
  const trending = await getTrending();
  const feed = personalizedRanking(trending, user);
  return NextResponse.json({ feed });
}
