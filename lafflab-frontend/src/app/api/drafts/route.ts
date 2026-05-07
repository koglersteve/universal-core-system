import { NextResponse } from "next/server";
import { z } from "zod";
import { getDrafts, saveDraft } from "@lib/server/jokes";

const DraftSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1)
});

export async function GET() {
  const drafts = await getDrafts();
  return NextResponse.json({ drafts });
}

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const data = DraftSchema.parse(json);
    const saved = await saveDraft(data);
    return NextResponse.json(saved);
  } catch (err) {
    return NextResponse.json({ error: "Invalid draft" }, { status: 400 });
  }
}
