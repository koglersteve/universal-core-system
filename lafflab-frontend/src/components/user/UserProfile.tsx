"use client";

type UserProfileProps = {
  user?: any;
};

export default function UserProfile({ user }: UserProfileProps) {
  return (
    <div className="p-4 rounded-lg bg-white/5 border border-white/10 text-white">
      <h2 className="text-xl font-semibold mb-2">User Profile</h2>

      {user ? (
        <pre className="text-sm text-white/70 whitespace-pre-wrap">
          {JSON.stringify(user, null, 2)}
        </pre>
      ) : (
        <p className="text-white/60">No user data available.</p>
      )}
    </div>
  );
}
