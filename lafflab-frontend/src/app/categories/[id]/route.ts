import { NextResponse } from "next/server";
import { getCategoryByIdServer } from "@/lib/server/categories";

export async function GET(
  req: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  const category = await getCategoryByIdServer(id);

  if (!category) {
    return NextResponse.json(
      { error: "Category not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(category);
}
