import { NextResponse } from "next/server";
import { getPropagationLog } from "@/core/reactions/propagationLog";

export async function GET() {
  return NextResponse.json({
    ok: true,
    log: getPropagationLog(),
  });
}
