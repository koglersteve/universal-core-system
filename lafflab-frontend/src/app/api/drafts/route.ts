import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

// Temporary in-memory store (replace with DB later)
let DRAFTS: any[] = [];

export async function GET() {
  return NextResponse.json({ drafts: DRAFTS });
}

export async function POST(req: Request) {
  const body = await req.json();

  const draft = {
    id: randomUUID(),
    text: body.text || "",
    updatedAt: new Date().toISOString(),
  };

  DRAFTS.unshift(draft);

  return NextResponse.json({ draft });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  DRAFTS = DRAFTS.filter((d) => d.id !== id);

  return NextResponse.json({ ok: true });
}
