import { NextResponse } from "next/server";

const JOKES = [
  { id: "1", text: "Why did the developer go broke? Because they used up all their cache.", categoryId: "dev" },
  { id: "2", text: "I would tell you a UDP joke, but you might not get it.", categoryId: "net" },
];

interface Params {
  params: { id: string };
}

export async function GET(_req: Request, { params }: Params) {
  const joke = JOKES.find((j) => j.id === params.id);
  if (!joke) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(joke);
}
