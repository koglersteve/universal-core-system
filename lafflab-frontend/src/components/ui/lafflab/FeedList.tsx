"use client";

import React from "react";
import FeedPost from "./FeedPost";

type FeedListProps = {
  initialPosts: any[];
};

export default function FeedList({ initialPosts }: FeedListProps) {
  const posts = Array.isArray(initialPosts) ? initialPosts : [];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {posts.map((post) => (
        <FeedPost key={post.id} post={post} />
      ))}
    </div>
  );
}
