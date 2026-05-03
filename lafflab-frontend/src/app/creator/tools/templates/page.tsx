"use client";

import AppShell from "@/components/AppShell";

const templates = [
  {
    id: "quick-update",
    name: "Quick Update",
    description: "Short, punchy updates for your audience.",
  },
  {
    id: "story-thread",
    name: "Story Thread",
    description: "Multi‑part stories or breakdowns.",
  },
  {
    id: "announcement",
    name: "Announcement",
    description: "Product launches, news, or big reveals.",
  },
];

export default function TemplatesPage() {
  return (
    <AppShell title="Templates">
      <div className="space-y-[var(--space-4)]">
        <p className="text-white/70 text-[var(--text-sm)]">
          Use templates to jump‑start your next creation. You can always customize
          everything once you’re inside the editor.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--space-4)]">
          {templates.map((template) => (
            <div
              key={template.id}
              className="p-[var(--space-4)] bg-white/5 border border-white/10 rounded-lg space-y-[var(--space-2)]"
            >
              <h2 className="text-[var(--text-md)] font-semibold text-white">
                {template.name}
              </h2>
              <p className="text-white/60 text-[var(--text-sm)]">
                {template.description}
              </p>
              <button className="mt-[var(--space-2)] px-3 py-2 text-[var(--text-xs)] bg-white/10 rounded-lg text-white">
                Use Template
              </button>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
