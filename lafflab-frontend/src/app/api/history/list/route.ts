import { NextResponse } from "next/server";
import { getHistory } from "@/app/history/store";

export async function GET() {
  try {
    const history = await getHistory(); // fetch from backend
    return NextResponse.json(history);
  } catch (err) {
    console.error("History fetch failed:", err);
    return NextResponse.json(
      { error: "Failed to load history" },
      { status: 500 }
    );
  }
}

