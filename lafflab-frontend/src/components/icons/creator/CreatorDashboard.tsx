import Link from "next/link";

type CreatorDashboardCardProps = {
  title: string;
  description: string;
  href: `/creator/${string}` | `/creator/${string}/${string}` | string; // fallback for now
  icon?: React.ReactNode;
};

export default function CreatorDashboardCard({
  title,
  description,
  href,
  icon,
}: CreatorDashboardCardProps) {
  const safeHref = href as RouteImpl<string>;

  return (
    <Link
      href={safeHref}
      className="block p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition"
    >
      <div className="flex items-center space-x-4">
        {icon && <div className="text-2xl">{icon}</div>}
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
      </div>
    </Link>
  );
}

// Needed for typedRoutes compatibility
import type { RouteImpl } from "next/dist/lib/load-custom-routes";
