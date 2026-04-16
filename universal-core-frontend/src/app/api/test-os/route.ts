import { NextResponse } from "next/server";

export async function GET() {
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL;

  try {
    const res = await fetch(`${backend}/os`, { cache: "no-store" });
    const data = await res.json();

    return NextResponse.json({
      ok: true,
      backend,
      data,
    });
  } catch (err) {
    return NextResponse.json({
      ok: false,
      backend,
      error: String(err),
    });
  }
}
