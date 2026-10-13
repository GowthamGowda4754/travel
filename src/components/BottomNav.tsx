import React from 'react';
import { Home, Compass, Luggage, User, MessageSquare } from 'lucide-react';

interface BottomNavProps {
  activeScreen: 'home' | 'explore' | 'trips' | 'profile';
  onSelectScreen: (screen: 'home' | 'explore' | 'trips' | 'profile') => void;
  onOpenConcierge: () => void;
  tripsBadgeCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeScreen,
  onSelectScreen,
  onOpenConcierge,
  tripsBadgeCount = 1,
}) => {
  const navItems = [
    { id: 'home' as const, label: 'Home', icon: Home },
    { id: 'explore' as const, label: 'Explore', icon: Compass },
    { id: 'trips' as const, label: 'My Trips', icon: Luggage, badge: tripsBadgeCount },
    { id: 'profile' as const, label: 'Profile', icon: User },
  ];

  return (
    <>
      {/* Floating Concierge Action Button (as seen in screenshot bottom right) */}
      <aside aria-label="Support chat" className="fixed bottom-20 right-4 sm:right-8 z-40">
        <button
          onClick={onOpenConcierge}
          aria-label="Open 24/7 WhatsApp Concierge"
          className="w-13 h-13 rounded-full bg-[#6bd8cb] hover:bg-[#89f5e7] text-[#003732] flex items-center justify-center shadow-xl shadow-[#0d9488]/40 hover:scale-105 active:scale-95 transition-all group"
        >
          <MessageSquare className="w-6 h-6 stroke-[2.2] group-hover:scale-110 transition-transform" />
          <span className="sr-only">Open Concierge Chat</span>
        </button>
      </aside>

      {/* Bottom Navigation Bar */}
      <nav aria-label="Main Navigation" className="fixed bottom-0 left-0 right-0 z-40 bg-[#070d1e]/95 backdrop-blur-lg border-t border-white/[0.08] px-4 py-2">
        <div className="max-w-md mx-auto flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeScreen === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onSelectScreen(item.id)}
                className={`relative flex flex-col items-center justify-center py-1 px-4 rounded-xl transition-all ${
                  isActive ? 'text-[#6bd8cb]' : 'text-[#879391] hover:text-[#bcc9c6]'
                }`}
              >
                <div className="relative">
                  <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
                  {item.badge && item.badge > 0 && item.id === 'trips' && (
                    <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-[#4cd7f6] text-[#070d1e] font-heading font-bold text-[9px] flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span
                  className={`text-[11px] font-heading font-medium mt-1 tracking-tight ${
                    isActive ? 'font-bold text-[#6bd8cb]' : 'text-[#879391]'
                  }`}
                >
                  {item.label}
                </span>

                {/* Active indicator dot */}
                {isActive && (
                  <span className="absolute bottom-0 w-1.5 h-1.5 rounded-full bg-[#6bd8cb] shadow-sm shadow-[#6bd8cb]" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
