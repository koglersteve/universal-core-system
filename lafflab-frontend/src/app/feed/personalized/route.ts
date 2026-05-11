import { runPersonalizationEngine } from "@/personalization/engine";
import { getProfile } from "@/personalization/profile-store";
import { getPosts } from "@/lib/server/posts";

export async function GET() {
  const profile = await getProfile();
  const posts = await getPosts();

  const result = runPersonalizationEngine(profile, posts);

  return Response.json(result);
}
