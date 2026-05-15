"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HamburgerMenu({ open, onClose }) {
  const router = useRouter();
  if (!open) return null;

  useEffect(() => {
    function handleClick(e) {
      if (!document.getElementById("hamburger-menu")?.contains(e.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  return (
    <div
      id="hamburger-menu"
      className="absolute top-14 right-4 w-56 bg-black border border-white/10 rounded-lg shadow-xl z-50"
    >
      <div className="flex flex-col py-2">

        <button
          onClick={() => {
            onClose();
            router.push("/profile");
          }}
          className="px-4 py-2 text-left text-white/80 hover:bg-white/10"
        >
          Edit Profile
        </button>

        <button className="px-4 py-2 text-left text-white/80 hover:bg-white/10">
          Settings
        </button>

        <button className="px-4 py-2 text-left text-white/80 hover:bg-white/10">
          Notifications
        </button>

        <button className="px-4 py-2 text-left text-white/80 hover:bg-white/10">
          Creator
        </button>

        <div className="border-t border-white/10 my-2" />

        <button className="px-4 py-2 text-left text-white/80 hover:bg-white/10">
          About
        </button>

        <button className="px-4 py-2 pl-8 text-left text-white/60 hover:bg-white/10">
          Privacy Policy
        </button>

        <button className="px-4 py-2 pl-8 text-left text-white/60 hover:bg-white/10">
          Legal
        </button>

        <div className="border-t border-white/10 my-2" />

        <button className="px-4 py-2 text-left text-white/80 hover:bg-white/10">
          Help
        </button>

        <button className="px-4 py-2 text-left text-white/80 hover:bg-white/10">
          Report a Problem
        </button>

        <button className="px-4 py-2 text-left text-red-400 hover:bg-white/10">
          Log Out
        </button>

      </div>
    </div>
  );
}
