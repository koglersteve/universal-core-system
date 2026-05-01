import { NextResponse } from "next/server";

const CATEGORIES = [
  { id: "dev", name: "Developer Jokes" },
  { id: "net", name: "Networking Jokes" },
];

interface Params {
  params: { id: string };
}

export async function GET(_req: Request, { params }: Params) {
  const category = CATEGORIES.find((c) => c.id === params.id);
  if (!category) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(category);
}
