"use client";

export default function NotificationsList({ items = [] }: { items?: any[] }) {
  if (!items.length) {
    return <p className="text-white/60">No notifications yet.</p>;
  }

  return (
    <ul className="space-y-3 text-white">
      {items.map((item, i) => (
        <li
          key={i}
          className="p-4 bg-white/5 rounded-lg border border-white/10"
        >
          {item.message || "Notification"}
        </li>
      ))}
    </ul>
  );
}
