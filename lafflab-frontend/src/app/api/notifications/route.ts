import { NextResponse } from "next/server";
import { getNotifications } from "@core/notifications/engine";
import { getUserIdentity } from "@hooks/UserIdentity";

export async function GET() {
  const user = await getUserIdentity();
  const items = await getNotifications(user.id);
  return NextResponse.json({ items });
}
