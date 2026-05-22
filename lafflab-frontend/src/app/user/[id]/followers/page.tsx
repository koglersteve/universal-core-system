"use client";

import { useEffect, useState } from "react";

export default function UserFollowersPage({ params }: any) {
  const { id } = params;
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}/followers`)
      .then((res) => res.json())
      .then(setFollowers);
  }, [id]);

  return (
    <div className="p-4 space-y-4 text-white">
      <h1 className="text-2xl font-semibold">Followers</h1>

      {followers.map((f: any) => (
        <div
          key={f.id}
          className="p-4 rounded-lg bg-white/5 border border-white/10"
        >
          {f.follower?.username}
        </div>
      ))}
    </div>
  );
}
