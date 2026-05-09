import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { token, password } = await req.json();

  const record = await db.password_reset_tokens.findUnique({
    where: { token },
  });

  if (!record || record.used)
    return NextResponse.json({ error: "Invalid token" }, { status: 400 });

  if (record.expires_at < new Date())
    return NextResponse.json({ error: "Token expired" }, { status: 400 });

  const hashed = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { id: record.user_id },
    data: { password: hashed },
  });

  await db.password_reset_tokens.update({
    where: { token },
    data: { used: true },
  });

  return NextResponse.json({ ok: true });
}
