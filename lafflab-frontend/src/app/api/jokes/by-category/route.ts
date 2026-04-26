import { NextResponse } from "next/server";
import { getJokesByCategoryServer } from "@/lib/server/jokes";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Missing category id" },
      { status: 400 }
    );
  }

  try {
    const jokes = await getJokesByCategoryServer(id);

    if (!jokes || jokes.length === 0) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(jokes, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
