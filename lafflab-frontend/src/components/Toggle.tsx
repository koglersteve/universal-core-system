"use client";

type Props = {
  checked: boolean;
  onChange: (value: boolean) => void;
};

export default function Toggle({ checked, onChange }: Props) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
        checked ? "bg-green-500" : "bg-gray-500"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}
