"use client";

import Link from "next/link";

type CreatorDashboardCardProps = {
  title: string;
  description: string;
  href: string;
};

export default function CreatorDashboardCard({
  title,
  description,
  href,
}: CreatorDashboardCardProps) {
  return (
    <Link
      href={href}
      className="block p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition"
    >
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm text-white/60 mt-1">{description}</p>
    </Link>
  );
}
