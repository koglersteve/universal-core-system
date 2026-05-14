import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/server/user";
import FollowButton from "@/components/FollowButton";
import Link from "next/link";

export default async function FollowingPage({ params }: { params: { id: string } }) {
  const profileId = params.id;

  const following = await prisma.follow.findMany({
    where: { followerId: profileId },
    include: {
      following: {
        select: {
          id: true,
          username: true,
          screenName: true,
          avatarUrl: true,
        },
      },
    },
  });

  const { user } = await getUser();

  return (
    <div className="p-6 text-white space-y-4">
      <h1 className="text-xl font-semibold">Following</h1>

      {following.map((f) => {
        const u = f.following;
        return (
          <div key={u.id} className="flex items-center justify-between py-3 border-b border-white/10">
            <Link href={`/user/${u.id}`} className="flex items-center gap-3">
              <img
                src={u.avatarUrl || "/default-avatar.png"}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="font-medium">{u.screenName}</div>
                <div className="text-sm text-white/60">@{u.username}</div>
              </div>
            </Link>

            {user && user.id !== u.id && (
              <FollowButton userId={u.id} initialFollowing={true} />
            )}
          </div>
        );
      })}
    </div>
  );
}
