// src/app/(lafflab)/feed/page.tsx

import { LaffLabApi } from "@/lib/api";
import FeedShell from "./FeedShell";

export const dynamic = "force-dynamic";

export default async function Page() {
  const data = await LaffLabApi.fetchFeed({
    app: "lafflab",
    limit: 10,
  });

  return <FeedShell initialFeed={data.items} />;
}
