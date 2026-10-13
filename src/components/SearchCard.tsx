import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  ArrowUpDown, 
  Calendar, 
  Users, 
  Search, 
  Check, 
  X,
  ChevronDown
} from 'lucide-react';
import { SearchParams } from '../types';
import { POPULAR_ORIGIN_CITIES, POPULAR_DESTINATION_CITIES } from '../data/travelData';

interface SearchCardProps {
  searchParams: SearchParams;
  onUpdateParams: (newParams: Partial<SearchParams>) => void;
  onSearch: () => void;
}

export const SearchCard: React.FC<SearchCardProps> = ({
  searchParams,
  onUpdateParams,
  onSearch,
}) => {
  const [showOriginModal, setShowOriginModal] = useState(false);
  const [showDestModal, setShowDestModal] = useState(false);
  const [showGuestsModal, setShowGuestsModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);

  const handleSwap = () => {
    setIsSwapping(true);
    setTimeout(() => {
      onUpdateParams({
        origin: searchParams.destination.split(',')[0] || 'Goa',
        originCode: searchParams.destinationCode || 'GOI',
        destination: searchParams.origin.split(',')[0] + ', Central' || 'Bengaluru, BLR',
        destinationCode: searchParams.originCode || 'BLR',
      });
      setIsSwapping(false);
    }, 200);
  };

  const handleAutoFill = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdateParams({
      origin: 'Bengaluru, BLR',
      originCode: 'BLR',
    });
  };

  const totalGuests = searchParams.adults + searchParams.children;

  return (
    <div className="w-full bg-[#131a33]/90 backdrop-blur-xl border border-white/[0.08] rounded-3xl p-5 shadow-2xl shadow-[#070d1e]/80 relative">
      {/* Starting Location */}
      <div className="relative pb-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-bold font-heading tracking-widest text-[#bcc9c6] uppercase">
            STARTING LOCATION
          </span>
          <button
            onClick={handleAutoFill}
            className="px-2.5 py-0.5 rounded-full bg-[#29a195]/20 border border-[#6bd8cb]/40 text-[#6bd8cb] text-[11px] font-semibold hover:bg-[#29a195]/40 transition-colors"
          >
            Auto-fill
          </button>
        </div>

        <div
          onClick={() => setShowOriginModal(true)}
          className="flex items-center justify-between p-3 rounded-2xl bg-[#171e37] border border-white/[0.06] hover:border-[#6bd8cb]/40 cursor-pointer transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#0a122a] flex items-center justify-center text-[#6bd8cb] group-hover:scale-105 transition-transform">
              <MapPin className="w-5 h-5 text-[#6bd8cb]" />
            </div>
            <div>
              <div className="text-white font-heading font-semibold text-base flex items-center gap-2">
                {searchParams.origin}
              </div>
              <div className="text-xs text-[#bcc9c6]">
                {POPULAR_ORIGIN_CITIES.find(c => c.code === searchParams.originCode)?.airport || "Kempegowda Int'l Airport"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Swap Button */}
      <div className="relative flex justify-end -my-3 z-10 pr-4">
        <button
          onClick={handleSwap}
          aria-label="Swap origin and destination"
          className={`w-9 h-9 rounded-full bg-[#03b5d3] hover:bg-[#4cd7f6] text-[#070d1e] flex items-center justify-center shadow-lg shadow-[#03b5d3]/40 border-2 border-[#131a33] transition-all transform hover:scale-110 active:scale-95 ${
            isSwapping ? 'rotate-180 duration-200' : ''
          }`}
        >
          <ArrowUpDown className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>

      {/* Destination */}
      <div className="relative pt-1 pb-4">
        <div className="text-[11px] font-bold font-heading tracking-widest text-[#bcc9c6] uppercase mb-1.5">
          DESTINATION
        </div>
        <div
          onClick={() => setShowDestModal(true)}
          className="flex items-center justify-between p-3 rounded-2xl bg-[#171e37] border border-white/[0.06] hover:border-[#6bd8cb]/40 cursor-pointer transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#0a122a] flex items-center justify-center text-[#6bd8cb] group-hover:scale-105 transition-transform">
              <Navigation className="w-5 h-5 text-[#6bd8cb] rotate-45" />
            </div>
            <div>
              <div className="text-white font-heading font-semibold text-base">
                {searchParams.destination}
              </div>
              <div className="text-xs text-[#bcc9c6]">
                North Coast Beachfront Hub
              </div>
            </div>
          </div>
          <Search className="w-4 h-4 text-[#879391] group-hover:text-[#6bd8cb] transition-colors" />
        </div>
      </div>

      {/* Dates Row */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* Departure */}
        <div
          onClick={() => setShowDatePicker(true)}
          className="p-3 rounded-2xl bg-[#171e37] border border-white/[0.06] hover:border-[#6bd8cb]/40 cursor-pointer transition-all group"
        >
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-3.5 h-3.5 text-[#6bd8cb]" />
            <span className="text-[10px] font-bold font-heading tracking-widest text-[#bcc9c6] uppercase">
              DEPARTURE
            </span>
          </div>
          <div className="text-sm font-heading font-bold text-white group-hover:text-[#6bd8cb] transition-colors">
            {searchParams.departureDate}
          </div>
        </div>

        {/* Return */}
        <div
          onClick={() => setShowDatePicker(true)}
          className="p-3 rounded-2xl bg-[#171e37] border border-white/[0.06] hover:border-[#6bd8cb]/40 cursor-pointer transition-all group"
        >
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-3.5 h-3.5 text-[#4cd7f6]" />
            <span className="text-[10px] font-bold font-heading tracking-widest text-[#bcc9c6] uppercase">
              RETURN
            </span>
          </div>
          <div className="text-sm font-heading font-bold text-white group-hover:text-[#4cd7f6] transition-colors">
            {searchParams.returnDate}
          </div>
        </div>
      </div>

      {/* Travelers & Room */}
      <div 
        onClick={() => setShowGuestsModal(true)}
        className="p-3 rounded-2xl bg-[#171e37] border border-white/[0.06] hover:border-[#6bd8cb]/40 cursor-pointer transition-all flex items-center justify-between mb-4 group"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#0a122a] flex items-center justify-center text-[#6bd8cb]">
            <Users className="w-5 h-5 text-[#6bd8cb]" />
          </div>
          <div>
            <div className="text-[10px] font-bold font-heading tracking-widest text-[#bcc9c6] uppercase">
              TRAVELERS & ROOM
            </div>
            <div className="text-sm font-heading font-bold text-white">
              {searchParams.adults} Adults, {searchParams.children} Child
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#212942] text-xs font-semibold text-[#dbe1ff] border border-white/[0.08] group-hover:border-[#6bd8cb]/40">
          <span>{totalGuests} Guests</span>
          <ChevronDown className="w-3 h-3 text-[#6bd8cb]" />
        </div>
      </div>

      {/* Search Primary Button */}
      <button
        onClick={onSearch}
        className="w-full py-4 px-6 rounded-full bg-[#6bd8cb] hover:bg-[#89f5e7] active:scale-[0.98] text-[#003732] font-heading font-bold text-base flex items-center justify-center gap-2 shadow-xl shadow-[#0d9488]/30 hover:shadow-[#6bd8cb]/50 transition-all cursor-pointer"
      >
        <Search className="w-5 h-5 stroke-[2.5]" />
        <span>Search Holiday Packages</span>
      </button>

      {/* Origin Selection Modal */}
      {showOriginModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#131a33] border border-white/[0.1] rounded-3xl w-full max-w-sm p-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-3">
              <h3 className="font-heading font-bold text-white text-base">Select Departure Airport</h3>
              <button 
                onClick={() => setShowOriginModal(false)}
                className="w-8 h-8 rounded-full bg-[#171e37] flex items-center justify-center text-[#bcc9c6] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2">
              {POPULAR_ORIGIN_CITIES.map((c) => (
                <div
                  key={c.code}
                  onClick={() => {
                    onUpdateParams({
                      origin: `${c.city}, ${c.code}`,
                      originCode: c.code,
                    });
                    setShowOriginModal(false);
                  }}
                  className={`p-3 rounded-2xl flex items-center justify-between cursor-pointer transition-colors ${
                    searchParams.originCode === c.code 
                      ? 'bg-[#29a195]/20 border border-[#6bd8cb]' 
                      : 'bg-[#171e37] hover:bg-[#212942]'
                  }`}
                >
                  <div>
                    <div className="font-heading font-semibold text-white text-sm">
                      {c.city} ({c.code})
                    </div>
                    <div className="text-xs text-[#bcc9c6]">{c.airport}</div>
                  </div>
                  {searchParams.originCode === c.code && (
                    <Check className="w-4 h-4 text-[#6bd8cb]" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Destination Selection Modal */}
      {showDestModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#131a33] border border-white/[0.1] rounded-3xl w-full max-w-sm p-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-3">
              <h3 className="font-heading font-bold text-white text-base">Select Destination Hub</h3>
              <button 
                onClick={() => setShowDestModal(false)}
                className="w-8 h-8 rounded-full bg-[#171e37] flex items-center justify-center text-[#bcc9c6] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2">
              {POPULAR_DESTINATION_CITIES.map((d) => (
                <div
                  key={d.code}
                  onClick={() => {
                    onUpdateParams({
                      destination: d.city,
                      destinationCode: d.code,
                    });
                    setShowDestModal(false);
                  }}
                  className={`p-3 rounded-2xl flex items-center justify-between cursor-pointer transition-colors ${
                    searchParams.destination.includes(d.city.split(',')[0])
                      ? 'bg-[#29a195]/20 border border-[#6bd8cb]'
                      : 'bg-[#171e37] hover:bg-[#212942]'
                  }`}
                >
                  <div>
                    <div className="font-heading font-semibold text-white text-sm">{d.city}</div>
                    <div className="text-xs text-[#bcc9c6]">{d.hub}</div>
                  </div>
                  {searchParams.destination.includes(d.city.split(',')[0]) && (
                    <Check className="w-4 h-4 text-[#6bd8cb]" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Guests & Room Modal */}
      {showGuestsModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#131a33] border border-white/[0.1] rounded-3xl w-full max-w-xs p-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-4">
              <h3 className="font-heading font-bold text-white text-base">Travelers & Rooms</h3>
              <button 
                onClick={() => setShowGuestsModal(false)}
                className="w-8 h-8 rounded-full bg-[#171e37] flex items-center justify-center text-[#bcc9c6] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Adults */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-white">Adults</div>
                  <div className="text-xs text-[#bcc9c6]">Ages 12+</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    disabled={searchParams.adults <= 1}
                    onClick={() => onUpdateParams({ adults: Math.max(1, searchParams.adults - 1) })}
                    className="w-8 h-8 rounded-full bg-[#171e37] border border-white/[0.1] text-white disabled:opacity-30 flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="font-heading font-bold text-white w-4 text-center">{searchParams.adults}</span>
                  <button
                    onClick={() => onUpdateParams({ adults: searchParams.adults + 1 })}
                    className="w-8 h-8 rounded-full bg-[#29a195] text-[#070d1e] font-bold flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Children */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-white">Children</div>
                  <div className="text-xs text-[#bcc9c6]">Ages 2-11</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    disabled={searchParams.children <= 0}
                    onClick={() => onUpdateParams({ children: Math.max(0, searchParams.children - 1) })}
                    className="w-8 h-8 rounded-full bg-[#171e37] border border-white/[0.1] text-white disabled:opacity-30 flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="font-heading font-bold text-white w-4 text-center">{searchParams.children}</span>
                  <button
                    onClick={() => onUpdateParams({ children: searchParams.children + 1 })}
                    className="w-8 h-8 rounded-full bg-[#29a195] text-[#070d1e] font-bold flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Rooms */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-white">Rooms</div>
                  <div className="text-xs text-[#bcc9c6]">Private resort rooms</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    disabled={searchParams.rooms <= 1}
                    onClick={() => onUpdateParams({ rooms: Math.max(1, searchParams.rooms - 1) })}
                    className="w-8 h-8 rounded-full bg-[#171e37] border border-white/[0.1] text-white disabled:opacity-30 flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="font-heading font-bold text-white w-4 text-center">{searchParams.rooms}</span>
                  <button
                    onClick={() => onUpdateParams({ rooms: searchParams.rooms + 1 })}
                    className="w-8 h-8 rounded-full bg-[#29a195] text-[#070d1e] font-bold flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => setShowGuestsModal(false)}
                className="w-full mt-2 py-2.5 rounded-full bg-[#6bd8cb] text-[#003732] font-heading font-bold text-sm"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Date Picker Modal */}
      {showDatePicker && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#131a33] border border-white/[0.1] rounded-3xl w-full max-w-xs p-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-3">
              <h3 className="font-heading font-bold text-white text-base">Select Travel Window</h3>
              <button 
                onClick={() => setShowDatePicker(false)}
                className="w-8 h-8 rounded-full bg-[#171e37] flex items-center justify-center text-[#bcc9c6] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              {[
                { dep: '18 Nov, Mon', ret: '22 Nov, Fri', label: 'Recommended: Nov 18 - 22 (4 Nights)' },
                { dep: '24 Nov, Sun', ret: '29 Nov, Fri', label: 'Late Nov: Nov 24 - 29 (5 Nights)' },
                { dep: '05 Dec, Thu', ret: '09 Dec, Mon', label: 'Winter Kickoff: Dec 05 - 09' },
                { dep: '22 Dec, Mon', ret: '27 Dec, Sat', label: 'Christmas Holiday: Dec 22 - 27' },
                { dep: '30 Dec, Tue', ret: '03 Jan, Sat', label: 'New Year Escape: Dec 30 - Jan 03' },
              ].map((slot, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    onUpdateParams({
                      departureDate: slot.dep,
                      returnDate: slot.ret,
                    });
                    setShowDatePicker(false);
                  }}
                  className="p-3 rounded-2xl bg-[#171e37] hover:bg-[#212942] border border-white/[0.06] hover:border-[#6bd8cb] cursor-pointer"
                >
                  <div className="text-sm font-heading font-semibold text-white">{slot.label}</div>
                  <div className="text-xs text-[#6bd8cb] mt-0.5">{slot.dep} ➔ {slot.ret}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
