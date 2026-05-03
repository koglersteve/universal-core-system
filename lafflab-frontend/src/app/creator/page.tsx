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
    title: "Drafts",
    subtitle: "Your in-progress work",
    href: "/creator/tools/drafts",
    icon: DraftsIcon,
  },
  {
    title: "Templates",
    subtitle: "Reusable formats for faster creation",
    href: "/creator/tools/templates",
    icon: TemplatesIcon,
  },
  {
    title: "Collaboration",
    subtitle: "Invite collaborators and share work",
    href: "/creator/tools/collab",
    icon: CollabIcon,
  },
  {
    title: "Processing Status",
    subtitle: "Track uploads and background jobs",
    href: "/creator/tools/status",
    icon: StatusIcon,
  },
];

export default function CreatorDashboard() {
  return (
    <AppShell title="Creator Dashboard">
      <div className="space-y-[var(--space-4)]">
        <p className="text-white/70 text-[var(--text-sm)]">
          Welcome to your creative control room. Manage drafts, templates,
          collaboration, and processing — all in one place.
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
