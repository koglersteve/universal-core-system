"use client";

export default function MenuDrawer({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      <div
        className={`
          fixed top-0 right-0 h-full w-72 bg-black text-white z-50
          border-l border-white/10 p-6 space-y-6
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold">Menu</h2>
          <button
            onClick={onClose}
            className="text-2xl opacity-70 hover:opacity-100"
          >
            ✕
          </button>
        </div>

        <div className="flex items-center gap-3 pb-4 border-b border-white/10">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-lg">
            👤
          </div>
          <div>
            <div className="font-semibold">Your Profile</div>
            <div className="text-sm opacity-70">@username</div>
          </div>
        </div>

        <div className="space-y-4 pt-2">
          <button className="w-full flex items-center gap-3 text-left py-2 opacity-80 hover:opacity-100">
            <span>⚙️</span> Settings
          </button>

          <button className="w-full flex items-center gap-3 text-left py-2 opacity-80 hover:opacity-100">
            <span>📊</span> Creator Dashboard
          </button>

          <button className="w-full flex items-center gap-3 text-left py-2 opacity-80 hover:opacity-100">
            <span>ℹ️</span> About LAFFlab
          </button>

          <div className="border-t border-white/10 pt-4">
            <button className="w-full flex items-center gap-3 text-left py-2 text-red-400 opacity-80 hover:opacity-100">
              <span>🚪</span> Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
