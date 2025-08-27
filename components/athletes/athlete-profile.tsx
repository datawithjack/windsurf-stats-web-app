interface AthleteProfileProps {
  athlete?: {
    name: string;
    id?: string;
    country?: string;
    ranking?: number;
    photo?: string;
  };
}

export function AthleteProfile({ athlete }: AthleteProfileProps) {
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/20 p-0 overflow-hidden">
      <div className="bg-gray-800 text-white p-6 flex items-center space-x-4">
        <div className="relative">
          <div className="w-20 h-20 bg-gray-600 rounded-full overflow-hidden">
            {athlete?.photo ? (
              <img 
                src={athlete.photo} 
                alt={athlete.name || 'Athlete'} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-2xl font-normal">
                {(athlete?.name || 'A').charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-normal text-white mb-1">
            {athlete?.name || 'Sarah-Quita Offringa'}
          </h2>
          <div className="text-sm font-normal text-gray-300">
            {athlete?.id || 'ARU-91'}
          </div>
          <div className="text-sm font-normal text-gray-300">
            {athlete?.country || 'Starboard, Neilpryde, Brunotti'}
          </div>
          <div className="text-sm font-normal text-gray-300">
            Current position
          </div>
        </div>
      </div>
    </div>
  );
}