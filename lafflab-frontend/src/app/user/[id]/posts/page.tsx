export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import FeedList from "@/components/FeedList";

export default async function UserPostsPage({ params }: { params: { id: string } }) {
  const posts = await prisma.post.findMany({
    where: { userId: params.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6 text-white">
      <div className="text-xl font-semibold mb-4">Posts</div>
      <FeedList posts={posts} />
    </div>
  );
}
