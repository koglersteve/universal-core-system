import { NextResponse } from "next/server";
import { jokes } from "@/lib/data"; // your in-memory data source

export async function GET() {
  try {
    return NextResponse.json(jokes, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to load jokes" },
      { status: 500 }
    );
  }
}
