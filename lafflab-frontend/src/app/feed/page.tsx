export const dynamic = "force-dynamic";

import FeedList from "@/app/feed/components/FeedList";

export default async function Component() {
  const posts = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`,
    { cache: "no-store" }
  ).then((r) => r.json());

  return (
    <div className="p-6 text-white">
      <div className="text-xl font-semibold mb-4">Feed</div>
      <FeedList posts={posts} />
    </div>
  );
}
