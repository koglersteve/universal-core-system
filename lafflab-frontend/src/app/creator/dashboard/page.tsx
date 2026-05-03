"use client";

import AppShell from "@/components/AppShell";
import CreatorCard from "@/components/CreatorCard";

import DraftsIcon from "@/components/icons/creator/DraftsIcon";
import TemplatesIcon from "@/components/icons/creator/TemplatesIcon";
import CollabIcon from "@/components/icons/creator/CollabIcon";
import StatusIcon from "@/components/icons/creator/StatusIcon";

import Link from "next/link";

const tools = [
  {
    title: "Views",
    subtitle: "Track your audience reach",
    href: "/creator/dashboard/views",
    icon: DraftsIcon,
  },
  {
    title: "Engagement",
    subtitle: "Likes, shares, and interactions",
    href: "/creator/dashboard/engagement",
    icon: TemplatesIcon,
  },
  {
    title: "Performance",
    subtitle: "Top-performing posts",
    href: "/creator/dashboard/performance",
    icon: CollabIcon,
  },
  {
    title: "Analytics",
    subtitle: "Deep insights coming soon",
    href: "/creator/dashboard/analytics",
    icon: StatusIcon,
  },
];

export default function CreatorDashboard() {
  return (
    <AppShell title="Creator Dashboard">
      <div className="space-y-[var(--space-4)]">
        <p className="text-white/70 text-[var(--text-sm)]">
          Your creator analytics hub. Track views, engagement, performance, and
          more as your audience grows.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--space-4)]">
          {tools.map((tool) => {
            const Icon = tool.icon;

            return (
              <Link key={tool.href} href={tool.href}>
                <CreatorCard title={tool.title} subtitle={tool.subtitle}>
                  <Icon className="w-10 h-10 text-white/40" />
                </CreatorCard>
              </Link>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
