import { NextResponse } from "next/server";
import { getReactionSummary } from "@core/reactions/engine";
import { getUserIdentity } from "@hooks/UserIdentity";

export async function GET() {
  const user = await getUserIdentity();
  const summary = await getReactionSummary(user.id);
  return NextResponse.json({ summary });
}

