import { AthleteResult } from '../../lib/types';

interface ResultsTableProps {
  results?: AthleteResult[];
  loading?: boolean;
}

export function ResultsTable({ results, loading }: ResultsTableProps) {
  // Mock data matching the image design
  const mockResults = [
    { date: '2023-10-23', location: 'Hawaii', event: 'detail heat results', rank: 1, incomplete: false },
    { date: '2023-10-22', location: 'Hawaii', event: 'Maui Strong Aloha Classic Grand Final', rank: 1, incomplete: false },
    { date: '2023-09-22', location: 'Germany', event: 'Sylt World Cup', rank: 3, incomplete: false },
    { date: '2023-07-01', location: 'Spain', event: 'Gran Canaria World Cup', rank: 2, incomplete: false },
    { date: '2023-06-01', location: 'Fiji Pro', event: 'FIJI SURF PRO', rank: 2, incomplete: false }
  ];

  // Transform AthleteResult to match expected format
  const transformedResults = results?.map(result => ({
    date: result.start_date,
    location: result.location,
    event: result.event_name,
    rank: result.position,
    incomplete: false // Assuming complete for now
  })) || mockResults;

  const displayResults = transformedResults;

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/20 p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <h3 className="text-lg font-normal text-gray-800">Results</h3>
        <div className="text-xs font-normal text-gray-500">** Incomplete Event</div>
      </div>
      
      <div className="overflow-auto flex-1 max-h-96">
        <table className="min-w-full">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-normal text-gray-500 uppercase tracking-wider bg-gray-100">Date</th>
              <th className="px-4 py-2 text-left text-xs font-normal text-gray-500 uppercase tracking-wider bg-gray-100">Location</th>
              <th className="px-4 py-2 text-left text-xs font-normal text-gray-500 uppercase tracking-wider bg-gray-100">Event</th>
              <th className="px-4 py-2 text-left text-xs font-normal text-gray-500 uppercase tracking-wider bg-gray-100">Rank</th>
              <th className="px-4 py-2 text-left text-xs font-normal text-gray-500 uppercase tracking-wider bg-gray-100">Incomplete</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                  Loading results...
                </td>
              </tr>
            ) : displayResults?.length ? displayResults.map((result, idx) => (
              <tr key={idx} className="hover:bg-gray-50 group relative">
                <td className="px-4 py-2 whitespace-nowrap text-sm font-normal text-gray-900">{result.date}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm font-normal text-gray-900">{result.location}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm font-normal text-gray-900">{result.event}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm font-normal text-gray-900">{result.rank}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm font-normal text-gray-900">{result.incomplete ? 'False' : 'False'}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
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