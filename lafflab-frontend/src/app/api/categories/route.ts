import { NextResponse } from "next/server";

const CATEGORIES = [
  { id: "general", name: "General" },
  { id: "math", name: "Math" },
  { id: "tech", name: "Tech" },
  { id: "animals", name: "Animals" }
];

export async function GET() {
  return NextResponse.json(CATEGORIES);
}
