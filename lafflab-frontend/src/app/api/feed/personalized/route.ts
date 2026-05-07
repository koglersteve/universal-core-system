import { NextResponse } from "next/server";
import { runPersonalization } from "@personalization/engine";
import { loadProfile } from "@personalization/profile-store";
import { extractSignals } from "@personalization/feature-extractor";

export async function GET() {
  const profile = await loadProfile();
  const signals = extractSignals(profile);
  const feed = await runPersonalization(signals);
  return NextResponse.json({ feed });
}
