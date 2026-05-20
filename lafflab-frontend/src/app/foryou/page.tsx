import ForYouFeed from "@/components/ForYouFeed";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/server/user";

export default async function ForYouPage() {
  const { user } = await getUser();

  // If not logged in, show global feed
  const posts = await prisma.post.findMany({
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
    take: 50,
  });

  return (
    <div className="p-4">
      <ForYouFeed items={posts} />
    </div>
  );
}
