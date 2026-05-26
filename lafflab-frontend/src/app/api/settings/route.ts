import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL;

  if (!backend) {
    return NextResponse.json(
      { error: "Backend URL not configured" },
      { status: 500 }
    );
  }

  const res = await fetch(`${backend}/core/lafflab/settings`, {
    cache: "no-store",
  });

  const data = await res.json();
  return NextResponse.json({ settings: data.settings ?? {} });
}
