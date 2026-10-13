import React from 'react';
import { X, Bell, CheckCircle, Tag, CloudSun } from 'lucide-react';

interface NotificationsModalProps {
  onClose: () => void;
  onClearAll: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  onClose,
  onClearAll,
}) => {
  const notifications = [
    {
      id: '1',
      title: 'Trip Confirmed: Goa Beach Holiday',
      desc: 'Your beachfront resort and private airport chauffeur have been locked in. E-passes are available in My Trips.',
      time: '10m ago',
      icon: CheckCircle,
      color: 'text-[#6bd8cb]',
    },
    {
      id: '2',
      title: 'Limited Flash Deal: Kerala Backwaters',
      desc: 'Complimentary private Ayurvedic wellness massage upgraded on all 4-Day packages booked this weekend.',
      time: '2h ago',
      icon: Tag,
      color: 'text-[#4cd7f6]',
    },
    {
      id: '3',
      title: 'Pleasant Weather in Calangute',
      desc: 'Warm sunny 28°C with gentle coastal evening breeze expected during your departure week.',
      time: 'Yesterday',
      icon: CloudSun,
      color: 'text-amber-300',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-end p-4 sm:p-6">
      <div 
        className="bg-[#131a33] border border-white/[0.1] rounded-3xl w-full max-w-sm p-5 shadow-2xl space-y-4 mt-12 sm:mt-14"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#6bd8cb]" />
            <h3 className="font-heading font-bold text-white text-base">Notifications</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#171e37] flex items-center justify-center text-[#bcc9c6] hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          {notifications.map((n) => {
            const Icon = n.icon;
            return (
              <div key={n.id} className="p-3 rounded-2xl bg-[#171e37] border border-white/[0.06] flex items-start gap-3">
                <div className="p-2 rounded-xl bg-[#0a122a] mt-0.5">
                  <Icon className={`w-4 h-4 ${n.color}`} />
                </div>
                <div className="flex-1">
                  <h4 className="font-heading font-bold text-xs text-white leading-tight mb-1">{n.title}</h4>
                  <p className="text-[11px] text-[#bcc9c6] leading-relaxed mb-1">{n.desc}</p>
                  <span className="text-[10px] text-[#879391]">{n.time}</span>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2 rounded-full bg-[#0a122a] text-xs font-heading font-semibold text-[#bcc9c6] hover:text-white transition-colors"
        >
          Mark all as read
        </button>
      </div>
    </div>
  );
};
