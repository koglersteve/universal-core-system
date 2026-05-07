"use client";

import AppShell from "@/components/AppShell";
import CreatorCard from "@/components/CreatorCard";
import ActionButton from "@/components/ActionButton";

export default function CreatorDashboard() {
  return (
    <AppShell title="Creator Dashboard">
      <div className="space-y-6">

        <p className="text-white/70 text-sm">
          Welcome back. Your creator tools, drafts, templates, and collaboration
          features are available below.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CreatorCard
            title="New Post"
            description="Create a new piece of content"
            href="/creator/tools/new"
          />

          <CreatorCard
            title="Drafts"
            description="Continue working on saved drafts"
            href="/creator/tools/drafts"
          />

          <CreatorCard
            title="Templates"
            description="Use or customize content templates"
            href="/creator/tools/templates"
          />

          <CreatorCard
            title="Collab"
            description="Collaborate with other creators"
            href="/creator/tools/collab"
          />
        </div>

        <div className="pt-4">
          <ActionButton href="/creator/tools/status">
            View Submission Status
          </ActionButton>
        </div>

      </div>
    </AppShell>
  );
}
