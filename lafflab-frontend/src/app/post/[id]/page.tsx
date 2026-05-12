export const dynamic = "force-dynamic";

import { getUser } from "@/lib/server/user";
import FeedList from "@/app/feed/components/FeedList";

export default async function Component() {
  const { user } = await getUser();

  if (!user) {
    return (
      <div className="p-6 text-white">
        <div className="text-xl font-semibold mb-4">My Posts</div>
        <div className="text-gray-300">You are not logged in.</div>
      </div>
    );
  }

  const posts = await fetch(
    `/api/posts?userId=${user.id}`,
    { cache: "no-store" }
  ).then((r) => r.json());

  return (
    <div className="p-6 text-white">
      <div className="text-xl font-semibold mb-4">My Posts</div>
      <FeedList posts={posts} />
    </div>
  );
}
