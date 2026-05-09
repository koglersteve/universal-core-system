"use client";

import PostCard from "./PostCard";
import AdBanner from "./AdBanner";
import { useFeedStore } from "@/store/feed.store";

export default function FeedList() {
  const { posts } = useFeedStore();

  return (
    <div className="flex-1 overflow-y-scroll snap-y snap-mandatory">
      {posts.map((post, index) => (
        <div key={post.id}>
          <PostCard post={post} />
          {(index + 1) % 8 === 0 && <AdBanner position="inline" />}
        </div>
      ))}
    </div>
  );
}
