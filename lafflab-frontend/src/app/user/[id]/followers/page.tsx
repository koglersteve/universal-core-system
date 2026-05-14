import { prisma } from "@/lib/prisma";
import FollowButton from "@/components/FollowButton";
import { getUser } from "@/lib/server/user";
import Link from "next/link";

export default async function FollowersPage({ params }: { params: { id: string } }) {
  const profileId = params.id;

  const followers = await prisma.follow.findMany({
    where: { followingId: profileId },
    include: {
      follower: {
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
      <h1 className="text-xl font-semibold">Followers</h1>

      {followers.length === 0 && (
        <div className="text-white/60">No followers yet.</div>
      )}

      {followers.map((f) => {
        const u = f.follower;
        return (
          <div key={u.id} className="flex items-center justify-between py-2 border-b border-white/10">
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
              <FollowButton
                userId={u.id}
                initialFollowing={false}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
