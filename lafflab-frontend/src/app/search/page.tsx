import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/server/user";
import FeedList from "@/app/feed/components/FeedList";

export const dynamic = "force-dynamic";

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
      <div className="text-xl font-semibold mb-4">My Posts</div>
      <FeedList posts={posts} />
    </div>
  );
}


