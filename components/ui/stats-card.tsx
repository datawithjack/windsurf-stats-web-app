interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  description?: string;
  className?: string;
}

export function StatsCard({ title, value, subtitle, description, className = "" }: StatsCardProps) {
  return (
    <div className={`bg-white/95 backdrop-blur-sm shadow-xl border-white/20 hover:bg-white/100 transition-all duration-300 rounded-lg border p-6 ${className}`}>
      <div className="pb-2">
        <h3 className="text-sm font-normal text-gray-600">{title}</h3>
      </div>
      <div className="pt-0">
        <div className="text-3xl font-normal text-gray-900 mb-1">{value}</div>
        {subtitle && (
          <div className="text-sm text-gray-700 font-normal">{subtitle}</div>
        )}
        {description && (
          <div className="text-xs text-gray-500 mt-1">{description}</div>
        )}
      </div>
    </div>
  );
}