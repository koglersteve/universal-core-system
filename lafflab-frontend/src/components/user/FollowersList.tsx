"use client";

type FollowersListProps = {
  users?: any[];
};

export default function FollowersList({ users = [] }: FollowersListProps) {
  if (!users.length) {
    return <p className="text-white/60">No followers yet.</p>;
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

