import { NextResponse } from "next/server";
import { LaffLabApi } from "@/lib/api";

export async function GET(req, { params }) {
  const username = params.username;

  // Correct backend endpoint
  const profile = await LaffLabApi.rawGet(`/core/profile/${username}`);

  return NextResponse.json({ profile });
}
