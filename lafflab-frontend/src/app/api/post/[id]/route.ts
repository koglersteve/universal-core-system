import { NextResponse } from "next/server";
import { LaffLabApi } from "@/lib/LaffLabApi";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const post = await LaffLabApi.getPost(params.id);
    return NextResponse.json({ post });
  } catch (err) {
    console.error("API /api/post error:", err);
    return NextResponse.json({ post: null }, { status: 500 });
  }
}
