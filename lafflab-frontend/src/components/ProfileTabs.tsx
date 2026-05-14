"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProfileTabs({ id }: { id: string }) {
  const path = usePathname();

  return (
    <div className="flex space-x-6 border-b border-white/10 px-6 mt-4">
      <Link
        href={`/user/${id}`}
        className={`pb-3 ${
          path === `/user/${id}` ? "text-white border-b-2 border-white" : "text-white/50"
        }`}
      >
        Posts
      </Link>

      <Link
        href={`/user/${id}/followers`}
        className={`pb-3 ${
          path.includes("/followers")
            ? "text-white border-b-2 border-white"
            : "text-white/50"
        }`}
      >
        Followers
      </Link>

      <Link
        href={`/user/${id}/following`}
        className={`pb-3 ${
          path.includes("/following")
            ? "text-white border-b-2 border-white"
            : "text-white/50"
        }`}
      >
        Following
      </Link>
    </div>
  );
}
