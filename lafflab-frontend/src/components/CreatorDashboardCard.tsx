import Link from "next/link";

export default function CreatorDashboardCard({
  title,
  description,
  href,
  icon: Icon
}: {
  title: string;
  description: string;
  href: string;
  icon?: React.ComponentType<any>;
}) {
  return (
    <Link
      href={href}
      className="block p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition"
    >
      <div className="flex items-center space-x-4">
        {Icon && <Icon className="w-10 h-10 text-white/40" />}
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-sm text-white/60">{description}</p>
        </div>
      </div>
    </Link>
  );
}
