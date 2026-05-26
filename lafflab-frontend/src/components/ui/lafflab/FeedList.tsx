"use client";

import React from "react";
import FeedPost from "./FeedPost";

export default function FeedList({ initialPosts }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {initialPosts.map(post => (
        <FeedPost key={post.id} post={post} />
      ))}
    </div>
  );
}

