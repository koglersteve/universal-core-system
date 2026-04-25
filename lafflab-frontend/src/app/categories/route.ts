import { NextResponse } from "next/server";
import { getCategoriesServer } from "@/lib/server/categories";

export async function GET() {
  const categories = await getCategoriesServer();
  return NextResponse.json(categories);
}
