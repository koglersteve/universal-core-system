import { NextResponse } from "next/server";

const CATEGORIES = [
  { id: "dev", name: "Developer Jokes" },
  { id: "net", name: "Networking Jokes" },
];

export async function GET() {
  return NextResponse.json(CATEGORIES);
}
