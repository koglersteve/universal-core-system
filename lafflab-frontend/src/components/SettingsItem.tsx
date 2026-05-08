"use client";

export default function SettingsItem({
  title,
  subtitle,
  icon: Icon,
  onClick,
}: {
  title: string;
  subtitle?: string;
  icon: React.ComponentType<any>;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition text-left"
    >
      <Icon className="w-7 h-7 text-white/40" />

      <div className="flex-1">
        <p className="text-base font-medium text-white">{title}</p>

        {subtitle && (
          <p className="text-xs text-white/60 mt-0.5">{subtitle}</p>
        )}
      </div>
    </button>
  );
}

