// src/app/(lafflab)/feed/page.tsx

import { LaffLabApi } from "@/lib/api";
import FeedShell from "./FeedShell";

export const dynamic = "force-dynamic";

export default async function Page() {
  const data = await LaffLabApi.fetchFeed({
    app: "lafflab",
    limit: 10,
  });

  // Backend returns { posts: [...] }
  return <FeedShell initialFeed={data.posts} />;
}
