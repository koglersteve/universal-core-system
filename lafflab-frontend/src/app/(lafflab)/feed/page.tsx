import FeedShell from "./FeedShell";

export const dynamic = "force-dynamic";

export default async function Page() {
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL;

  const res = await fetch(`${backend}/core/lafflab/feed`, {
    cache: "no-store",
  });

  const data = await res.json();
  const posts = Array.isArray(data.posts) ? data.posts : [];

  return <FeedShell initialFeed={posts} />;
}
