import React, { useRef } from 'react';
import { Star, ChevronRight, ChevronLeft } from 'lucide-react';
import { Destination } from '../types';

interface PopularDestinationsProps {
  destinations: Destination[];
  onSelectDestination: (dest: Destination) => void;
  onSeeAll: () => void;
  currency: 'INR' | 'USD';
}

export const PopularDestinations: React.FC<PopularDestinationsProps> = ({
  destinations,
  onSelectDestination,
  onSeeAll,
  currency,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -280 : 280;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="px-4 py-6 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-4">
        <div>
          <span className="text-[11px] font-bold font-heading tracking-widest text-[#4cd7f6] uppercase block mb-1">
            TOP RATED ESCAPES
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
            Popular Destinations
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {/* Scroll buttons for desktop */}
          <div className="hidden sm:flex items-center gap-1.5 mr-2">
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className="w-7 h-7 rounded-full bg-[#131a33] border border-white/[0.08] hover:border-[#6bd8cb] flex items-center justify-center text-[#bcc9c6] hover:text-white transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className="w-7 h-7 rounded-full bg-[#131a33] border border-white/[0.08] hover:border-[#6bd8cb] flex items-center justify-center text-[#bcc9c6] hover:text-white transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onSeeAll}
            className="flex items-center gap-1 text-sm font-heading font-semibold text-[#4cd7f6] hover:text-[#6bd8cb] transition-colors group"
          >
            <span>See all</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 no-scrollbar scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0"
      >
        {destinations.map((dest) => {
          const priceDisplay =
            currency === 'INR'
              ? `₹${dest.startingPriceINR.toLocaleString('en-IN')}`
              : `$${dest.startingPriceUSD}`;

          return (
            <div
              key={dest.id}
              onClick={() => onSelectDestination(dest)}
              className="min-w-[220px] sm:min-w-[250px] flex-shrink-0 bg-[#131a33] rounded-3xl p-3 border border-white/[0.08] hover:border-[#6bd8cb]/50 cursor-pointer transition-all duration-300 hover:-translate-y-1 group shadow-lg shadow-[#070d1e]/50"
            >
              {/* Image Container with Badges */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3">
                <img
                  src={dest.imageUrl}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a122a]/80 via-transparent to-black/30" />

                {/* Rating Badge Top Right */}
                <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-[#0a122a]/85 backdrop-blur-md border border-white/[0.1] flex items-center gap-1 text-xs font-heading font-bold text-white shadow-md">
                  <Star className="w-3 h-3 text-[#4cd7f6] fill-[#4cd7f6]" />
                  <span>{dest.rating.toFixed(1)}</span>
                </div>

                {/* Category Pill Bottom Left */}
                <div className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#131a33]/90 backdrop-blur-md border border-[#6bd8cb]/30 text-[11px] font-heading font-bold text-[#6bd8cb]">
                  {dest.category}
                </div>
              </div>

              {/* Destination Details */}
              <div className="px-1">
                <h3 className="font-heading font-bold text-lg text-white group-hover:text-[#6bd8cb] transition-colors leading-snug">
                  {dest.name}
                </h3>
                <p className="text-xs text-[#bcc9c6] truncate mb-2.5">
                  {dest.tagline}
                </p>

                {/* Price Row */}
                <div className="flex items-baseline justify-between pt-1 border-t border-white/[0.06]">
                  <span className="text-[11px] font-medium text-[#879391]">
                    Starting
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-heading font-bold text-base text-[#4cd7f6]">
                      {priceDisplay}
                    </span>
                    <span className="text-[10px] text-[#879391]">/pers</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
