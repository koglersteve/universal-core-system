import { NextResponse } from "next/server";
import { getNotifications } from "@lib/server/notifications";
import { getUserIdentity } from "@hooks/UserIdentity";

export async function GET() {
  const user = await getUserIdentity();
  const items = await getNotifications(user?.id ?? null);
  return NextResponse.json({ items });
}
