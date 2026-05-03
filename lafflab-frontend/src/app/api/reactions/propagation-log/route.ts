import { NextResponse } from "next/server";
import { getPropagationLog } from "@/core/reactions/propagationLog";

export async function GET() {
  const log = getPropagationLog();
  return NextResponse.json({
    ok: true,
    log,
  });
}
