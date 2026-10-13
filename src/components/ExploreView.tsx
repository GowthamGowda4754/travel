import React, { useState } from 'react';
import { Search, SlidersHorizontal, Star, MapPin, ArrowRight } from 'lucide-react';
import { HolidayPackage, Destination } from '../types';

interface ExploreViewProps {
  packages: HolidayPackage[];
  destinations: Destination[];
  onSelectPackage: (pkg: HolidayPackage) => void;
  currency: 'INR' | 'USD';
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  packages,
  destinations,
  onSelectPackage,
  currency,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'rating' | 'priceLow' | 'priceHigh'>('rating');

  const categories = ['All', 'Coastal', 'Highlands', 'Tropics', 'Alpine', 'Island'];

  const filtered = packages.filter((pkg) => {
    const matchesSearch =
      pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchQuery.toLowerCase());

    const dest = destinations.find((d) => d.id === pkg.destinationId);
    const matchesCategory =
      selectedCategory === 'All' || (dest && dest.category === selectedCategory);

    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'priceLow') {
      return (currency === 'INR' ? a.pricePerPersonINR : a.pricePerPersonUSD) -
             (currency === 'INR' ? b.pricePerPersonINR : b.pricePerPersonUSD);
    }
    return (currency === 'INR' ? b.pricePerPersonINR : b.pricePerPersonUSD) -
           (currency === 'INR' ? a.pricePerPersonINR : a.pricePerPersonUSD);
  });

  return (
    <div className="px-4 py-6 max-w-5xl mx-auto space-y-6 pb-24">
      {/* Header */}
      <div>
        <span className="text-[11px] font-bold font-heading tracking-widest text-[#4cd7f6] uppercase block mb-1">
          DISCOVER & WANDER
        </span>
        <h2 className="text-3xl font-heading font-bold text-white tracking-tight">
          Explore All Destinations
        </h2>
        <p className="text-sm text-[#bcc9c6] mt-1">
          Filter handcrafted itineraries across India and premier international getaways.
        </p>
      </div>

      {/* Search Input & Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-[#879391] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search beaches, mountains, resorts, or cities..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[#131a33] border border-white/[0.08] focus:border-[#6bd8cb] text-white placeholder-[#879391] text-sm focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-3.5 rounded-2xl bg-[#131a33] border border-white/[0.08] text-white text-sm focus:border-[#6bd8cb] focus:outline-none cursor-pointer"
          >
            <option value="rating">Top Rated (★)</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-heading font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-[#29a195]/30 text-[#6bd8cb] border border-[#6bd8cb]'
                : 'bg-[#131a33] text-[#bcc9c6] border border-white/[0.06] hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Package Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map((pkg) => {
          const priceDisplay =
            currency === 'INR'
              ? `₹${pkg.pricePerPersonINR.toLocaleString('en-IN')}`
              : `$${pkg.pricePerPersonUSD}`;

          return (
            <div
              key={pkg.id}
              onClick={() => onSelectPackage(pkg)}
              className="bg-[#131a33] border border-white/[0.08] hover:border-[#6bd8cb]/50 rounded-3xl overflow-hidden cursor-pointer transition-all hover:-translate-y-1 group flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={pkg.imageUrl}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131a33] via-transparent to-black/30" />
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#0a122a]/80 backdrop-blur-md text-[11px] font-heading font-bold text-white">
                    {pkg.duration}
                  </div>
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-[#0a122a]/80 backdrop-blur-md text-xs font-heading font-bold text-white flex items-center gap-1">
                    <Star className="w-3 h-3 text-[#4cd7f6] fill-[#4cd7f6]" />
                    <span>{pkg.rating.toFixed(1)}</span>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-1 text-xs text-[#6bd8cb] mb-1">
                    <MapPin className="w-3 h-3" />
                    <span>{pkg.destination}</span>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-white group-hover:text-[#6bd8cb] transition-colors leading-snug mb-1.5">
                    {pkg.title}
                  </h3>
                  <p className="text-xs text-[#bcc9c6] line-clamp-2 leading-relaxed">
                    {pkg.description}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0 flex items-center justify-between border-t border-white/[0.06] mt-2">
                <div>
                  <span className="text-[10px] text-[#879391] uppercase">Per Person</span>
                  <div className="font-heading font-bold text-base text-[#4cd7f6]">{priceDisplay}</div>
                </div>
                <div className="flex items-center gap-1 text-xs font-heading font-bold text-[#6bd8cb]">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
