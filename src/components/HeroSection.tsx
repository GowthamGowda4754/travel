import React from 'react';
import { SearchParams } from '../types';
import { SearchCard } from './SearchCard';

interface HeroSectionProps {
  searchParams: SearchParams;
  onUpdateParams: (newParams: Partial<SearchParams>) => void;
  onSearch: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchParams,
  onUpdateParams,
  onSearch,
}) => {
  return (
    <section className="relative px-4 pt-3 pb-6 max-w-5xl mx-auto">
      {/* Hero Banner with sunset image */}
      <div className="relative rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/[0.08] min-h-[340px] sm:min-h-[380px] flex flex-col justify-between p-6 sm:p-8">
        {/* Background Image with rich dusk/sunset gradient overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80')`,
          }}
        />
        {/* Atmospheric twilight gradient overlay matching the Nocturne palette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a122a] via-[#0a122a]/70 to-[#070d1e]/40 backdrop-brightness-95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#0d9488]/20 via-transparent to-transparent pointer-events-none" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-xl">
          {/* Tag pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#131a33]/80 border border-[#6bd8cb]/30 backdrop-blur-md mb-4 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6bd8cb] animate-pulse" />
            <span className="text-[11px] font-bold font-heading tracking-widest text-[#6bd8cb] uppercase">
              CURATED JOURNEYS
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.15] mb-3">
            Your Next Adventure Starts Here
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-[#bcc9c6] font-normal leading-relaxed max-w-lg">
            Discover amazing destinations and book your perfect holiday in just a few clicks.
          </p>
        </div>

        {/* Ambient subtle glow at bottom */}
        <div className="relative z-10 h-2" />
      </div>

      {/* Floating Search Card directly integrated below the hero image */}
      <div className="relative -mt-6 sm:-mt-8 z-20 px-1 sm:px-4">
        <SearchCard 
          searchParams={searchParams}
          onUpdateParams={onUpdateParams}
          onSearch={onSearch}
        />
      </div>
    </section>
  );
};
