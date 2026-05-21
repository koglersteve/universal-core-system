"use client";

import Feed from "@/components/feed/Feed";

export default function ProfilePostsPage({ posts = [] }: { posts?: any[] }) {
  return <Feed items={posts} />;
}
