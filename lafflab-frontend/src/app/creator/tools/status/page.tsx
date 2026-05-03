"use client";

import AppShell from "@/components/AppShell";

type Job = {
  id: string;
  type: string;
  status: "processing" | "completed" | "failed";
  createdAt: string;
};

const jobs: Job[] = [];

export default function StatusPage() {
  const processing = jobs.filter((j) => j.status === "processing");
  const completed = jobs.filter((j) => j.status === "completed");
  const failed = jobs.filter((j) => j.status === "failed");

  return (
    <AppShell title="Processing Status">
      <div className="space-y-[var(--space-6)]">
        {jobs.length === 0 ? (
          <div className="p-[var(--space-4)] bg-white/5 border border-white/10 rounded-lg">
            <h2 className="text-[var(--text-md)] font-semibold text-white">
              You’re all caught up
            </h2>
            <p className="text-white/60 text-[var(--text-sm)] mt-1">
              Nothing is processing right now. When you upload or render something, it
              will appear here with its current status.
            </p>
          </div>
        ) : (
          <>
            <Section title="In Progress" jobs={processing} />
            <Section title="Completed" jobs={completed} />
            <Section title="Failed" jobs={failed} />
          </>
        )}
      </div>
    </AppShell>
  );
}

function Section({ title, jobs }: { title: string; jobs: Job[] }) {
  if (jobs.length === 0) return null;

  return (
    <div className="space-y-[var(--space-3)]">
      <h2 className="text-[var(--text-md)] font-semibold text-white">{title}</h2>
      <ul className="space-y-[var(--space-2)]">
        {jobs.map((job) => (
          <li
            key={job.id}
            className="p-[var(--space-3)] bg-white/5 border border-white/10 rounded-lg flex items-center justify-between"
          >
            <div>
              <p className="text-white text-[var(--text-sm)] font-medium">
                {job.type}
              </p>
              <p className="text-white/50 text-[var(--text-xs)]">
                Started {job.createdAt}
              </p>
            </div>
            <span className="text-[var(--text-xs)] text-white/60 capitalize">
              {job.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
