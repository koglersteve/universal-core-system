"use client";

type MenuDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export default function MenuDrawer({ open, onClose }: MenuDrawerProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div
        className="flex-1 bg-black/60"
        onClick={onClose}
      />
      <div className="w-64 bg-black border-l border-white/10 p-4 space-y-4">
        <div className="text-lg font-semibold mb-2">Menu</div>
        <button className="block w-full text-left text-sm text-white/80 py-2">
          Profile
        </button>
        <button className="block w-full text-left text-sm text-white/80 py-2">
          Settings
        </button>
        <button className="block w-full text-left text-sm text-white/80 py-2">
          Logout
        </button>
      </div>
    </div>
  );
}
