import TopBar from "@/components/TopBar";
import FeedList from "./components/FeedList";
import { Post } from "@/types/post";

async function getFeed(): Promise<Post[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/feed`, {
      cache: "no-store"
    });

    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function FeedPage() {
  const posts = await getFeed();

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col">
      <TopBar />

      <div className="relative overflow-hidden flex-1">
        {/* Subtle parallax overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none" />

        <FeedList posts={posts} />
      </div>
    </div>
  );
}
