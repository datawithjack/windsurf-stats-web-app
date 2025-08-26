export function KPICards({ data }: { data: any }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/20 p-6">
        <h3 className="text-sm font-normal text-gray-600 mb-2">Total Events</h3>
        <div className="text-2xl font-normal text-gray-900">{data?.totalEvents || '0'}</div>
      </div>
      <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/20 p-6">
        <h3 className="text-sm font-normal text-gray-600 mb-2">Best Finish</h3>
        <div className="text-2xl font-normal text-gray-900">{data?.bestFinish || 'N/A'}</div>
      </div>
      <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/20 p-6">
        <h3 className="text-sm font-normal text-gray-600 mb-2">Win Rate</h3>
        <div className="text-2xl font-normal text-gray-900">{data?.winRate || '0%'}</div>
      </div>
    </div>
  );
}