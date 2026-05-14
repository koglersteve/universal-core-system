"use client";

import { useEffect, useState } from "react";
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

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadPosts() {
    const res = await fetch("/api/posts");
    const data = await res.json();
    setPosts(data.posts);
    setLoading(false);
  }

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-xl mx-auto p-4 space-y-6">
        <h1 className="text-2xl font-semibold mb-2">Feed</h1>

        <PostComposer onPostCreated={loadPosts} />

        {loading && <div className="text-white/60 mt-4">Loading…</div>}

        <div className="space-y-4 mt-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="border border-white/10 rounded-lg p-4 space-y-2"
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
            </div>
          ))}

          {!loading && posts.length === 0 && (
            <div className="text-white/50 text-sm mt-4">
              No posts yet. Be the first to post.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
