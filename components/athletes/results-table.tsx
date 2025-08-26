export function ResultsTable({ results }: { results: any[] }) {
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/20 p-6">
      <h3 className="text-xl font-normal text-gray-900 mb-4">Results</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 px-4 font-normal text-gray-600">Event</th>
              <th className="text-left py-2 px-4 font-normal text-gray-600">Date</th>
              <th className="text-left py-2 px-4 font-normal text-gray-600">Position</th>
            </tr>
          </thead>
          <tbody>
            {results?.length ? results.map((result, idx) => (
              <tr key={idx} className="border-b border-gray-100">
                <td className="py-2 px-4 text-gray-900">{result.event}</td>
                <td className="py-2 px-4 text-gray-600">{result.date}</td>
                <td className="py-2 px-4 text-gray-900">{result.position}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan={3} className="py-4 px-4 text-gray-500 text-center">
                  No results available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}