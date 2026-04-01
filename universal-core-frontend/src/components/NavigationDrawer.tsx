"use client";

import Link from "next/link";
import { plugins } from "@/lib/plugins";

export function NavigationDrawer() {
  return (
    <nav className="nav-drawer">
      {plugins.map(app => (
        <Link key={app.id} href={app.path} className="nav-item">
          <span className="nav-emoji">{app.icon}</span>
          <span className="nav-label">{app.name}</span>
        </Link>
      ))}
    </nav>
  );
}
