export const dynamic = "force-dynamic";

import { headers } from "next/headers";
import { getUserById } from "@/lib/server/user";

export default async function FollowersPage({ params }) {
  const user = await getUserById(params.id);

  if (!user) {
    return (
      <div className="p-6 text-white">
        <div className="text-xl font-semibold mb-4">Followers</div>
        <div className="text-gray-300">User not found.</div>
      </div>
    );
  }

  const host = headers().get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const url = `${protocol}://${host}/api/followers?userId=${params.id}`;

  const followers = await fetch(url, { cache: "no-store" }).then((r) =>
    r.json()
  );

  return (
    <div className="p-6 text-white space-y-4">
      <div className="text-xl font-semibold">Followers</div>

      {followers.length === 0 ? (
        <div className="text-gray-400 text-sm">No followers yet.</div>
      ) : (
        <div className="space-y-3">
          {followers.map((id: string) => (
            <a
              key={id}
              href={`/user/${id}`}
              className="block px-4 py-3 bg-white/10 rounded-md hover:bg-white/20 transition"
            >
              @{id}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
