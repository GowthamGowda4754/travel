import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Plane, 
  Hotel, 
  Download, 
  Share2, 
  QrCode, 
  CheckCircle2, 
  Clock, 
  MessageSquare,
  ChevronRight
} from 'lucide-react';
import { Booking } from '../types';

interface MyTripsViewProps {
  bookings: Booking[];
  currency: 'INR' | 'USD';
  onOpenConcierge: () => void;
  onExplore: () => void;
}

export const MyTripsView: React.FC<MyTripsViewProps> = ({
  bookings,
  currency,
  onOpenConcierge,
  onExplore,
}) => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');
  const [showQRModal, setShowQRModal] = useState<string | null>(null);

  const upcomingBookings = bookings.filter((b) => b.status === 'Confirmed' || b.status === 'Pending');

  return (
    <div className="px-4 py-6 max-w-5xl mx-auto space-y-6 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold font-heading tracking-widest text-[#4cd7f6] uppercase block mb-1">
            TRAVEL PASS & ITINERARIES
          </span>
          <h2 className="text-3xl font-heading font-bold text-white tracking-tight">
            My Trips
          </h2>
        </div>

        {/* Tab switch */}
        <div className="flex p-1 rounded-full bg-[#131a33] border border-white/[0.08]">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-3 py-1.5 rounded-full text-xs font-heading font-semibold transition-all ${
              activeTab === 'upcoming'
                ? 'bg-[#29a195] text-[#070d1e]'
                : 'text-[#bcc9c6] hover:text-white'
            }`}
          >
            Upcoming ({upcomingBookings.length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-3 py-1.5 rounded-full text-xs font-heading font-semibold transition-all ${
              activeTab === 'completed'
                ? 'bg-[#29a195] text-[#070d1e]'
                : 'text-[#bcc9c6] hover:text-white'
            }`}
          >
            Past Trips
          </button>
        </div>
      </div>

      {activeTab === 'upcoming' ? (
        upcomingBookings.length > 0 ? (
          <div className="space-y-6">
            {upcomingBookings.map((b) => {
              const priceDisplay =
                currency === 'INR'
                  ? `₹${b.totalPriceINR.toLocaleString('en-IN')}`
                  : `$${b.totalPriceUSD}`;

              return (
                <div
                  key={b.id}
                  className="bg-[#131a33] border border-white/[0.08] rounded-3xl overflow-hidden shadow-2xl relative"
                >
                  {/* Top Bar with Booking ID and Status */}
                  <div className="p-4 bg-[#171e37] border-b border-white/[0.06] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#6bd8cb] animate-ping" />
                      <span className="font-heading font-bold text-white text-xs tracking-wider">
                        REF: {b.bookingCode}
                      </span>
                    </div>
                    <span className="px-3 py-0.5 rounded-full bg-[#29a195]/20 text-[#6bd8cb] border border-[#6bd8cb]/40 text-xs font-heading font-bold">
                      Confirmed & Guaranteed
                    </span>
                  </div>

                  {/* Main Ticket Body */}
                  <div className="p-5 sm:p-6 space-y-5">
                    {/* Destination and Dates */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.06]">
                      <div>
                        <h3 className="font-heading font-bold text-2xl text-white mb-1">
                          {b.packageTitle}
                        </h3>
                        <div className="flex items-center gap-1.5 text-xs text-[#6bd8cb]">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{b.destination}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-[#0a122a] border border-white/[0.06]">
                        <Clock className="w-4 h-4 text-[#4cd7f6]" />
                        <span className="text-xs font-heading font-semibold text-white">
                          Departs in 3 Days!
                        </span>
                      </div>
                    </div>

                    {/* Flight & Hotel Info Badges */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3.5 rounded-2xl bg-[#0a122a] border border-white/[0.06] flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#03b5d3]/20 text-[#4cd7f6] flex items-center justify-center flex-shrink-0">
                          <Plane className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-[#879391]">FLIGHT ROUTE</span>
                          <div className="text-xs font-semibold text-white">
                            {b.flightDetails?.airline || 'Direct Flights Included'}
                          </div>
                          <div className="text-[11px] text-[#bcc9c6]">
                            {b.flightDetails?.seatClass || 'Seats Confirmed'}
                          </div>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-[#0a122a] border border-white/[0.06] flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#29a195]/20 text-[#6bd8cb] flex items-center justify-center flex-shrink-0">
                          <Hotel className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-[#879391]">ACCOMMODATION</span>
                          <div className="text-xs font-semibold text-white truncate max-w-[200px]">
                            {b.hotelName}
                          </div>
                          <div className="text-[11px] text-[#bcc9c6]">
                            Deluxe Suite • Ocean View
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Passenger & Date Bar */}
                    <div className="grid grid-cols-3 gap-2 p-3.5 rounded-2xl bg-[#0a122a] border border-white/[0.06] text-center text-xs">
                      <div>
                        <span className="text-[#879391] text-[10px] block">DATES</span>
                        <span className="font-heading font-semibold text-white">{b.departureDate}</span>
                      </div>
                      <div>
                        <span className="text-[#879391] text-[10px] block">GUESTS</span>
                        <span className="font-heading font-semibold text-white">{b.guestsCount} Guests</span>
                      </div>
                      <div>
                        <span className="text-[#879391] text-[10px] block">TOTAL PAID</span>
                        <span className="font-heading font-bold text-[#6bd8cb]">{priceDisplay}</span>
                      </div>
                    </div>

                    {/* Actions Row */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setShowQRModal(b.id)}
                          className="px-3.5 py-2 rounded-full bg-[#171e37] hover:bg-[#212942] border border-white/[0.08] text-xs font-heading font-semibold text-white flex items-center gap-1.5 transition-colors"
                        >
                          <QrCode className="w-3.5 h-3.5 text-[#6bd8cb]" />
                          <span>Show QR Pass</span>
                        </button>
                        <button
                          onClick={onOpenConcierge}
                          className="px-3.5 py-2 rounded-full bg-[#171e37] hover:bg-[#212942] border border-white/[0.08] text-xs font-heading font-semibold text-white flex items-center gap-1.5 transition-colors"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-[#4cd7f6]" />
                          <span>Contact Guide</span>
                        </button>
                      </div>

                      <div className="text-xs text-[#bcc9c6]">
                        Primary Guest: <strong className="text-white">{b.travelerName}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-8 text-center bg-[#131a33] rounded-3xl border border-white/[0.08] space-y-3">
            <h3 className="font-heading font-bold text-lg text-white">No Upcoming Trips</h3>
            <p className="text-xs text-[#bcc9c6]">Browse popular destinations and reserve your next escape.</p>
            <button
              onClick={onExplore}
              className="px-6 py-2.5 rounded-full bg-[#6bd8cb] text-[#003732] font-heading font-bold text-xs"
            >
              Explore Packages
            </button>
          </div>
        )
      ) : (
        /* Completed Trips */
        <div className="space-y-4">
          <div className="p-4 rounded-3xl bg-[#131a33] border border-white/[0.08] opacity-80">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-heading font-bold text-white text-base">Jaipur Royal Heritage Retreat</h4>
              <span className="text-xs text-[#bcc9c6]">Completed March 2026</span>
            </div>
            <p className="text-xs text-[#bcc9c6]">3 Nights at Samode Palace with Amber Fort Private Jeep Safari.</p>
            <div className="mt-3 flex items-center gap-2 text-xs text-[#6bd8cb]">
              <CheckCircle2 className="w-4 h-4" />
              <span>5-Star Stay Reviewed</span>
            </div>
          </div>
        </div>
      )}

      {/* QR Code Pass Modal */}
      {showQRModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#131a33] border border-white/[0.1] rounded-3xl w-full max-w-xs p-6 text-center space-y-4">
            <h3 className="font-heading font-bold text-white text-lg">Digital Boarding Pass</h3>
            <p className="text-xs text-[#bcc9c6]">Show this QR code at airport pickup and hotel check-in desk.</p>
            <div className="p-4 bg-white rounded-2xl mx-auto inline-block shadow-lg">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=TravelEasy-BK101-GOA-CONFIRMED"
                alt="Ticket QR Code"
                className="w-40 h-40"
              />
            </div>
            <div className="text-xs font-heading font-bold text-[#6bd8cb]">
              REF: TE-8921-GOA • FAST TRACK VERIFIED
            </div>
            <button
              onClick={() => setShowQRModal(null)}
              className="w-full py-2.5 rounded-full bg-[#171e37] text-white font-heading font-semibold text-xs border border-white/[0.1]"
            >
              Close Pass
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
