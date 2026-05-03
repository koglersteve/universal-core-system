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
      className="w-full flex items-center gap-[var(--space-3)] p-[var(--space-3)] rounded-[var(--radius-md)] bg-white/5 border border-white/10 hover:bg-white/10 transition-soft text-left"
    >
      <Icon className="w-7 h-7 text-white/40" />

      <div className="flex-1">
        <p className="text-[var(--text-base)] font-medium">{title}</p>

        {subtitle && (
          <p className="text-[var(--text-xs)] text-white/60 mt-[2px]">
            {subtitle}
          </p>
        )}
      </div>
    </button>
  );
}
