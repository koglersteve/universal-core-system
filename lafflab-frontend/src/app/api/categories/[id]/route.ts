import { NextResponse } from "next/server";

const CATEGORIES = [
  { id: "general", name: "General" },
  { id: "math", name: "Math" },
  { id: "tech", name: "Tech" },
  { id: "animals", name: "Animals" }
];

export async function GET(
  req: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  const category = CATEGORIES.find((c) => c.id === id);

  if (!category) {
    return NextResponse.json(
      { error: "Category not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(category);
}
