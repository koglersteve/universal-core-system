import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/core/lafflab/history`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    return NextResponse.json({ history: data.history ?? [] });
  } catch (err) {
    console.error("API /api/history error:", err);
    return NextResponse.json({ history: [] });
  }
}
