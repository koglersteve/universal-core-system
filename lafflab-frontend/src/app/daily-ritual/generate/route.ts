import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    id: String(Date.now()),
    message: "Your daily ritual: Laugh at something unexpected today.",
  });
}
