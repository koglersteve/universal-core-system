"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Pencil } from "lucide-react";
import PostComposerModal from "@/components/PostComposerModal";

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
  const [composerOpen, setComposerOpen] = useState(false);

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
    <div className="min-h-screen bg-black text-white relative">

      {/* TOP BAR */}
      <div className="fixed top-0 left-0 w-full h-14 bg-black/80 backdrop-blur flex items-center justify-between px-4 z-50 border-b border-white/10">
        <div className="w-8" />

        <div className="text-center text-white/80 text-sm font-medium">
          🔥 Your Ad Here 🔥
        </div>

        <button className="w-8 h-8 flex items-center justify-center">
          <Menu size={24} />
        </button>
      </div>

      {/* MAIN FEED */}
      <div className="max-w-xl mx-auto pt-20 pb-24 p-4 space-y-6">

        {loading && <div className="text-white/60 mt-4">Loading…</div>}

        <div className="space-y-4 mt-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="border border-white/10 rounded-lg p-4 space-y-2"
            >
              <Link href={`/post/${post.id}`} className="block space-y-2">
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

              {/* REACTION BAR */}
              <div className="flex justify-between text-xl pt-2 border-t border-white/10">
                <button>😂</button>
                <button>🙂</button>
                <button>😐</button>
                <button>😱</button>
                <button>🤯</button>
                <button>😡</button>
                <button>🦗</button>
              </div>
            </div>
          ))}

          {!loading && posts.length === 0 && (
            <div className="text-white/50 text-sm mt-4">
              No posts yet.
            </div>
          )}
        </div>
      </div>

      {/* FLOATING COMPOSER ICON */}
      <button
        onClick={() => setComposerOpen(true)}
        className="fixed bottom-6 left-6 bg-white text-black p-3 rounded-full shadow-lg"
      >
        <Pencil size={22} />
      </button>

      {/* POPUP COMPOSER */}
      <PostComposerModal
        open={composerOpen}
        onClose={() => setComposerOpen(false)}
        onPostCreated={loadFeed}
      />
    </div>
  );
}
