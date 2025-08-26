export function AthleteProfile({ athlete }: { athlete: any }) {
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/20 p-6">
      <h3 className="text-xl font-normal text-gray-900 mb-4">
        {athlete?.name || 'Athlete Profile'}
      </h3>
      <div className="text-gray-600">
        Profile information will be displayed here.
      </div>
    </div>
  );
}