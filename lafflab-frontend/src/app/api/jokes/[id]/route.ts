import { NextResponse } from "next/server";
import { getJokeByIdServer } from "@/lib/server/jokes";

export async function GET(
  req: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  const joke = await getJokeByIdServer(id);

  if (!joke) {
    return NextResponse.json({ error: "Joke not found" }, { status: 404 });
  }

  return NextResponse.json(joke);
}
