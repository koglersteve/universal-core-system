"use client";

import { useEffect, useState } from "react";

export default function UserPostsPage({ params }: any) {
  const { id } = params;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}/posts`)
      .then((res) => res.json())
      .then(setPosts);
  }, [id]);

  return (
    <div className="p-4 space-y-4 text-white">
      <h1 className="text-2xl font-semibold">Posts</h1>

      {posts.map((p: any) => (
        <div
          key={p.id}
          className="p-4 rounded-lg bg-white/5 border border-white/10"
        >
          {p.text}
        </div>
      ))}
    </div>
  );
}
