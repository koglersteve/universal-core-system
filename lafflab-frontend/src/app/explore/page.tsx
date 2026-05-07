// FILE: src/app/explore/page.tsx

import ExploreFeed from "@/components/ExploreFeed";
import { getExploreFeed } from "@/lib/server/explore";

export default async function ExplorePage() {
  const items = await getExploreFeed();

  return (
    <div className="p-4">
      <ExploreFeed items={items} />
    </div>
  );
}

