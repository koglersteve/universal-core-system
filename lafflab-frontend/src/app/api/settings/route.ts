import { NextRequest } from "next/server";
import prisma from "@/lib/prisma"; // your prisma client

// TEMP: Hardcoded user until auth is wired
const USER_ID = "demo-user-123";

export async function GET() {
  let settings = await prisma.userSettings.findUnique({
    where: { userId: USER_ID }
  });

  if (!settings) {
    settings = await prisma.userSettings.create({
      data: { userId: USER_ID }
    });
  }

  return Response.json(settings);
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();

  const updated = await prisma.userSettings.update({
    where: { userId: USER_ID },
    data: body
  });

  return Response.json(updated);
}
