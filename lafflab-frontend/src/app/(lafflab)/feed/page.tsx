import { LaffLabApi } from "@/lib/api";
import FeedShell from "./FeedShell";

export const dynamic = "force-dynamic";

export default async function Page() {
  const data = await LaffLabApi.fetchFeed({
    limit: 10,
  });

  return <FeedShell initialFeed={data.items} />;
}
