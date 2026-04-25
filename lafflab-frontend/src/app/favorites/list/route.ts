import { NextResponse } from "next/server";
import { getFavorites } from "../store";

export async function GET() {
  return NextResponse.json(
    getFavorites().map((id) => ({
      id,
      text: `Favorite joke placeholder for ${id}`,
      category: "general",
    }))
  );
}
