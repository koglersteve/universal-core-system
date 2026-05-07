import { personalizedRanking } from "@/core/feed/personalizedRanking";
import { getJokes } from "@/lib/server/jokes";
import { getUserIdentity } from "@/hooks/UserIdentity";

export async function GET() {
  const user = await getUserIdentity();
  const jokes = await getJokes();
  const ranked = personalizedRanking(user, jokes);

  return Response.json(ranked);
}
