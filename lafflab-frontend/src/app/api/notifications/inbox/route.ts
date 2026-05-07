import { NextResponse } from "next/server";
import { getInbox } from "@notifications/inbox-store";
import { getUserIdentity } from "@hooks/UserIdentity";

export async function GET() {
  const user = await getUserIdentity();
  const inbox = await getInbox(user.id);
  return NextResponse.json({ inbox });
}
