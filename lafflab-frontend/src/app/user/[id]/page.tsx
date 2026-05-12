export const dynamic = "force-dynamic";

import { getUserById } from "@/lib/server/user";
import Link from "next/link";

export default async function Component({ params }) {
  const user = await getUserById(params.id);

  if (!user) {
    return (
      <div className="p-6 text-white">
        <div className="text-xl font-semibold mb-4">User Not Found</div>
        <div className="text-gray-300">This profile does not exist.</div>
      </div>
    );
  }

  return (
    <div className="p-6 text-white space-y-6">
      <div className="flex items-center space-x-4">
        <img
          src={user.avatarUrl || "/default-avatar.png"}
          alt=""
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <div className="text-lg font-semibold">{user.username}</div>
          <div className="text-gray-400">@{user.id}</div>
        </div>
      </div>

      <div className="space-y-3">
        <Link
          href={`/user/${params.id}/followers`}
          className="block px-4 py-3 bg-white/10 rounded-md hover:bg-white/20 transition"
        >
          Followers
        </Link>

        <Link
          href={`/user/${params.id}/following`}
          className="block px-4 py-3 bg-white/10 rounded-md hover:bg-white/20 transition"
        >
          Following
        </Link>

        <Link
          href={`/user/${params.id}/posts`}
          className="block px-4 py-3 bg-white/10 rounded-md hover:bg-white/20 transition"
        >
          Posts
        </Link>
      </div>
    </div>
  );
}
