import FeedShell from "./FeedShell";

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/core/lafflab/feed`, {
    cache: "no-store",
  });

  const data = await res.json();
  const posts = data.posts ?? [];

  return <FeedShell initialFeed={posts} />;
}
