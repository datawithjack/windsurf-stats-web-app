interface KPICardsProps {
  data?: {
    events?: number;
    wins?: number;
    podiums?: number;
    top10?: number;
  };
}

export function KPICards({ data }: KPICardsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/20 p-6 text-center">
        <h3 className="text-sm font-normal text-gray-600 mb-2"># Events</h3>
        <div className="text-3xl font-normal text-gray-900">{data?.events || 5}</div>
      </div>
      <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/20 p-6 text-center">
        <h3 className="text-sm font-normal text-gray-600 mb-2"># Wins</h3>
        <div className="text-3xl font-normal text-gray-900">{data?.wins || 2}</div>
      </div>
      <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/20 p-6 text-center">
        <h3 className="text-sm font-normal text-gray-600 mb-2"># Podiums</h3>
        <div className="text-3xl font-normal text-gray-900">{data?.podiums || 5}</div>
      </div>
      <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/20 p-6 text-center">
        <h3 className="text-sm font-normal text-gray-600 mb-2"># Top 10</h3>
        <div className="text-3xl font-normal text-gray-900">{data?.top10 || 5}</div>
      </div>
    </div>
  );
}