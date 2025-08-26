'use client';
import React from 'react';
import { ResponsiveNav } from '../../../components/ui/responsive-nav';

export default function AboutPage() {
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
              <ResponsiveNav currentPage="about" />
            </div>
          </div>
        </div>

        {/* About Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/20 p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Profile Picture Section */}
              <div className="flex-shrink-0 text-center">
                <div className="w-48 h-48 mx-auto bg-gradient-to-br from-teal-100 to-blue-100 rounded-full flex items-center justify-center border-4 border-teal-200 shadow-lg">
                  <div className="text-6xl text-teal-600">
                    👨‍💻
                  </div>
                </div>
                <h2 className="text-2xl font-normal text-gray-900 mt-6 mb-2">
                  [Your Name]
                </h2>
                <p className="text-teal-600 font-normal">
                  Developer & Windsurf Enthusiast
                </p>
              </div>

              {/* Content Section */}
              <div className="flex-1">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-normal text-gray-900 mb-3">
                      About This Project
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Welcome to the World Wave Tour Stats dashboard! This application provides comprehensive 
                      statistics and analysis for professional windsurf competitions. Built with passion for 
                      both windsurfing and data visualization, it aims to bring all rider stats for windsurf 
                      tours into one convenient place.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-normal text-gray-900 mb-3">
                      Features
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                        Comprehensive athlete profiles and statistics
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                        Event calendars and results tracking
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                        Head-to-head athlete comparisons
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                        Interactive charts and data visualization
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                        Real-time competition data
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-normal text-gray-900 mb-3">
                      Technology Stack
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      This application is built with modern web technologies including Next.js 15, 
                      TypeScript, Tailwind CSS, and MySQL. The responsive design ensures optimal 
                      viewing across all devices, from desktop to mobile.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-gray-600 italic text-center">
                      #makewindsurfgreatagain
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}