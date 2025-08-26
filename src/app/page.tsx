'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

type Event = {
  event_id: number;
  event_name: string;
  section: string;
  start_date: string;
  end_date: string;
  category_count: number;
  rider_count: number;
};

// Simple navigation component
function ResponsiveNav({ currentPage }: { currentPage: string }) {
  return (
    <nav className="flex items-center space-x-6">
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-6">
        <Link 
          href="/" 
          className={`font-normal transition-colors ${
            currentPage === 'events' 
              ? 'text-[#1abc9c]' 
              : 'text-white/80 hover:text-white'
          }`}
        >
          Events
        </Link>
        <Link 
          href="/athletes" 
          className={`font-normal transition-colors ${
            currentPage === 'athletes' 
              ? 'text-[#1abc9c]' 
              : 'text-white/80 hover:text-white'
          }`}
        >
          Athletes
        </Link>
        <Link 
          href="/head-to-heads" 
          className={`font-normal transition-colors ${
            currentPage === 'head-to-heads' 
              ? 'text-[#1abc9c]' 
              : 'text-white/80 hover:text-white'
          }`}
        >
          Head to Heads
        </Link>
        <Link 
          href="/about" 
          className={`font-normal transition-colors ${
            currentPage === 'about' 
              ? 'text-[#1abc9c]' 
              : 'text-white/80 hover:text-white'
          }`}
        >
          About
        </Link>
      </div>
    </nav>
  );
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLanding, setShowLanding] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    fetch('/api/calendar')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setEvents(data);
        } else {
          setEvents([]);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching events data:', error);
        setLoading(false);
      });
  }, []);

  // Handle fade out on click
  const handleLandingClick = () => {
    setFadeOut(true);
    setTimeout(() => setShowLanding(false), 600); // match animation duration
  };

  if (loading) {
    return (
      <div 
        className="min-h-screen bg-cover bg-center bg-fixed relative flex items-center justify-center"
        style={{
          backgroundImage: 'url(https://www.pwaworldtour.com/typo3conf/ext/sitepackage/Resources/Public/Images/bg_main.jpg)'
        }}
      >
        <div className="text-xl text-white">Loading events...</div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed relative"
      style={{
        backgroundImage: 'url(https://www.pwaworldtour.com/typo3conf/ext/sitepackage/Resources/Public/Images/bg_main.jpg)'
      }}
    >
      {/* Background overlay for better readability */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-black/80 text-white px-6 py-4 rounded-lg mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-red-600 text-white px-3 py-2 rounded-full font-normal text-sm">
                  LOGO
                </div>
                <h1 className="text-lg font-normal">
                  World Wave Tour Stats
                </h1>
              </div>
              <ResponsiveNav currentPage="events" />
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.isArray(events) && events.map((event, idx) => (
            <Link 
              href={`/event-stats?eventId=${event.event_id}&eventName=${encodeURIComponent(event.event_name)}`} 
              key={idx} 
              className="block group"
            >
              <div 
                className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/20 p-6 hover:bg-teal-50 hover:shadow-2xl transition-all duration-300 cursor-pointer group-hover:border-teal-400 h-64 flex flex-col"
              >
                <h3 className="text-lg text-gray-900 mb-3 font-normal h-14 flex items-start overflow-hidden">
                  <span className="line-clamp-2">{event.event_name}</span>
                </h3>
                <div className="space-y-2 text-sm text-gray-700 flex-grow">
                  <div className="flex items-center">
                    <span className="font-normal w-20 mr-2">Status:</span>
                    <span className={`px-2 py-1 rounded text-xs font-normal ${
                      event.section === 'Completed events' 
                        ? 'bg-green-100 text-green-800' 
                        : event.section === 'Upcoming events'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {event.section}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-normal w-20 mr-2">Start:</span>
                    <span>{new Date(event.start_date).toLocaleDateString('en-GB')}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-normal w-20 mr-2">End:</span>
                    <span>{new Date(event.end_date).toLocaleDateString('en-GB')}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-normal w-20 mr-2">Eliminations:</span>
                    <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded text-xs font-normal">
                      {event.category_count}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-normal w-20 mr-2">Riders:</span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-normal">
                      {event.rider_count || 0}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {events.length === 0 && !loading && (
          <div className="text-center text-white mt-8">
            <p className="text-xl">No events found.</p>
          </div>
        )}
      </div>

      {/* Landing Overlay */}
      {showLanding && (
        <div
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity duration-600 ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          style={{ cursor: 'pointer' }}
          onClick={handleLandingClick}
        >
          <div className="text-center select-none">
            <h1 className="text-4xl md:text-5xl text-white mb-6 drop-shadow-lg font-normal">World Wave Tour Stats</h1>
            <div className="text-lg md:text-xl text-white/90 mb-4 font-normal drop-shadow">
              Rider profiles, events stats, head to heads and much more...<br />
              All the rider stats for all windsurf tours in one place.
            </div>
            <div className="text-sm italic text-white/70 mt-2 font-normal">#makewindsurfgreatagain</div>
            <div className="mt-8 text-xs text-white/60 font-normal">Click anywhere to continue</div>
          </div>
        </div>
      )}
    </div>
  );
}
