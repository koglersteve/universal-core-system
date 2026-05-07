import { NextResponse } from "next/server";
import trending from "@/notifications/templates/trending";
import system from "@/notifications/templates/system";
import newPost from "@/notifications/templates/new-post";
import creatorUpdate from "@/notifications/templates/creator-update";

const Templates = {
  trending,
  system,
  "new-post": newPost,
  "creator-update": creatorUpdate,
};

export async function POST(req: Request) {
  const body = await req.json();
  const { type, payload } = body;

  const template = Templates[type];
  if (!template) {
    return NextResponse.json({ error: "Unknown notification type" }, { status: 400 });
  }

  const message = template(payload);

  return NextResponse.json({
    success: true,
    message,
  });
}
