import { NextResponse } from "next/server";
import { z } from "zod";
import { recordImpression } from "@lib/analytics";

const ImpressionSchema = z.object({
  postId: z.string(),
  userId: z.string().optional(),
  surface: z.string()
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const data = ImpressionSchema.parse(json);
    await recordImpression(data);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid impression" }, { status: 400 });
  }
}
