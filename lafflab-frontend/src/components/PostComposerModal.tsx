"use client";

import { X } from "lucide-react";
import PostComposer from "./PostComposer";

export default function PostComposerModal({ open, onClose, onPostCreated }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur z-50 flex items-center justify-center p-4">
      <div className="bg-black border border-white/10 rounded-xl w-full max-w-md p-4 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white/70 hover:text-white"
        >
          <X size={22} />
        </button>

        <h2 className="text-lg font-semibold mb-3">Create Post</h2>

        <PostComposer
          onPostCreated={() => {
            onPostCreated();
            onClose();
          }}
        />
      </div>
    </div>
  );
}
