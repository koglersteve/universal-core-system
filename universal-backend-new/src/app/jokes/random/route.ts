import { NextResponse } from "next/server";

const JOKES = [
  { id: "1", text: "Why did the developer go broke? Because they used up all their cache.", categoryId: "dev" },
  { id: "2", text: "I would tell you a UDP joke, but you might not get it.", categoryId: "net" },
];

export async function GET() {
  const idx = Math.floor(Math.random() * JOKES.length);
  return NextResponse.json(JOKES[idx]);
}
