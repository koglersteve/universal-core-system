"use client";

interface FeedProps {
  items?: Array<{
    id: string;
    title?: string;
    content?: string;
    [key: string]: any;
  }>;
}

export default function Feed({ items = [] }: FeedProps) {
  return (
    <div className="space-y-4 text-white">
      <h1 className="text-xl font-semibold">Feed</h1>

      {items.length === 0 ? (
        <p className="text-white/60">No posts yet.</p>
      ) : (
        <ul className="space-y-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="p-4 bg-white/5 border border-white/10 rounded-lg"
            >
              <div className="font-semibold">
                {item.title || "Untitled"}
              </div>

              {item.content && (
                <p className="text-white/60 mt-1 text-sm line-clamp-3">
                  {item.content}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
