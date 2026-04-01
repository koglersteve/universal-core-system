"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import LogoutButton from "@/components/auth/LogoutButton";

export default function RoleNavBar() {
  const { role } = useAuth();

  return (
    <nav className="role-nav">
      <div className="role-nav-left">
        {role === "founder" && (
          <Link href="/founder/console/overview">Founder Console</Link>
        )}

        {role === "admin" && (
          <Link href="/admin/console">Admin Console</Link>
        )}

        {role === "advertiser" && (
          <Link href="/advertiser/console">Advertiser Console</Link>
        )}

        {role === "vendor" && (
          <Link href="/vendor/console">Vendor Console</Link>
        )}

        {role === "user" && <Link href="/home">Home</Link>}
      </div>

      <div className="role-nav-right">
        <LogoutButton />
      </div>
    </nav>
  );
}
