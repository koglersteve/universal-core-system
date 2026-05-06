eexport const dynamic = "force-dynamic";

xport default function CreatorLockedPage() {
  return (
    <div className="p-6 text-white space-y-4">
      <h1 className="text-2xl font-bold">Creator Mode Locked</h1>

      <p className="text-white/70 max-w-md">
        Creator Mode is available only to approved creators. Apply below to unlock
        advanced tools for editing, templates, captions, audio cleanup, and more.
      </p>

      <a
        href="/apply"
        className="inline-block px-4 py-2 rounded bg-white/10 border border-white/20 hover:bg-white/20 transition"
      >
        Apply for Creator Access
      </a>
    </div>
  );
}
