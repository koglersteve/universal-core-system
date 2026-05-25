import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/core/lafflab/settings`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    return NextResponse.json({ settings: data.settings ?? {} });
  } catch (err) {
    console.error("API /api/settings error:", err);
    return NextResponse.json({ settings: {} });
  }
}
