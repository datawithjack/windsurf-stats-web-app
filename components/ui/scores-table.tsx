interface ScoresTableProps {
  scores: any[];
  className?: string;
}

export function ScoresTable({ scores, className = "" }: ScoresTableProps) {
  return (
    <div className={`bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/20 p-6 ${className}`}>
      <h3 className="text-xl font-normal text-gray-900 mb-4">Scores</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-normal text-gray-500 uppercase tracking-wider">Athlete</th>
              <th className="px-4 py-2 text-left text-xs font-normal text-gray-500 uppercase tracking-wider">Score</th>
              <th className="px-4 py-2 text-left text-xs font-normal text-gray-500 uppercase tracking-wider">Position</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {scores?.length ? scores.map((score, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{score.athlete || `Athlete ${idx + 1}`}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{score.score || 'N/A'}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{score.position || idx + 1}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan={3} className="py-4 px-4 text-gray-500 text-center">
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