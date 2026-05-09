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
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`
          fixed top-0 right-0 h-full w-72 bg-black text-white z-50
          border-l border-white/10 p-6 space-y-6
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Menu</h2>
          <button
            onClick={onClose}
            className="text-2xl opacity-70 hover:opacity-100"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <button className="w-full text-left py-2 opacity-80 hover:opacity-100">
            Profile
          </button>
          <button className="w-full text-left py-2 opacity-80 hover:opacity-100">
            Settings
          </button>
          <button className="w-full text-left py-2 opacity-80 hover:opacity-100">
            Creator Dashboard
          </button>
          <button className="w-full text-left py-2 opacity-80 hover:opacity-100">
            About LAFFlab
          </button>
          <button className="w-full text-left py-2 opacity-80 hover:opacity-100">
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
