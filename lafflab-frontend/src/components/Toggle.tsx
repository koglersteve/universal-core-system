"use client";

export default function Toggle({
  value,
  onChange
}: {
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`
        w-12 h-6 rounded-full transition-all relative
        ${value ? "bg-green-500" : "bg-neutral-700"}
      `}
    >
      <div
        className={`
          w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all
          ${value ? "left-6" : "left-0.5"}
        `}
      />
    </button>
  );
}
