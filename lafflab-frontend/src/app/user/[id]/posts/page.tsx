export const dynamic = "force-dynamic";

import { getUserById } from "@/lib/server/user";
import FeedList from "@/app/feed/components/FeedList";

export default async function Component({ params }) {
  const user = await getUserById(params.id);

  if (!user) {
    return (
      <div className="p-6 text-white">
        <div className="text-xl font-semibold mb-4">Posts</div>
        <div className="text-gray-300">User not found.</div>
      </div>
    );
  }

  const posts = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts?userId=${params.id}`,
    { cache: "no-store" }
  ).then((r) => r.json());

  return (
    <div className="p-6 text-white">
      <div className="text-xl font-semibold mb-4">
        Posts by {user.username}
      </div>
      <FeedList posts={posts} />
    </div>
  );
}
