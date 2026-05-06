export const dynamic = "force-dynamic";

"use client";

import AppShell from "@/components/AppShell";

type Stat = {
  label: string;
  value: string | number;
};

type ActivityItem = {
  message: string;
  timestamp: string;
};

const stats: Stat[] = [
  { label: "Views (last 7 days)", value: "—" },
  { label: "Engagement (likes, shares)", value: "—" },
  { label: "Published posts", value: "—" },
];

// Future‑proof: strongly typed, ready for real analytics
const recentActivity: ActivityItem[] = [];

export default function CreatorDashboard() {
  return (
    <AppShell title="Creator Dashboard">
      <div className="space-y-[var(--space-6)]">
        <p className="text-white/70 text-[var(--text-sm)]">
          A simple overview of how your creations are doing. As you publish more, this
          dashboard will start to fill in with real activity.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-[var(--space-4)]">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="p-[var(--space-4)] bg-white/5 border border-white/10 rounded-lg"
            >
              <p className="text-white/50 text-[var(--text-xs)]">{stat.label}</p>
              <p className="text-white text-[var(--text-xl)] font-semibold mt-1">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="p-[var(--space-4)] bg-white/5 border border-white/10 rounded-lg">
          <h2 className="text-[var(--text-md)] font-semibold text-white">
            Recent Activity
          </h2>

          {recentActivity.length === 0 ? (
            <p className="text-white/60 text-[var(--text-sm)] mt-2">
              You haven’t published anything yet. Once you start sharing your work,
              you’ll see a timeline of your recent activity here.
            </p>
          ) : (
            <ul className="mt-2 space-y-2">
              {recentActivity.map((item, idx) => (
                <li key={idx} className="text-white/70 text-[var(--text-sm)]">
                  <span className="font-medium">{item.message}</span>
                  <span className="text-white/40 text-[var(--text-xs)] ml-2">
                    {item.timestamp}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </AppShell>
  );
}
