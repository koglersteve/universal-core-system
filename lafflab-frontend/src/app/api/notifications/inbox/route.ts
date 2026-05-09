export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getInbox } from "@/notifications/inbox-store";

export async function GET() {
  const inbox = getInbox("demo-user");
  return NextResponse.json(inbox);
}
