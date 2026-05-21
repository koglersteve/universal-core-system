export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { getUserById } from "@/lib/server/user";
import FeedList from "@/app/feed/components/FeedList";

interface UserPostsPageProps {
  params: { id: string };
}

export default async function UserPostsPage({ params }: UserPostsPageProps) {
  const user = await getUserById(params.id);

  if (!user) {
    return (
      <div className="p-6 text-white">
        <div className="text-xl font-semibold mb-4">Posts</div>
        <div className="text-gray-300">User not found.</div>
      </div>
    );
  }

  const posts = await prisma.post.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          screenName: true,
          avatarUrl: true,
        },
      },
    },
  });

  return (
    <div className="p-6 text-white">
      <div className="text-xl font-semibold mb-4">
        Posts by {user.username}
      </div>
      <FeedList posts={posts} />
    </div>
  );
}
