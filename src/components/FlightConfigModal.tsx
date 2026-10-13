import React, { useState } from 'react';
import { X, Plane, Check, Clock, ShieldCheck, ArrowRight, Luggage } from 'lucide-react';
import { FLIGHT_OPTIONS } from '../data/travelData';
import { FlightOption } from '../types';

interface FlightConfigModalProps {
  onClose: () => void;
  onSelectFlight: (flight: FlightOption, seatClass: string) => void;
  currency: 'INR' | 'USD';
  originCity: string;
  destCity: string;
}

export const FlightConfigModal: React.FC<FlightConfigModalProps> = ({
  onClose,
  onSelectFlight,
  currency,
  originCity,
  destCity,
}) => {
  const [selectedFlightId, setSelectedFlightId] = useState(FLIGHT_OPTIONS[0].id);
  const [seatClass, setSeatClass] = useState<'Economy' | 'Economy Flex' | 'Business'>('Economy Flex');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const selectedFlight = FLIGHT_OPTIONS.find((f) => f.id === selectedFlightId) || FLIGHT_OPTIONS[0];

  const handleApply = () => {
    setSavedSuccess(true);
    setTimeout(() => {
      onSelectFlight(selectedFlight, seatClass);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center sm:p-4">
      <div 
        className="bg-[#0a122a] border border-white/[0.1] rounded-t-3xl sm:rounded-3xl w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-[#131a33] border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#03b5d3]/20 text-[#4cd7f6] flex items-center justify-center">
              <Plane className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-white text-base">Custom Flight Configurator</h3>
              <p className="text-xs text-[#bcc9c6]">Instant airline & baggage pairing</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#171e37] flex items-center justify-center text-[#bcc9c6] hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-5 overflow-y-auto">
          {/* Route Overview */}
          <div className="p-3.5 rounded-2xl bg-[#131a33] border border-white/[0.06] flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#879391]">DEPARTURE ROUTE</span>
              <div className="font-heading font-bold text-white text-sm sm:text-base">{originCity}</div>
            </div>
            <div className="flex flex-col items-center px-3">
              <span className="text-[10px] text-[#4cd7f6] font-semibold">Non-stop (1h 20m)</span>
              <div className="w-16 h-0.5 bg-gradient-to-r from-[#6bd8cb] to-[#4cd7f6] my-1 relative">
                <Plane className="w-3 h-3 text-[#6bd8cb] absolute -top-1 left-1/2 -translate-x-1/2" />
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-[#879391]">ARRIVAL</span>
              <div className="font-heading font-bold text-white text-sm sm:text-base">{destCity}</div>
            </div>
          </div>

          {/* Airline Select List */}
          <div className="space-y-3">
            <label className="text-xs font-heading font-bold text-[#4cd7f6] uppercase tracking-wider block">
              Available Flights
            </label>
            {FLIGHT_OPTIONS.map((flight) => {
              const isSelected = flight.id === selectedFlightId;
              const priceDisplay =
                currency === 'INR' ? `₹${flight.priceINR.toLocaleString('en-IN')}` : `$${flight.priceUSD}`;

              return (
                <div
                  key={flight.id}
                  onClick={() => setSelectedFlightId(flight.id)}
                  className={`p-4 rounded-2xl cursor-pointer border transition-all ${
                    isSelected
                      ? 'bg-[#171e37] border-[#6bd8cb] shadow-lg shadow-[#0d9488]/15'
                      : 'bg-[#131a33] border-white/[0.06] hover:border-white/[0.2]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-bold text-white text-base">{flight.airline}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-[#0a122a] text-[#bcc9c6]">
                        {flight.flightNumber}
                      </span>
                    </div>
                    <div className="font-heading font-bold text-[#6bd8cb] text-base">{priceDisplay}</div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#dbe1ff]">
                    <div>
                      <span className="font-semibold text-white">{flight.departureTime}</span>
                      <span className="text-[#879391] ml-1">({flight.departureCode})</span>
                    </div>
                    <span className="text-[#879391]">• {flight.duration} •</span>
                    <div>
                      <span className="font-semibold text-white">{flight.arrivalTime}</span>
                      <span className="text-[#879391] ml-1">({flight.arrivalCode})</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Seat Class Options */}
          <div>
            <label className="text-xs font-heading font-bold text-[#4cd7f6] uppercase tracking-wider block mb-2">
              Fare Class & Perks
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Economy', 'Economy Flex', 'Business'] as const).map((cls) => (
                <button
                  key={cls}
                  onClick={() => setSeatClass(cls)}
                  className={`p-3 rounded-2xl text-center border transition-all ${
                    seatClass === cls
                      ? 'bg-[#29a195]/20 border-[#6bd8cb] text-[#6bd8cb]'
                      : 'bg-[#131a33] border-white/[0.06] text-[#bcc9c6] hover:text-white'
                  }`}
                >
                  <div className="font-heading font-bold text-xs">{cls}</div>
                  <div className="text-[10px] text-[#879391] mt-0.5">
                    {cls === 'Economy' ? '15kg check-in' : cls === 'Economy Flex' ? 'Free changes' : 'Priority boarding'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Baggage Included Info */}
          <div className="p-3.5 rounded-2xl bg-[#131a33] border border-white/[0.06] flex items-center gap-3 text-xs text-[#bcc9c6]">
            <Luggage className="w-4 h-4 text-[#6bd8cb]" />
            <span>Includes 15kg check-in baggage + 7kg cabin carry-on per passenger.</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#131a33] border-t border-white/[0.08] flex items-center justify-between">
          <div>
            <span className="text-[10px] text-[#879391] uppercase font-bold">FLIGHT ADD-ON</span>
            <div className="font-heading font-bold text-lg text-white">
              {selectedFlight.airline} ({seatClass})
            </div>
          </div>
          <button
            onClick={handleApply}
            className="px-6 py-3 rounded-full bg-[#6bd8cb] text-[#003732] font-heading font-bold text-sm flex items-center gap-2 hover:bg-[#89f5e7] transition-all cursor-pointer"
          >
            {savedSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>Flight Added!</span>
              </>
            ) : (
              <>
                <span>Add to Holiday</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
