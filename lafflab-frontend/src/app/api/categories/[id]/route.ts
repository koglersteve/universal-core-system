import { NextResponse } from "next/server";
import { getCategoryById } from "@/lib/data";

export async function GET(
  _req: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  try {
    const category = getCategoryById(id);

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
