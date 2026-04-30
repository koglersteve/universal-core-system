import { NextResponse } from "next/server";

export async function GET() {
  const backend = process.env.NEXT_PUBLIC_API_BASE_URL;
  const res = await fetch(`${backend}/multiverse/list`);
  const data = await res.json();
  return NextResponse.json(data);
}
