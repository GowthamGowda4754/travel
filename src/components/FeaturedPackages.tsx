import React, { useState } from 'react';
import { 
  Star, 
  Hotel, 
  Ship, 
  Sparkles, 
  Flame, 
  Compass, 
  Palmtree, 
  Heart,
  ArrowRight
} from 'lucide-react';
import { HolidayPackage } from '../types';

interface FeaturedPackagesProps {
  packages: HolidayPackage[];
  onSelectPackage: (pkg: HolidayPackage) => void;
  currency: 'INR' | 'USD';
  savedIds: string[];
  onToggleSave: (id: string, e: React.MouseEvent) => void;
}

export const FeaturedPackages: React.FC<FeaturedPackagesProps> = ({
  packages,
  onSelectPackage,
  currency,
  savedIds,
  onToggleSave,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'TRENDING' | 'HANDCRAFTED' | 'LUXURY'>('TRENDING');

  const filteredPackages = packages.filter((pkg) => {
    if (selectedFilter === 'ALL') return true;
    return pkg.category.includes(selectedFilter as any);
  });

  const renderAmenityIcon = (label: string) => {
    const l = label.toLowerCase();
    if (l.includes('resort') || l.includes('stay') || l.includes('hotel')) {
      return <Hotel className="w-3.5 h-3.5 text-[#6bd8cb]" />;
    }
    if (l.includes('cruise') || l.includes('boat') || l.includes('ship')) {
      return <Ship className="w-3.5 h-3.5 text-[#6bd8cb]" />;
    }
    if (l.includes('ayurvedic') || l.includes('spa') || l.includes('care')) {
      return <Sparkles className="w-3.5 h-3.5 text-[#6bd8cb]" />;
    }
    if (l.includes('villa') || l.includes('heated') || l.includes('cabin')) {
      return <Flame className="w-3.5 h-3.5 text-[#6bd8cb]" />;
    }
    if (l.includes('adventure') || l.includes('pass') || l.includes('trek')) {
      return <Compass className="w-3.5 h-3.5 text-[#6bd8cb]" />;
    }
    return <Palmtree className="w-3.5 h-3.5 text-[#6bd8cb]" />;
  };

  return (
    <section className="px-4 py-6 max-w-5xl mx-auto">
      {/* Category Pills Header */}
      <div className="flex items-center gap-2 mb-2">
        {(['TRENDING', 'HANDCRAFTED', 'LUXURY', 'ALL'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedFilter(cat)}
            className={`px-3 py-1 rounded-full text-xs font-heading font-bold tracking-wider transition-all cursor-pointer ${
              selectedFilter === cat
                ? 'bg-[#29a195]/30 text-[#6bd8cb] border border-[#6bd8cb] shadow-sm shadow-[#6bd8cb]/20'
                : 'bg-[#131a33] text-[#bcc9c6] border border-white/[0.08] hover:border-white/[0.2] hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Section Title */}
      <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight mb-5">
        Featured Holiday Packages
      </h2>

      {/* Packages Vertical Stack */}
      <div className="space-y-6">
        {filteredPackages.map((pkg) => {
          const isSaved = savedIds.includes(pkg.id);
          const priceDisplay =
            currency === 'INR'
              ? `₹${pkg.pricePerPersonINR.toLocaleString('en-IN')}`
              : `$${pkg.pricePerPersonUSD}`;

          return (
            <div
              key={pkg.id}
              onClick={() => onSelectPackage(pkg)}
              className="bg-[#131a33] border border-white/[0.08] hover:border-[#6bd8cb]/50 rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-[#070d1e] group"
            >
              {/* Media Container with Badges */}
              <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden">
                <img
                  src={pkg.imageUrl}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131a33] via-black/20 to-black/40" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                  {pkg.badges.map((b, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-[#0a122a]/85 backdrop-blur-md border border-white/[0.1] text-xs font-heading font-semibold text-[#dbe1ff] shadow-md"
                    >
                      {b}
                    </span>
                  ))}
                </div>

                {/* Favorite Button Top Right */}
                <button
                  onClick={(e) => onToggleSave(pkg.id, e)}
                  aria-label="Save package"
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-[#0a122a]/80 backdrop-blur-md border border-white/[0.1] flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all"
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      isSaved ? 'text-rose-500 fill-rose-500' : 'text-[#bcc9c6]'
                    }`}
                  />
                </button>

                {/* Price Pill Bottom Right of Image (matching screenshot) */}
                <div className="absolute bottom-3 right-3 px-3.5 py-1.5 rounded-full bg-[#29a195]/90 hover:bg-[#6bd8cb] backdrop-blur-md border border-[#6bd8cb]/40 text-[#070d1e] font-heading font-bold text-xs sm:text-sm shadow-xl flex items-center gap-1 transition-colors">
                  <span>From {priceDisplay} / person</span>
                </div>
              </div>

              {/* Package Content */}
              <div className="p-5">
                {/* Title & Rating */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-white group-hover:text-[#6bd8cb] transition-colors">
                    {pkg.title}
                  </h3>
                  <div className="flex items-center gap-1 flex-shrink-0 text-sm font-heading font-semibold text-[#4cd7f6] bg-[#0a122a] px-2.5 py-1 rounded-full border border-white/[0.08]">
                    <Star className="w-3.5 h-3.5 text-[#4cd7f6] fill-[#4cd7f6]" />
                    <span className="text-white font-bold">{pkg.rating.toFixed(1)}</span>
                    <span className="text-[#879391] text-xs">({pkg.reviewsCount})</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-[#bcc9c6] leading-relaxed mb-4">
                  {pkg.description}
                </p>

                {/* Amenity Badges & Quick Action */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/[0.06]">
                  <div className="flex flex-wrap items-center gap-2">
                    {pkg.amenities.map((item, idx) => (
                      <div
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#171e37] border border-white/[0.06] text-xs font-heading font-medium text-[#dbe1ff]"
                      >
                        {renderAmenityIcon(item.label)}
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-1 text-xs font-heading font-bold text-[#6bd8cb] group-hover:translate-x-1 transition-transform">
                    <span>View Itinerary</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
