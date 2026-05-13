import AppShell from "@/components/AppShell";
import { getUser } from "@/lib/server/user";

export const dynamic = "force-dynamic";

export default async function Page() {
  const { user } = await getUser();

  return (
    <AppShell title="My Profile">
      {!user ? (
        <div className="text-white/60 text-sm">Loading…</div>
      ) : (
        <div className="p-6 text-white">
          <div className="text-xl font-semibold mb-4">My Profile</div>

          <div className="space-y-2">
            <div>Email: {user.email}</div>
            <div>Screen Name: {user.screenName}</div>
          </div>
        </div>
      )}
    </AppShell>
  );
}

