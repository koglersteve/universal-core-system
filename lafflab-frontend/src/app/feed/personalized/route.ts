import { runPersonalizationEngine } from "@/personalization/engine";
import { getProfile } from "@/personalization/profile-store";

export async function GET() {
  const profile = await getProfile();
  const items = []; // placeholder
  const result = runPersonalizationEngine(profile, items);

  return Response.json(result);
}
