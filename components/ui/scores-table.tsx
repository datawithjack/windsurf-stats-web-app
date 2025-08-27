interface ScoresTableProps {
  scores: any[];
  className?: string;
}

export function ScoresTable({ scores, className = "" }: ScoresTableProps) {
  return (
    <div className={`bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/20 p-6 h-full flex flex-col ${className}`}>
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <h3 className="text-lg font-normal text-gray-800">Scores</h3>
        <div className="h-8"></div>
      </div>
      
      <div className="overflow-auto flex-1 max-h-96">
        <table className="min-w-full">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-normal text-gray-500 uppercase tracking-wider bg-gray-100">Athlete</th>
              <th className="px-4 py-2 text-left text-xs font-normal text-gray-500 uppercase tracking-wider bg-gray-100">Score</th>
              <th className="px-4 py-2 text-left text-xs font-normal text-gray-500 uppercase tracking-wider bg-gray-100">Position</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {scores?.length ? scores.map((score, idx) => (
              <tr key={idx} className="hover:bg-gray-50 group relative">
                <td className="px-4 py-2 whitespace-nowrap text-sm font-normal text-gray-900">{score.athlete || `Athlete ${idx + 1}`}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm font-normal text-gray-900">{score.score || 'N/A'}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm font-normal text-gray-900">{score.position || idx + 1}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-gray-500">
                  No scores available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}