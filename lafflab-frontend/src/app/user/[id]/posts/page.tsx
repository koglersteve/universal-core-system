export const dynamic = "force-dynamic";

import { getUserById } from "@/lib/server/user";
import FeedList from "@/app/feed/components/FeedList";
import { headers } from "next/headers";

export default async function UserPostsPage({ params }) {
  const user = await getUserById(params.id);

  if (!user) {
    return (
      <div className="p-6 text-white">
        <div className="text-xl font-semibold mb-4">Posts</div>
        <div className="text-gray-300">User not found.</div>
      </div>
    );
  }

  // Build absolute URL (required for RSC)
  const host = headers().get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const url = `${protocol}://${host}/api/posts?userId=${params.id}`;

  const posts = await fetch(url, { cache: "no-store" }).then((r) => r.json());

  return (
    <div className="p-6 text-white">
      <div className="text-xl font-semibold mb-4">Posts by {user.username}</div>
      <FeedList posts={posts} />
    </div>
  );
}
