"use client";

import { useState } from "react";

export default function Component({ onMenuToggle }) {
  const [open, setOpen] = useState(false);

  const handleFutureFeature = () => {
    alert("This feature is coming in a future update.");
  };

  return (
    <>
      {/* Hamburger Icon */}
      <button
        onClick={() => setOpen(true)}
        className="text-3xl text-white"
      >
        ☰
      </button>

      {/* Slide-Out Menu */}
      {open && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50">
          <div className="absolute right-0 top-0 h-full w-72 bg-black border-l border-white/10 p-6 flex flex-col justify-between">

            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="text-white text-2xl self-end mb-6"
            >
              ✕
            </button>

            {/* Main Menu Items */}
            <div className="space-y-4 text-lg">
              <button className="w-full text-left">Profile</button>
              <button className="w-full text-left">Settings</button>
              <button className="w-full text-left">Favorites</button>
              <button className="w-full text-left">Notifications</button>
              <button className="w-full text-left">Creator Tools</button>
              <button className="w-full text-left">Advertise With Us</button>
              <button className="w-full text-left">Help & Support</button>
            </div>

            {/* Future Dashboard Items */}
            <div className="mt-10 space-y-3 text-neutral-400 text-sm">
              <button onClick={handleFutureFeature} className="w-full text-left">
                Analytics Dashboard (coming soon)
              </button>
              <button onClick={handleFutureFeature} className="w-full text-left">
                Admin Dashboard (coming soon)
              </button>
              <button onClick={handleFutureFeature} className="w-full text-left">
                Creator Dashboard (coming soon)
              </button>
              <button onClick={handleFutureFeature} className="w-full text-left">
                Business Dashboard (coming soon)
              </button>
            </div>

            {/* Logout */}
            <button className="mt-10 text-left text-red-400">
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
}
