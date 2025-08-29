'use client';
import { useState } from 'react';
import Link from 'next/link';

interface ResponsiveNavProps {
  currentPage: 'events' | 'athletes' | 'head-to-heads' | 'about';
}

export function ResponsiveNav({ currentPage }: ResponsiveNavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

      {/* Mobile Navigation - Simple */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white p-2 rounded-md hover:bg-white/10 transition-colors"
          aria-label="Toggle navigation menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        {isMenuOpen && (
          <div className="absolute top-16 right-4 bg-black/90 backdrop-blur-md shadow-xl border-none text-white rounded-lg p-4 w-48 z-50">
            <div className="space-y-2">
              <Link 
                href="/" 
                onClick={() => setIsMenuOpen(false)}
                className={`block py-2 px-3 rounded-md font-normal transition-colors ${
                  currentPage === 'events' 
                    ? 'text-[#1abc9c] bg-white/10' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                Events
              </Link>
              <Link 
                href="/athletes" 
                onClick={() => setIsMenuOpen(false)}
                className={`block py-2 px-3 rounded-md font-normal transition-colors ${
                  currentPage === 'athletes' 
                    ? 'text-[#1abc9c] bg-white/10' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                Athletes
              </Link>
              <Link 
                href="/head-to-heads" 
                onClick={() => setIsMenuOpen(false)}
                className={`block py-2 px-3 rounded-md font-normal transition-colors ${
                  currentPage === 'head-to-heads' 
                    ? 'text-[#1abc9c] bg-white/10' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                Head to Heads
              </Link>
              <Link 
                href="/about" 
                onClick={() => setIsMenuOpen(false)}
                className={`block py-2 px-3 rounded-md font-normal transition-colors ${
                  currentPage === 'about' 
                    ? 'text-[#1abc9c] bg-white/10' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                About
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}