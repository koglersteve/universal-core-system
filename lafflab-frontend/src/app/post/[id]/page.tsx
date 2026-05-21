"use client";

import Feed from "@/components/feed/Feed";

export default function UserPostsPage({ posts = [] }: { posts?: any[] }) {
  return <Feed items={posts} />;
}

