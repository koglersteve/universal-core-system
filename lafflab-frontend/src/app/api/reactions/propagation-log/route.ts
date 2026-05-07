import { NextResponse } from "next/server";
import { getPropagationLog } from "@core/reactions/propagationLog";

export async function GET() {
  const log = await getPropagationLog({ limit: 200 });
  return NextResponse.json({ log });
}
