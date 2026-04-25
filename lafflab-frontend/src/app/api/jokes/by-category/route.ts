import { NextResponse } from "next/server";
import { getJokesByCategoryServer } from "@/lib/server/jokes";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get("id");

  if (!categoryId) {
    return NextResponse.json(
      { error: "Missing category id" },
      { status: 400 }
    );
  }

  const jokes = await getJokesByCategoryServer(categoryId);

  if (!jokes) {
    return NextResponse.json(
      { error: "Category not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(jokes);
}
