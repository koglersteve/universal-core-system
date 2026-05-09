import TopBar from "@/components/TopBar";
import FeedList from "./components/FeedList";
import { Post } from "@/types/post";

async function getFeed(): Promise<Post[]> {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/feed`;

    const res = await fetch(url, {
      cache: "no-store",
      next: { revalidate: 0 }
    });

    if (!res.ok) {
      console.error("Feed API error:", res.status);
      return [];
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Feed fetch failed:", err);
    return [];
  }
}

export default async function FeedPage() {
  const posts = await getFeed();

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col">
      <TopBar />

      <div className="relative overflow-hidden flex-1">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none" />

        <FeedList posts={posts} />
      </div>
    </div>
  );
}
