"use client";

import Feed from "@/components/feed/Feed";

export default function SearchPage({ results = [] }: { results?: any[] }) {
  return <Feed items={results} />;
}

