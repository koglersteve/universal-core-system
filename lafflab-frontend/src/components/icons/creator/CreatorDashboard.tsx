"use client";

import Link from "next/link";

type CreatorDashboardCardProps = {
  title: string;
  description: string;
  href: string;
  icon?: React.ReactNode;
};

export default function CreatorDashboardCard({
  title,
  description,
  href,
  icon,
}: CreatorDashboardCardProps) {
  return (
    <Link
      href={href}
      className="block p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition text-white"
    >
      <div className="flex items-center space-x-4">
        {icon && <div className="text-2xl">{icon}</div>}

        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-white/60">{description}</p>
        </div>
      </div>
    </Link>
  );
}
