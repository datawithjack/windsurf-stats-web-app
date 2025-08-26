'use client';
import Link from 'next/link';
import { ResponsiveNav } from '../../../components/ui/responsive-nav';

export default function HeadToHeadsPage() {
  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed relative" style={{backgroundImage: 'url(https://www.pwaworldtour.com/typo3conf/ext/sitepackage/Resources/Public/Images/bg_main.jpg)'}}>
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="mb-8">
          <div className="bg-black/80 text-white px-6 py-4 rounded-lg mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-red-600 text-white px-3 py-2 rounded-full font-normal text-sm">LOGO</div>
                <h1 className="text-lg font-normal">World Wave Tour Stats</h1>
              </div>
              <ResponsiveNav currentPage="head-to-heads" />
            </div>
          </div>
        </div>
        <div className="text-center text-white text-2xl mt-32 font-normal">Head to Heads page coming soon...</div>
      </div>
    </div>
  );
} 