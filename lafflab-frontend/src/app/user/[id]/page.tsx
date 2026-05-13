export const dynamic = "force-dynamic";

import { getUserById } from "@/lib/server/user";
import FeedList from "@/app/feed/components/FeedList";

export default async function Page({ params }: { params: { id: string } }) {
  const user = await getUserById(params.id);

  if (!user) {
    return (
      <div className="p-6 text-white">
        <div className="text-xl font-semibold mb-4">User</div>
        <div className="text-gray-300">User not found.</div>
      </div>
    );
  }

  const posts = await fetch(`/api/posts?userId=${params.id}`, {
    cache: "no-store",
  }).then((r) => r.json());

  return (
    <div className="p-6 text-white">
      <div className="text-xl font-semibold mb-4">{user.screenName}'s Posts</div>
      <FeedList posts={posts} />
    </div>
  );
}
