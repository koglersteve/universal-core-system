"use client";

import { useEffect, useState } from "react";
import { LaffLabApi } from "@/lib/api";
import type { Post } from "@/types/jokes";
import JokeCard from "@/components/JokeCard";
import { motion } from "framer-motion";

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await LaffLabApi.getPosts();
      setPosts(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <JokeCard post={post} active={false} />
        </motion.div>
      ))}
    </div>
  );
}
