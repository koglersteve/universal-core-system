import { NextResponse } from "next/server";
import { updateUserProfile } from "@/lib/server/user";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body?.id) {
    return NextResponse.json(
      { error: "Missing user id" },
      { status: 400 }
    );
  }

  const updated = await updateUserProfile(body);

  return NextResponse.json(updated);
}
