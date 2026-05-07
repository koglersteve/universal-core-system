import ForYouFeed from "@/components/ForYouFeed";
import { getForYouFeed } from "@/lib/server/feed";

export default async function ForYouPage() {
  const items = await getForYouFeed();

  return (
    <div className="p-4">
      <ForYouFeed items={items} />
    </div>
  );
}
