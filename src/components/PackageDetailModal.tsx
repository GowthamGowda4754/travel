import React, { useState } from 'react';
import { 
  X, 
  Star, 
  MapPin, 
  Calendar, 
  Users, 
  Check, 
  Clock, 
  Plane, 
  ShieldCheck, 
  ChevronRight,
  Heart
} from 'lucide-react';
import { HolidayPackage, SearchParams } from '../types';

interface PackageDetailModalProps {
  pkg: HolidayPackage;
  searchParams: SearchParams;
  currency: 'INR' | 'USD';
  isSaved: boolean;
  onToggleSave: () => void;
  onClose: () => void;
  onBookNow: (pkg: HolidayPackage, flightIncluded: boolean, guests: number) => void;
  onConfigureFlights: () => void;
}

export const PackageDetailModal: React.FC<PackageDetailModalProps> = ({
  pkg,
  searchParams,
  currency,
  isSaved,
  onToggleSave,
  onClose,
  onBookNow,
  onConfigureFlights,
}) => {
  const [activeTab, setActiveTab] = useState<'itinerary' | 'inclusions' | 'stay'>('itinerary');
  const [includeFlightAddon, setIncludeFlightAddon] = useState(false);
  const [guestCount, setGuestCount] = useState(searchParams.adults + searchParams.children);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);

  const flightPrice = currency === 'INR' ? 4500 : 55;
  const basePricePerPerson = currency === 'INR' ? pkg.pricePerPersonINR : pkg.pricePerPersonUSD;
  const singleCost = includeFlightAddon ? basePricePerPerson + flightPrice : basePricePerPerson;
  const totalCost = singleCost * guestCount;

  const handleBooking = () => {
    setIsBookingSuccess(true);
    setTimeout(() => {
      onBookNow(pkg, includeFlightAddon, guestCount);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center sm:p-4 overflow-y-auto">
      <div 
        className="bg-[#0a122a] border border-white/[0.1] rounded-t-3xl sm:rounded-3xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Sticky Header */}
        <div className="p-4 bg-[#131a33]/90 backdrop-blur-md border-b border-white/[0.08] flex items-center justify-between z-20">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#29a195]/20 border border-[#6bd8cb]/40 text-[#6bd8cb] text-xs font-heading font-semibold">
              {pkg.duration}
            </span>
            <div className="flex items-center gap-1 text-xs text-white">
              <Star className="w-3.5 h-3.5 text-[#4cd7f6] fill-[#4cd7f6]" />
              <span className="font-bold">{pkg.rating.toFixed(1)}</span>
              <span className="text-[#879391]">({pkg.reviewsCount} reviews)</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onToggleSave}
              className="w-9 h-9 rounded-full bg-[#171e37] border border-white/[0.08] flex items-center justify-center text-white hover:border-[#6bd8cb] transition-colors"
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'text-rose-500 fill-rose-500' : 'text-[#bcc9c6]'}`} />
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#171e37] border border-white/[0.08] flex items-center justify-center text-[#bcc9c6] hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Main Hero Gallery */}
          <div>
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-2.5 shadow-lg">
              <img
                src={pkg.galleryImages[activeImageIndex] || pkg.imageUrl}
                alt={pkg.title}
                className="w-full h-full object-cover transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-white">
                <h2 className="font-heading font-bold text-xl sm:text-2xl drop-shadow-md">
                  {pkg.title}
                </h2>
                <div className="flex items-center gap-1.5 text-xs text-[#bcc9c6] mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#6bd8cb]" />
                  <span>{pkg.destination}</span>
                </div>
              </div>
            </div>

            {/* Thumbnails */}
            {pkg.galleryImages.length > 1 && (
              <div className="flex gap-2">
                {pkg.galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx ? 'border-[#6bd8cb] scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Description & Highlights */}
          <div className="p-4 rounded-2xl bg-[#131a33] border border-white/[0.06]">
            <p className="text-sm text-[#dbe1ff] leading-relaxed mb-3">
              {pkg.description}
            </p>
            <div className="space-y-1.5">
              {pkg.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-[#bcc9c6]">
                  <Check className="w-3.5 h-3.5 text-[#6bd8cb] flex-shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-white/[0.08] gap-4">
            {(['itinerary', 'inclusions', 'stay'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2.5 font-heading font-semibold text-sm capitalize transition-colors border-b-2 -mb-[1px] ${
                  activeTab === tab
                    ? 'border-[#6bd8cb] text-[#6bd8cb]'
                    : 'border-transparent text-[#879391] hover:text-white'
                }`}
              >
                {tab === 'itinerary' ? 'Day-by-Day Plan' : tab === 'inclusions' ? 'What’s Included' : 'Resort & Stay'}
              </button>
            ))}
          </div>

          {/* Tab Contents */}
          {activeTab === 'itinerary' && (
            <div className="space-y-4">
              {pkg.itinerary.map((day) => (
                <div key={day.day} className="p-4 rounded-2xl bg-[#131a33] border border-white/[0.06]">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-6 h-6 rounded-lg bg-[#29a195]/20 text-[#6bd8cb] font-heading font-bold text-xs flex items-center justify-center">
                      D{day.day}
                    </span>
                    <h4 className="font-heading font-bold text-sm text-white">{day.title}</h4>
                  </div>
                  <p className="text-xs text-[#bcc9c6] leading-relaxed mb-2.5">
                    {day.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {day.activities.map((act, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-[#171e37] text-[11px] text-[#bcc9c6]">
                        • {act}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'inclusions' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#131a33] border border-white/[0.06]">
                <h4 className="font-heading font-bold text-sm text-[#6bd8cb] mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#6bd8cb]" />
                  <span>Inclusions</span>
                </h4>
                <ul className="space-y-2 text-xs text-[#dbe1ff]">
                  {pkg.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#6bd8cb] flex-shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-[#131a33] border border-white/[0.06]">
                <h4 className="font-heading font-bold text-sm text-rose-400 mb-2">
                  Exclusions
                </h4>
                <ul className="space-y-1.5 text-xs text-[#879391]">
                  {pkg.exclusions.map((exc, i) => (
                    <li key={i}>• {exc}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'stay' && (
            <div className="p-4 rounded-2xl bg-[#131a33] border border-white/[0.06] space-y-3">
              <div>
                <span className="text-[10px] font-bold tracking-wider uppercase text-[#6bd8cb]">FEATURED PROPERTY</span>
                <h4 className="font-heading font-bold text-base text-white">{pkg.resortName}</h4>
                <p className="text-xs text-[#bcc9c6] mt-0.5">{pkg.roomType}</p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-[#dbe1ff] pt-2 border-t border-white/[0.08]">
                <div className="p-2.5 rounded-xl bg-[#171e37]">
                  <span className="text-[#879391] block text-[10px]">CHECK-IN</span>
                  <span className="font-semibold text-white">02:00 PM</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#171e37]">
                  <span className="text-[#879391] block text-[10px]">CHECK-OUT</span>
                  <span className="font-semibold text-white">11:00 AM</span>
                </div>
              </div>
            </div>
          )}

          {/* Flight Add-on Option */}
          <div className="p-4 rounded-2xl bg-[#171e37] border border-[#03b5d3]/30 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#03b5d3]/20 text-[#4cd7f6] flex items-center justify-center">
                <Plane className="w-5 h-5" />
              </div>
              <div>
                <div className="font-heading font-bold text-sm text-white">Add Return Flights</div>
                <div className="text-xs text-[#bcc9c6]">
                  {currency === 'INR' ? '+₹4,500' : '+$55'} / person from {searchParams.originCode}
                </div>
              </div>
            </div>
            <button
              onClick={() => setIncludeFlightAddon(!includeFlightAddon)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-heading font-bold transition-all ${
                includeFlightAddon
                  ? 'bg-[#4cd7f6] text-[#070d1e]'
                  : 'bg-[#131a33] text-[#4cd7f6] border border-[#4cd7f6]/40'
              }`}
            >
              {includeFlightAddon ? 'Added ✓' : 'Add Flights'}
            </button>
          </div>

          {/* Guest Count adjustment */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#131a33] border border-white/[0.06]">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#6bd8cb]" />
              <span className="text-xs font-semibold text-white">Travelers:</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                disabled={guestCount <= 1}
                onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                className="w-7 h-7 rounded-full bg-[#171e37] text-white disabled:opacity-30 flex items-center justify-center"
              >
                -
              </button>
              <span className="font-heading font-bold text-white text-sm">{guestCount}</span>
              <button
                onClick={() => setGuestCount(guestCount + 1)}
                className="w-7 h-7 rounded-full bg-[#29a195] text-[#070d1e] font-bold flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Booking Action Bar */}
        <div className="p-4 bg-[#131a33] border-t border-white/[0.08] flex items-center justify-between gap-4 z-20">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#879391]">TOTAL ESTIMATE</span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-heading font-bold text-xl sm:text-2xl text-[#6bd8cb]">
                {currency === 'INR' ? `₹${totalCost.toLocaleString('en-IN')}` : `$${totalCost}`}
              </span>
              <span className="text-xs text-[#bcc9c6]">({guestCount} Guests)</span>
            </div>
          </div>

          <button
            disabled={isBookingSuccess}
            onClick={handleBooking}
            className="px-6 py-3.5 rounded-full bg-[#6bd8cb] hover:bg-[#89f5e7] active:scale-95 text-[#003732] font-heading font-bold text-sm flex items-center gap-2 shadow-lg shadow-[#0d9488]/30 transition-all cursor-pointer"
          >
            {isBookingSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>Confirmed!</span>
              </>
            ) : (
              <>
                <span>Confirm & Book</span>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
