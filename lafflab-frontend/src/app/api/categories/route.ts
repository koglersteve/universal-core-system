import { NextRequest, NextResponse } from "next/server";
import { ENDPOINTS } from "@/lib/api/endpoints";

export async function GET(request: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;

  try {
    const res = await fetch(ENDPOINTS.CATEGORY_BY_ID(id), {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch category" }, { status: 500 });
  }
}
