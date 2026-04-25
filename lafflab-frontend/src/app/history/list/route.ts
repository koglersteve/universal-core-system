import { NextResponse } from "next/server";
import { getHistory } from "../store";

export async function GET() {
  return NextResponse.json(
    getHistory().map((id) => ({
      id,
      text: `History joke placeholder for ${id}`,
      category: "general",
    }))
  );
}
