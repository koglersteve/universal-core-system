"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const [value, setValue] = useState("");

  function submit(e: any) {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(value)}`);
  }

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search..."
        className="flex-1 p-2 rounded bg-white/10 text-white border border-white/20"
      />
      <button className="px-4 py-2 bg-white/20 rounded text-white">
        Go
      </button>
    </form>
  );
}
