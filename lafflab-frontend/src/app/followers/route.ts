import { NextResponse } from "next/server";
import { getFollowers } from "@/lib/server/follow";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { error: "Missing userId" },
      { status: 400 }
    );
  }

  const list = await getFollowers(userId);

  return NextResponse.json(list);
}
