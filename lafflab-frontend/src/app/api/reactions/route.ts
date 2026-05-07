import { NextResponse } from "next/server";
import { processReaction } from "@core/reactions/engine";
import { ReactionSchema } from "@core/reactions/propagationConfig";

export async function POST(req: Request) {
  const json = await req.json();
  const data = ReactionSchema.parse(json);
  const result = await processReaction(data);
  return NextResponse.json(result);
}
