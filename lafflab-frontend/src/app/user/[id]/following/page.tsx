"use client";

import { useEffect, useState } from "react";

export default function UserFollowingPage({ params }: any) {
  const { id } = params;
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}/following`)
      .then((res) => res.json())
      .then(setFollowing);
  }, [id]);

  return (
    <div className="p-4 space-y-4 text-white">
      <h1 className="text-2xl font-semibold">Following</h1>

      {following.map((f: any) => (
        <div
          key={f.id}
          className="p-4 rounded-lg bg-white/5 border border-white/10"
        >
          {f.following?.username}
        </div>
      ))}
    </div>
  );
}
