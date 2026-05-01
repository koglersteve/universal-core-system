import { NextResponse } from "next/server";

export async function POST() {
  const ritual = {
    id: "demo-ritual",
    title: "Daily Laugh Ritual",
    steps: [
      "Open LAFFLab.",
      "Watch one joke clip.",
      "Share your favorite with a friend.",
    ],
    createdAt: new Date().toISOString(),
  };

  return NextResponse.json(ritual);
}
