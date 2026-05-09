"use client";

type FollowingListProps = {
  users?: any[];
};

export default function FollowingList({ users = [] }: FollowingListProps) {
  if (!users.length) {
    return <p className="text-white/60">Not following anyone yet.</p>;
  }

  return (
    <ul className="space-y-2 text-white">
      {users.map((u, i) => (
        <li
          key={i}
          className="p-3 rounded-lg bg-white/5 border border-white/10"
        >
          {typeof u === "string" ? u : JSON.stringify(u)}
        </li>
      ))}
    </ul>
  );
}

