import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    // Your existing logic here
    // Example:
    // const joke = await getJokeById(id);
    // if (!joke) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json({ id, message: "Joke loaded successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
