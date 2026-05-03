"use client";

import AppShell from "@/components/AppShell";

const drafts: { id: string; title: string; updatedAt: string }[] = [];

export default function DraftsPage() {
  return (
    <AppShell title="Drafts">
      <div className="space-y-[var(--space-4)]">
        {drafts.length === 0 ? (
          <div className="p-[var(--space-4)] bg-white/5 border border-white/10 rounded-lg">
            <h2 className="text-[var(--text-md)] font-semibold text-white">
              No drafts yet
            </h2>
            <p className="text-white/60 text-[var(--text-sm)] mt-1">
              When you start creating, your in‑progress posts will show up here so you
              can pick up right where you left off.
            </p>
          </div>
        ) : (
          <ul className="space-y-[var(--space-3)]">
            {drafts.map((draft) => (
              <li
                key={draft.id}
                className="p-[var(--space-4)] bg-white/5 border border-white/10 rounded-lg flex items-center justify-between"
              >
                <div>
                  <p className="text-white text-[var(--text-sm)] font-medium">
                    {draft.title}
                  </p>
                  <p className="text-white/50 text-[var(--text-xs)]">
                    Last edited {draft.updatedAt}
                  </p>
                </div>
                <div className="flex gap-[var(--space-2)]">
                  <button className="px-3 py-1 text-[var(--text-xs)] bg-white/10 rounded-lg text-white">
                    Continue
                  </button>
                  <button className="px-3 py-1 text-[var(--text-xs)] bg-red-500/20 text-red-200 rounded-lg">
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AppShell>
  );
}
