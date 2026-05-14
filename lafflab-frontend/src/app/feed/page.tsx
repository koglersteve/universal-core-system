"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PostComposer from "@/components/PostComposer";

type Post = {
  id: string;
  content: string;
  imageUrl: string | null;
  createdAt: string;
  user: {
    id: string;
    username: string | null;
    screenName: string | null;
    avatarUrl: string | null;
  };
};

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadFeed() {
    const res = await fetch("/api/feed");
    const data = await res.json();
    setPosts(data.posts);
    setLoading(false);
  }

  useEffect(() => {
    loadFeed();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-xl mx-auto p-4 space-y-6">
        <h1 className="text-2xl font-semibold mb-2">Home</h1>

        <PostComposer onPostCreated={loadFeed} />

        {loading && <div className="text-white/60 mt-4">Loading…</div>}

        <div className="space-y-4 mt-4">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/post/${post.id}`}
              className="block border border-white/10 rounded-lg p-4 space-y-2 hover:border-white/30 transition"
            >
              <div className="flex items-center gap-3">
                <img
                  src={post.user.avatarUrl || "/default-avatar.png"}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <div className="text-sm font-medium">
                    {post.user.screenName}
                  </div>
                  <div className="text-xs text-white/60">
                    @{post.user.username}
                  </div>
                </div>
              </div>

              <div className="text-sm mt-2 whitespace-pre-wrap">
                {post.content}
              </div>

              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  className="mt-2 max-h-80 rounded-md border border-white/10 object-cover"
                />
              )}

              <div className="text-xs text-white/40 mt-1">
                {new Date(post.createdAt).toLocaleString()}
              </div>
            </Link>
          ))}

          {!loading && posts.length === 0 && (
            <div className="text-white/50 text-sm mt-4">
              No posts yet. Follow people or create your first post.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
