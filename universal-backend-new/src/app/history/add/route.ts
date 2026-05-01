import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const userId = "anonymous"; // replace with real auth later

    const item = await prisma.history.create({
      data: {
        id,
        userId,
        viewedAt: BigInt(Date.now()),
      },
    });

    return NextResponse.json(item);
  } catch (err) {
    console.error("Error adding history:", err);
    return NextResponse.json({ error: "Failed to add history" }, { status: 500 });
  }
}
