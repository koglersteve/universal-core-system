import { NextResponse } from "next/server";
import { LaffLabApi } from "@/lib/api";

export async function GET(req, { params }) {
  const username = params.username;
  const profile = await LaffLabApi.getProfile(username);
  return NextResponse.json({ profile });
}
