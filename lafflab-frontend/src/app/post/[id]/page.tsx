export const dynamic = "force-dynamic";

import { getUser } from "@/lib/server/user";
import FeedList from "@/app/feed/components/FeedList";

export default async function Component({
  params,
}: {
  params: { id: string };
}) {
  const { user } = await getUser();

  if (!user) {
    return (
      <div className="p-6 text-white">
        <div className="text-xl font-semibold mb-4">Post</div>
        <div className="text-gray-300">You are not logged in.</div>
      </div>
    );
  }

  const post = await fetch(`/api/posts/${params.id}`, {
    cache: "no-store",
  }).then((r) => r.json());

  if (!post || post.error) {
    return (
      <div className="p-6 text-white">
        <div className="text-xl font-semibold mb-4">Post</div>
        <div className="text-gray-300">Post not found.</div>
      </div>
    );
  }

  return (
    <div className="p-6 text-white">
      <div className="text-xl font-semibold mb-4">Post</div>
      <FeedList posts={[post]} />
    </div>
  );
}
