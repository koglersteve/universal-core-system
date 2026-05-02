"use client";

import type { Post } from "@/types/jokes";
import { MediaAutoPlayer } from "./MediaAutoPlayer";
import { ReactionBar } from "./ReactionBar";
import { recordReaction } from "@/lib/FeedAnalytics";
import { motion } from "framer-motion";

interface JokeCardProps {
  post: Post;
  active: boolean;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
}

export default function JokeCard({ post, active, onSwipeUp, onSwipeDown }: JokeCardProps) {
  function handleReact(postId: string, reactionKey: string) {
    recordReaction(postId, reactionKey);
  }

  function handleDragEnd(_: any, info: { offset: { y: number } }) {
    if (info.offset.y < -80) onSwipeUp?.();
    if (info.offset.y > 80) onSwipeDown?.();
  }

  return (
    <motion.div
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      onDragEnd={handleDragEnd}
      className="space-y-2"
    >
      <MediaAutoPlayer post={post} active={active} />
      {post.text && post.type !== "text" && (
        <p className="mt-2 text-sm text-white/90">{post.text}</p>
      )}
      <ReactionBar postId={post.id} onReact={handleReact} />
    </motion.div>
  );
}


