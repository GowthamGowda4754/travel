import React from 'react';
import { 
  Award, 
  Heart, 
  Globe, 
  CreditCard, 
  HelpCircle, 
  ShieldCheck, 
  ChevronRight, 
  LogOut,
  Sparkles
} from 'lucide-react';
import { HolidayPackage } from '../types';

interface ProfileViewProps {
  currency: 'INR' | 'USD';
  onToggleCurrency: (c: 'INR' | 'USD') => void;
  savedPackages: HolidayPackage[];
  onSelectPackage: (pkg: HolidayPackage) => void;
  onOpenConcierge: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  currency,
  onToggleCurrency,
  savedPackages,
  onSelectPackage,
  onOpenConcierge,
}) => {
  return (
    <div className="px-4 py-6 max-w-5xl mx-auto space-y-6 pb-24">
      {/* Header */}
      <div>
        <span className="text-[11px] font-bold font-heading tracking-widest text-[#4cd7f6] uppercase block mb-1">
          MEMBER DASHBOARD
        </span>
        <h2 className="text-3xl font-heading font-bold text-white tracking-tight">
          Traveler Profile
        </h2>
      </div>

      {/* User Card with Nocturne Voyager Gold Tier */}
      <div className="bg-[#131a33] border border-white/[0.08] rounded-3xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#6bd8cb]/10 to-transparent rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                alt="Ananya Sharma"
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#6bd8cb]"
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#6bd8cb] text-[#070d1e] flex items-center justify-center text-[10px] font-bold">
                ✓
              </span>
            </div>
            <div>
              <h3 className="font-heading font-bold text-xl text-white">Ananya Sharma</h3>
              <p className="text-xs text-[#bcc9c6]">gowthamgowda4754@gmail.com</p>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#29a195]/20 border border-[#6bd8cb]/30 text-[#6bd8cb] text-[11px] font-heading font-bold mt-1.5">
                <Sparkles className="w-3 h-3" />
                <span>Nocturne Voyager Gold Tier</span>
              </div>
            </div>
          </div>

          {/* Stats Badges */}
          <div className="flex items-center gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-white/[0.06]">
            <div className="p-3 rounded-2xl bg-[#0a122a] border border-white/[0.06] text-center min-w-[70px]">
              <span className="font-heading font-bold text-base text-white">4</span>
              <span className="text-[10px] text-[#879391] block">Trips</span>
            </div>
            <div className="p-3 rounded-2xl bg-[#0a122a] border border-white/[0.06] text-center min-w-[70px]">
              <span className="font-heading font-bold text-base text-[#4cd7f6]">12.4k</span>
              <span className="text-[10px] text-[#879391] block">Miles</span>
            </div>
            <div className="p-3 rounded-2xl bg-[#0a122a] border border-white/[0.06] text-center min-w-[70px]">
              <span className="font-heading font-bold text-base text-[#6bd8cb]">1,850</span>
              <span className="text-[10px] text-[#879391] block">Coins</span>
            </div>
          </div>
        </div>
      </div>

      {/* Preferences & Settings */}
      <div className="space-y-3">
        <h3 className="text-sm font-heading font-bold text-[#4cd7f6] uppercase tracking-wider">
          Preferences & Display
        </h3>

        {/* Currency Switcher */}
        <div className="p-4 rounded-2xl bg-[#131a33] border border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#171e37] flex items-center justify-center text-[#6bd8cb]">
              <CreditCard className="w-5 h-5 text-[#6bd8cb]" />
            </div>
            <div>
              <div className="font-heading font-bold text-sm text-white">Preferred Currency</div>
              <div className="text-xs text-[#bcc9c6]">Switch between Indian Rupees and US Dollars</div>
            </div>
          </div>
          <div className="flex p-1 rounded-full bg-[#0a122a] border border-white/[0.08]">
            <button
              onClick={() => onToggleCurrency('INR')}
              className={`px-3 py-1 rounded-full text-xs font-heading font-bold transition-all ${
                currency === 'INR' ? 'bg-[#29a195] text-[#070d1e]' : 'text-[#879391]'
              }`}
            >
              ₹ INR
            </button>
            <button
              onClick={() => onToggleCurrency('USD')}
              className={`px-3 py-1 rounded-full text-xs font-heading font-bold transition-all ${
                currency === 'USD' ? 'bg-[#29a195] text-[#070d1e]' : 'text-[#879391]'
              }`}
            >
              $ USD
            </button>
          </div>
        </div>

        {/* Travel Concierge Support */}
        <div 
          onClick={onOpenConcierge}
          className="p-4 rounded-2xl bg-[#131a33] border border-white/[0.08] hover:border-[#6bd8cb]/40 cursor-pointer flex items-center justify-between transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#171e37] flex items-center justify-center text-[#4cd7f6]">
              <HelpCircle className="w-5 h-5 text-[#4cd7f6]" />
            </div>
            <div>
              <div className="font-heading font-bold text-sm text-white">24/7 Dedicated Concierge</div>
              <div className="text-xs text-[#bcc9c6]">Talk directly to your personal holiday coordinator</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#879391]" />
        </div>
      </div>

      {/* Saved Wishlist */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-heading font-bold text-[#4cd7f6] uppercase tracking-wider">
            Saved Wishlist ({savedPackages.length})
          </h3>
        </div>

        {savedPackages.length > 0 ? (
          <div className="space-y-2.5">
            {savedPackages.map((pkg) => (
              <div
                key={pkg.id}
                onClick={() => onSelectPackage(pkg)}
                className="p-3 rounded-2xl bg-[#131a33] border border-white/[0.06] hover:border-[#6bd8cb]/40 flex items-center justify-between cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={pkg.imageUrl}
                    alt={pkg.title}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="font-heading font-semibold text-sm text-white">{pkg.title}</h4>
                    <span className="text-xs text-[#6bd8cb]">{pkg.duration}</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#879391]" />
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-[#131a33] text-center text-xs text-[#bcc9c6]">
            No saved holidays yet. Tap the heart on any package to save it here!
          </div>
        )}
      </div>
    </div>
  );
};
