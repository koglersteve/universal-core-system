"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { RefreshCcw, Pencil } from "lucide-react";
import PostComposerModal from "@/components/PostComposerModal";
import PostFullscreenViewer from "@/components/PostFullscreenViewer";

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

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [composerOpen, setComposerOpen] = useState(false);

  const [fullscreenPost, setFullscreenPost] = useState<Post | null>(null);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);

  const [reactions, setReactions] = useState({});
  const scrollPos = useRef(0);

  // Load reactions from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("lafflab_reactions");
    if (stored) setReactions(JSON.parse(stored));
  }, []);

  function saveReactions(next) {
    setReactions(next);
    localStorage.setItem("lafflab_reactions", JSON.stringify(next));
  }

  function handleReact(postId, emoji) {
    const current = reactions[postId];
    const next = { ...reactions };

    if (current === emoji) delete next[postId];
    else next[postId] = emoji;

    saveReactions(next);
  }

  async function loadFeed() {
    setLoading(true);
    const res = await fetch("/api/feed");
    const data = await res.json();
    setPosts(data.posts);
    setLoading(false);
  }

  useEffect(() => {
    loadFeed();
  }, []);

  function openFullscreen(post) {
    scrollPos.current = window.scrollY;
    setFullscreenPost(post);
    setFullscreenOpen(true);
    document.body.style.overflow = "hidden";
  }

  function closeFullscreen() {
    setFullscreenOpen(false);
    setFullscreenPost(null);
    document.body.style.overflow = "auto";
    window.scrollTo(0, scrollPos.current);
  }

  return (
    <div className="min-h-screen bg-black text-white relative">

      {/* TOP BAR */}
      <div className="fixed top-0 left-0 w-full h-14 bg-black/80 backdrop-blur flex items-center justify-between px-4 z-50 border-b border-white/10">

        {/* REFRESH BUTTON (TOP LEFT) */}
        <button
          onClick={loadFeed}
          className="text-white/80 hover:text-white"
        >
          <RefreshCcw size={22} />
        </button>

        <div className="text-center text-white/80 text-sm font-medium">
          🔥 Your Ad Here 🔥
        </div>

        <div className="w-8" />
      </div>

      {/* FEED */}
      <div className="max-w-xl mx-auto pt-20 pb-24 p-4 space-y-6">

        {loading && <div className="text-white/60 mt-4">Loading…</div>}

        <div className="space-y-4 mt-4">
          {posts.map((post, index) => (
            <div key={post.id}>
              <div
                onClick={() => openFullscreen(post)}
                className="border border-white/10 rounded-lg p-4 space-y-2 cursor-pointer"
              >
                <div className="text-sm whitespace-pre-wrap">
                  {post.content}
                </div>

                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    className="mt-2 max-h-80 rounded-md border border-white/10 object-cover"
                  />
                )}

                <div className="flex justify-between text-xl pt-2 border-t border-white/10">
                  {REACTION_EMOJIS.map((emoji) => {
                    const active = reactions[post.id] === emoji;
                    return (
                      <button
                        key={emoji}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReact(post.id, emoji);
                        }}
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
        </div>
      </div>

      {/* COMPOSER BUTTON */}
      <button
        onClick={() => setComposerOpen(true)}
        className="fixed bottom-6 left-6 bg-white text-black p-3 rounded-full shadow-lg"
      >
        <Pencil size={22} />
      </button>

      <PostComposerModal
        open={composerOpen}
        onClose={() => setComposerOpen(false)}
        onPostCreated={loadFeed}
      />

      <PostFullscreenViewer
        post={fullscreenPost}
        open={fullscreenOpen}
        onClose={closeFullscreen}
        reactions={reactions}
        onReact={handleReact}
      />
    </div>
  );
}
