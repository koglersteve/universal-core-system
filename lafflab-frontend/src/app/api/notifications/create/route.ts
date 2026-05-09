import { NextResponse } from "next/server";
import { trending } from "@/notifications/templates/trending";
import { system } from "@/notifications/templates/system";
import { newPost } from "@/notifications/templates/new-post";
import { creatorUpdate } from "@/notifications/templates/creator-update";

export async function POST(req: Request) {
  const { type } = await req.json();

  const templates: any = {
    trending,
    system,
    newPost,
    creatorUpdate,
  };

  const template = templates[type];

  if (!template) {
    return NextResponse.json({ error: "Invalid template" }, { status: 400 });
  }

  return NextResponse.json({ ok: true, template });
}
