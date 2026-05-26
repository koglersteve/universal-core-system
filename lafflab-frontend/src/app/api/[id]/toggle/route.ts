import { NextResponse } from "next/server";
import { LaffLabApi } from "@/lib/api";

export async function POST(req, { params }) {
  const id = params.id;

  const result = await LaffLabApi.rawPost(`/core/favorites/${id}/toggle`);

  return NextResponse.json(result);
}
