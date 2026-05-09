"use client";

export default function AdBanner({ position }: { position: "top" | "inline" }) {
  return (
    <div
      className={`
        w-full px-4 py-3
        ${position === "top" ? "mt-2 mb-4" : "my-6"}
      `}
    >
      <div
        className="
          w-full rounded-xl p-4
          bg-gradient-to-r from-purple-600/40 to-blue-600/40
          border border-white/10
          text-white relative overflow-hidden
        "
      >
        {/* Shimmer */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_2s_infinite] pointer-events-none" />

        <div className="text-xs uppercase tracking-wide opacity-70 mb-1">
          Sponsored
        </div>

        <div className="font-semibold text-lg">
          Your Ad Could Be Here
        </div>

        <div className="text-sm opacity-80 mt-1">
          Promote your brand to thousands of LAFFlab users.
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
