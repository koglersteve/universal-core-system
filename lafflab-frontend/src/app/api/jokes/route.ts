import { NextResponse } from "next/server";
import { JOKES } from "@/lib/data";

export async function GET() {
  try {
    return NextResponse.json(JOKES, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to load jokes" },
      { status: 500 }
    );
  }
}
