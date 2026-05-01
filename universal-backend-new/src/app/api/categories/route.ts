import { NextRequest, NextResponse } from "next/server";
import { ENDPOINTS } from "@/lib/api/endpoints";

export async function GET(request: NextRequest) {
  try {
    const res = await fetch(ENDPOINTS.CATEGORIES_LIST, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch categories" },
        { status: 500 }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "Unexpected server error" },
      { status: 500 }
    );
  }
}
