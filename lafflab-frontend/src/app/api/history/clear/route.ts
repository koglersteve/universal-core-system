import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    await prisma.history.deleteMany({});
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error clearing history:", err);
    return NextResponse.json(
      { error: "Failed to clear history" },
      { status: 500 }
    );
  }
}
