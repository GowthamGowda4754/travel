import React from 'react';
import { Bell, Compass, Smartphone, Monitor } from 'lucide-react';

interface HeaderProps {
  activeScreen: string;
  onSelectScreen: (screen: 'home' | 'explore' | 'trips' | 'profile') => void;
  onOpenNotifications: () => void;
  hasUnreadNotifications: boolean;
  isMobileDeviceView: boolean;
  onToggleDeviceView: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeScreen,
  onSelectScreen,
  onOpenNotifications,
  hasUnreadNotifications,
  isMobileDeviceView,
  onToggleDeviceView,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#070d1e]/90 backdrop-blur-md border-b border-white/[0.06] transition-all">
      <div className="max-w-5xl mx-auto px-4 py-3.5 flex items-center justify-between">
        {/* Brand / Logo */}
        <div 
          onClick={() => onSelectScreen('home')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          {/* Logo icon matching the screenshot */}
          <div className="w-9 h-9 rounded-xl bg-[#131a33] border border-[#6bd8cb]/30 flex items-center justify-center shadow-lg shadow-[#0d9488]/15 group-hover:border-[#6bd8cb]/60 transition-all">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#0d9488] to-[#4cd7f6] flex items-center justify-center p-1">
              <Compass className="w-4 h-4 text-[#070d1e] stroke-[2.5]" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-lg font-bold tracking-tight text-white group-hover:text-[#6bd8cb] transition-colors leading-none">
              TravelEasy
            </span>
            <span className="text-[10px] font-bold font-heading tracking-widest text-[#6bd8cb] uppercase mt-0.5">
              {activeScreen}
            </span>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2.5">
          {/* Device Frame Toggle (Mobile Preview vs Wide Responsive) */}
          <button
            onClick={onToggleDeviceView}
            title={isMobileDeviceView ? "Switch to Wide Responsive Mode" : "Switch to Mobile Phone View"}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium text-[#bcc9c6] bg-[#131a33] border border-white/[0.08] hover:text-white hover:border-[#6bd8cb]/40 transition-all"
          >
            {isMobileDeviceView ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-[#6bd8cb]" />
                <span>Wide View</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-[#4cd7f6]" />
                <span>Phone View</span>
              </>
            )}
          </button>

          {/* Notification Bell */}
          <button
            onClick={onOpenNotifications}
            aria-label="Notifications"
            className="relative w-9 h-9 rounded-full bg-[#131a33] border border-white/[0.08] hover:border-[#6bd8cb]/40 flex items-center justify-center text-[#dbe1ff] hover:text-white transition-all group"
          >
            <Bell className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            {hasUnreadNotifications && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#4cd7f6] ring-2 ring-[#070d1e] animate-pulse" />
            )}
          </button>

          {/* User Avatar */}
          <button
            onClick={() => onSelectScreen('profile')}
            aria-label="User Profile"
            className="relative group p-0.5 rounded-full ring-2 ring-[#6bd8cb]/40 hover:ring-[#6bd8cb] transition-all"
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
              alt="Ananya Sharma"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#6bd8cb] ring-1 ring-[#070d1e]" />
          </button>
        </div>
      </div>
    </header>
  );
};
