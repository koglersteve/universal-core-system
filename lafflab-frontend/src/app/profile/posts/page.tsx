export const dynamic = "force-dynamic";

import { getUser } from "@/lib/server/user";
import { prisma } from "@/lib/prisma";
import FeedList from "@/components/FeedList";

export default async function ProfilePostsPage() {
  const { user } = await getUser();

  if (!user) {
    return (
      <div className="p-6 text-white">
        <div className="text-xl font-semibold mb-4">My Posts</div>
        <div className="text-gray-300">You are not logged in.</div>
      </div>
    );
  }

  const posts = await prisma.post.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6 text-white">
      <div className="text-xl font-semibold mb-4">My Posts</div>
      <FeedList posts={posts} />
    </div>
  );
}
