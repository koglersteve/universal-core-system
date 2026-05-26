import { NextResponse } from "next/server";
import { LaffLabApi } from "@/lib/api";

export async function GET(req, { params }) {
  const id = params.id;
  const post = await LaffLabApi.getPost(id);
  return NextResponse.json({ post });
}
