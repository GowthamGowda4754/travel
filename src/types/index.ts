export interface Destination {
  id: string;
  name: string;
  tagline: string;
  category: 'Coastal' | 'Highlands' | 'Tropics' | 'Alpine' | 'Island' | 'Heritage';
  rating: number;
  reviewsCount: number;
  startingPriceUSD: number;
  startingPriceINR: number;
  imageUrl: string;
  bestTimeToVisit: string;
  airportCode: string;
  airportName: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
}

export interface HolidayPackage {
  id: string;
  title: string;
  duration: string;
  durationNights: number;
  destination: string;
  destinationId: string;
  rating: number;
  reviewsCount: number;
  pricePerPersonINR: number;
  pricePerPersonUSD: number;
  category: ('TRENDING' | 'HANDCRAFTED' | 'LUXURY' | 'WEEKEND' | 'HONEYMOON')[];
  imageUrl: string;
  galleryImages: string[];
  badges: string[];
  description: string;
  amenities: { icon: string; label: string }[];
  inclusions: string[];
  exclusions: string[];
  highlights: string[];
  itinerary: ItineraryDay[];
  resortName: string;
  roomType: string;
}

export interface FlightOption {
  id: string;
  airline: string;
  flightNumber: string;
  departureCity: string;
  departureCode: string;
  departureTime: string;
  arrivalCity: string;
  arrivalCode: string;
  arrivalTime: string;
  duration: string;
  stops: string;
  priceINR: number;
  priceUSD: number;
  logoUrl?: string;
}

export interface Booking {
  id: string;
  bookingCode: string;
  packageId: string;
  packageTitle: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  guestsCount: number;
  totalPriceINR: number;
  totalPriceUSD: number;
  status: 'Confirmed' | 'Pending' | 'Completed';
  flightIncluded: boolean;
  flightDetails?: {
    airline: string;
    flightNumber: string;
    seatClass: string;
  };
  hotelName: string;
  qrCodeUrl: string;
  travelerName: string;
  travelerEmail: string;
}

export interface SearchParams {
  origin: string;
  originCode: string;
  destination: string;
  destinationCode: string;
  departureDate: string;
  returnDate: string;
  adults: number;
  children: number;
  rooms: number;
}
