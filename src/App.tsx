/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { PopularDestinations } from './components/PopularDestinations';
import { FeaturedPackages } from './components/FeaturedPackages';
import { WhyBookWithUs } from './components/WhyBookWithUs';
import { BottomNav } from './components/BottomNav';
import { PackageDetailModal } from './components/PackageDetailModal';
import { FlightConfigModal } from './components/FlightConfigModal';
import { ConciergeChatModal } from './components/ConciergeChatModal';
import { NotificationsModal } from './components/NotificationsModal';
import { ExploreView } from './components/ExploreView';
import { MyTripsView } from './components/MyTripsView';
import { ProfileView } from './components/ProfileView';

import { 
  POPULAR_DESTINATIONS, 
  HOLIDAY_PACKAGES, 
  SAMPLE_CONFIRMED_BOOKINGS 
} from './data/travelData';
import { 
  Destination, 
  HolidayPackage, 
  SearchParams, 
  Booking, 
  FlightOption 
} from './types';

export default function App() {
  // Navigation Screen State
  const [activeScreen, setActiveScreen] = useState<'home' | 'explore' | 'trips' | 'profile'>('home');

  // Search State matching the screenshot
  const [searchParams, setSearchParams] = useState<SearchParams>({
    origin: 'Bengaluru, BLR',
    originCode: 'BLR',
    destination: 'Goa, Calangute',
    destinationCode: 'GOI',
    departureDate: '18 Nov, Mon',
    returnDate: '22 Nov, Fri',
    adults: 2,
    children: 1,
    rooms: 1,
  });

  // Display Preferences
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [isMobileDeviceView, setIsMobileDeviceView] = useState(false);

  // Saved / Wishlist Packages
  const [savedPackageIds, setSavedPackageIds] = useState<string[]>(['goa-beach-holiday']);

  // Bookings list
  const [bookings, setBookings] = useState<Booking[]>(SAMPLE_CONFIRMED_BOOKINGS);

  // Modals
  const [selectedPackage, setSelectedPackage] = useState<HolidayPackage | null>(null);
  const [showFlightConfig, setShowFlightConfig] = useState(false);
  const [showConcierge, setShowConcierge] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true);

  // Quick feedback toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const featuredRef = useRef<HTMLDivElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleUpdateSearchParams = (newParams: Partial<SearchParams>) => {
    setSearchParams((prev) => ({ ...prev, ...newParams }));
  };

  const handleSearch = () => {
    // If on home screen, scroll down smoothly to featured packages or switch to explore if no matches
    if (activeScreen !== 'home') {
      setActiveScreen('home');
    }
    setTimeout(() => {
      featuredRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    showToast(`Searching curated packages from ${searchParams.originCode} to ${searchParams.destination.split(',')[0]}...`);
  };

  const handleToggleSave = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSavedPackageIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showToast('Removed from saved wishlist');
        return prev.filter((item) => item !== id);
      } else {
        showToast('Saved to your wishlist! ❤️');
        return [...prev, id];
      }
    });
  };

  const handleSelectDestination = (dest: Destination) => {
    setSearchParams((prev) => ({
      ...prev,
      destination: `${dest.name}, Hub`,
      destinationCode: dest.airportCode,
    }));
    // Find packages for this destination
    const foundPkg = HOLIDAY_PACKAGES.find((p) => p.destinationId === dest.id);
    if (foundPkg) {
      setSelectedPackage(foundPkg);
    } else {
      showToast(`Showing stays and holidays for ${dest.name}`);
      featuredRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookNow = (pkg: HolidayPackage, flightIncluded: boolean, guests: number) => {
    const singlePrice = currency === 'INR' 
      ? pkg.pricePerPersonINR + (flightIncluded ? 4500 : 0)
      : pkg.pricePerPersonUSD + (flightIncluded ? 55 : 0);
    
    const newBooking: Booking = {
      id: `bk-${Date.now()}`,
      bookingCode: `TE-${Math.floor(1000 + Math.random() * 9000)}-${pkg.destinationId.toUpperCase().slice(0, 3)}`,
      packageId: pkg.id,
      packageTitle: pkg.title,
      destination: pkg.destination,
      departureDate: searchParams.departureDate,
      returnDate: searchParams.returnDate,
      guestsCount: guests,
      totalPriceINR: singlePrice * guests,
      totalPriceUSD: Math.round((singlePrice * guests) / 83),
      status: 'Confirmed',
      flightIncluded: flightIncluded,
      flightDetails: flightIncluded
        ? {
            airline: 'IndiGo / Air India (Direct)',
            flightNumber: `${searchParams.originCode} ➔ ${pkg.destinationId.toUpperCase()}`,
            seatClass: 'Economy Flex',
          }
        : undefined,
      hotelName: pkg.resortName,
      qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=TravelEasy-CONFIRMED',
      travelerName: 'Ananya Sharma',
      travelerEmail: 'gowthamgowda4754@gmail.com',
    };

    setBookings((prev) => [newBooking, ...prev]);
    setSelectedPackage(null);
    setActiveScreen('trips');
    showToast(`🎉 Booking Confirmed! E-Pass generated in My Trips.`);
  };

  const handleFlightConfigured = (flight: FlightOption, seatClass: string) => {
    showToast(`Flight ${flight.flightNumber} (${flight.airline}) configured with ${seatClass}!`);
  };

  const savedPackagesList = HOLIDAY_PACKAGES.filter((p) => savedPackageIds.includes(p.id));

  return (
    <div className="min-h-screen bg-[#070d1e] text-[#dbe1ff] flex flex-col items-center">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-[#171e37] border border-[#6bd8cb] text-white text-xs font-heading font-semibold shadow-2xl animate-fade-in flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#6bd8cb]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container - Supports standard full responsive or optional mobile phone preview frame */}
      <div
        className={`w-full transition-all duration-300 min-h-screen flex flex-col ${
          isMobileDeviceView
            ? 'max-w-[430px] my-4 rounded-[40px] border-4 border-[#212942] shadow-[0_0_60px_rgba(107,216,203,0.15)] overflow-hidden bg-[#0a122a]'
            : 'max-w-4xl'
        }`}
      >
        {/* Top Header */}
        <Header
          activeScreen={activeScreen === 'home' ? 'HOME' : activeScreen.toUpperCase()}
          onSelectScreen={setActiveScreen}
          onOpenNotifications={() => {
            setShowNotifications(true);
            setHasUnreadNotifications(false);
          }}
          hasUnreadNotifications={hasUnreadNotifications}
          isMobileDeviceView={isMobileDeviceView}
          onToggleDeviceView={() => setIsMobileDeviceView(!isMobileDeviceView)}
        />

        {/* Screen Views */}
        <main className="flex-1 pb-24">
          {activeScreen === 'home' && (
            <div className="space-y-2">
              {/* Hero Banner + Search Card */}
              <HeroSection
                searchParams={searchParams}
                onUpdateParams={handleUpdateSearchParams}
                onSearch={handleSearch}
              />

              {/* Popular Destinations Carousel */}
              <PopularDestinations
                destinations={POPULAR_DESTINATIONS}
                onSelectDestination={handleSelectDestination}
                onSeeAll={() => setActiveScreen('explore')}
                currency={currency}
              />

              {/* Featured Holiday Packages */}
              <div ref={featuredRef}>
                <FeaturedPackages
                  packages={HOLIDAY_PACKAGES}
                  onSelectPackage={setSelectedPackage}
                  currency={currency}
                  savedIds={savedPackageIds}
                  onToggleSave={handleToggleSave}
                />
              </div>

              {/* Why Book With Us + Custom Flights Banner */}
              <WhyBookWithUs
                onOpenFlightConfig={() => setShowFlightConfig(true)}
                onOpenConcierge={() => setShowConcierge(true)}
              />
            </div>
          )}

          {activeScreen === 'explore' && (
            <ExploreView
              packages={HOLIDAY_PACKAGES}
              destinations={POPULAR_DESTINATIONS}
              onSelectPackage={setSelectedPackage}
              currency={currency}
            />
          )}

          {activeScreen === 'trips' && (
            <MyTripsView
              bookings={bookings}
              currency={currency}
              onOpenConcierge={() => setShowConcierge(true)}
              onExplore={() => setActiveScreen('explore')}
            />
          )}

          {activeScreen === 'profile' && (
            <ProfileView
              currency={currency}
              onToggleCurrency={setCurrency}
              savedPackages={savedPackagesList}
              onSelectPackage={setSelectedPackage}
              onOpenConcierge={() => setShowConcierge(true)}
            />
          )}
        </main>

        {/* Bottom Navigation & Floating Concierge Button */}
        <BottomNav
          activeScreen={activeScreen}
          onSelectScreen={setActiveScreen}
          onOpenConcierge={() => setShowConcierge(true)}
          tripsBadgeCount={bookings.length}
        />
      </div>

      {/* Package Detail Modal */}
      {selectedPackage && (
        <PackageDetailModal
          pkg={selectedPackage}
          searchParams={searchParams}
          currency={currency}
          isSaved={savedPackageIds.includes(selectedPackage.id)}
          onToggleSave={() => handleToggleSave(selectedPackage.id)}
          onClose={() => setSelectedPackage(null)}
          onBookNow={handleBookNow}
          onConfigureFlights={() => {
            setSelectedPackage(null);
            setShowFlightConfig(true);
          }}
        />
      )}

      {/* Flight Configurator Modal */}
      {showFlightConfig && (
        <FlightConfigModal
          onClose={() => setShowFlightConfig(false)}
          onSelectFlight={handleFlightConfigured}
          currency={currency}
          originCity={searchParams.origin}
          destCity={searchParams.destination}
        />
      )}

      {/* 24/7 WhatsApp Concierge Chat Modal */}
      {showConcierge && (
        <ConciergeChatModal
          onClose={() => setShowConcierge(false)}
        />
      )}

      {/* Notifications Modal */}
      {showNotifications && (
        <NotificationsModal
          onClose={() => setShowNotifications(false)}
          onClearAll={() => setHasUnreadNotifications(false)}
        />
      )}
    </div>
  );
}
