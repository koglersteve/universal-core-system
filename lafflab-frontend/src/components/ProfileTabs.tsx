"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Component({ id }) {
  const path = usePathname();

  return (
    <div className="flex space-x-4 border-b border-white/10 px-6 mb-6">
      <Link
        href={`/user/${id}`}
        className={`pb-3 ${
          path.endsWith(id) ? "text-white border-b-2 border-white" : "text-gray-400"
        }`}
      >
        Profile
      </Link>

      <Link
        href={`/user/${id}/posts`}
        className={`pb-3 ${
          path.includes("/posts")
            ? "text-white border-b-2 border-white"
            : "text-gray-400"
        }`}
      >
        Posts
      </Link>
    </div>
  );
}
