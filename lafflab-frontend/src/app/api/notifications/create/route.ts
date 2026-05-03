import { NextResponse } from "next/server";
import { getInbox } from "@/notifications/inbox-store";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const user = searchParams.get("user") ?? "anonymous";

  const inbox = await getInbox(user);
  return NextResponse.json(inbox);
}
