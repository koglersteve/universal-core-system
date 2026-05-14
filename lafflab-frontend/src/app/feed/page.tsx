"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Pencil } from "lucide-react";
import PostComposerModal from "@/components/PostComposerModal";
import MenuDrawer from "@/components/MenuDrawer";

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

const REACTION_EMOJIS = ["😂", "🙂", "😐", "😱", "🤯", "😡", "🦗"];

type ReactionMap = {
  [postId: string]: string | undefined;
};

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [composerOpen, setComposerOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [reactions, setReactions] = useState<ReactionMap>({});

  // Load reactions from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("lafflab_reactions");
    if (stored) {
      try {
        setReactions(JSON.parse(stored));
      } catch {
        setReactions({});
      }
    }
  }, []);

  function saveReactions(next: ReactionMap) {
    setReactions(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("lafflab_reactions", JSON.stringify(next));
    }
  }

  async function loadPage(targetPage: number, replace = false) {
    if (targetPage > 0 && !hasMore) return;

    if (targetPage === 0) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    const res = await fetch(`/api/feed?page=${targetPage}`);
    const data = await res.json();

    if (replace) {
      setPosts(data.posts);
    } else {
      setPosts((prev) => [...prev, ...data.posts]);
    }

    setHasMore(data.hasMore);
    setPage(targetPage);
    setLoading(false);
    setLoadingMore(false);
  }

  useEffect(() => {
    loadPage(0, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Infinite scroll
  useEffect(() => {
    function onScroll() {
      if (!hasMore || loadingMore) return;
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.body.offsetHeight - 400;
      if (scrollPosition >= threshold) {
        loadPage(page + 1);
      }
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [page, hasMore, loadingMore]);

  function handleReaction(postId: string, emoji: string) {
    const current = reactions[postId];
    const next: ReactionMap = { ...reactions };

    if (current === emoji) {
      delete next[postId];
    } else {
      next[postId] = emoji;
    }

    saveReactions(next);
  }

  async function handlePostCreated() {
    await loadPage(0, true);
  }

  return (
    <div className="min-h-screen bg-black text-white relative">

      <div className="fixed top-0 left-0 w-full h-14 bg-black/80 backdrop-blur flex items-center justify-between px-4 z-50 border-b border-white/10">
        <div className="w-8" />
        <div className="text-center text-white/80 text-sm font-medium">
          🔥 Your Ad Here 🔥
        </div>
        <button
          className="w-8 h-8 flex items-center justify-center"
          onClick={() => setDrawerOpen(true)}
        >
          <Menu size={24} />
        </button>
      </div>

      <div className="max-w-xl mx-auto pt-20 pb-24 p-4 space-y-6">

        {loading && <div className="text-white/60 mt-4">Loading…</div>}

        <div className="space-y-4 mt-4">
          {posts.map((post, index) => (
            <div key={post.id}>
              <div className="border border-white/10 rounded-lg p-4 space-y-2">
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

                <div className="flex justify-between text-xl pt-2 border-t border-white/10">
                  {REACTION_EMOJIS.map((emoji) => {
                    const active = reactions[post.id] === emoji;
                    return (
                      <button
                        key={emoji}
                        onClick={() => handleReaction(post.id, emoji)}
                        className={active ? "scale-110" : "opacity-70"}
                      >
                        {emoji}
                      </button>
                    );
                  })}
                </div>
              </div>

              {index > 0 && index % 8 === 0 && (
                <div className="my-4 p-4 bg-white/5 border border-white/10 rounded-lg text-center text-white/70">
                  🔥 Sponsored Ad 🔥
                </div>
              )}
            </div>
          ))}

          {!loading && posts.length === 0 && (
            <div className="text-white/50 text-sm mt-4">
              No posts yet.
            </div>
          )}

          {loadingMore && (
            <div className="text-white/60 text-sm text-center py-4">
              Loading more…
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => setComposerOpen(true)}
        className="fixed bottom-6 left-6 bg-white text-black p-3 rounded-full shadow-lg"
      >
        <Pencil size={22} />
      </button>

      <PostComposerModal
        open={composerOpen}
        onClose={() => setComposerOpen(false)}
        onPostCreated={handlePostCreated}
      />

      <MenuDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}
