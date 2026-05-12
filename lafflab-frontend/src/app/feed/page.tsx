export const dynamic = "force-dynamic";

import FeedList from "@/app/feed/components/FeedList";
import { headers } from "next/headers";

export default async function Component() {
  // Build a fully-qualified absolute URL for RSC-safe internal fetches
  const host = headers().get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const url = `${protocol}://${host}/api/posts`;

  const posts = await fetch(url, {
    cache: "no-store",
  }).then((r) => r.json());

  return (
    <div className="p-6 text-white">
      <div className="text-xl font-semibold mb-4">Feed</div>
      <FeedList posts={posts} />
    </div>
  );
}
