import React from 'react';
import { MessageSquare, BadgePercent, ShieldCheck, Plane } from 'lucide-react';

interface WhyBookWithUsProps {
  onOpenFlightConfig: () => void;
  onOpenConcierge: () => void;
}

export const WhyBookWithUs: React.FC<WhyBookWithUsProps> = ({
  onOpenFlightConfig,
  onOpenConcierge,
}) => {
  const reasons = [
    {
      title: '24/7 WhatsApp Support',
      desc: 'Direct instant concierge support with real holiday guides anytime during your journey.',
      icon: MessageSquare,
      onClick: onOpenConcierge,
      actionText: 'Chat Now',
    },
    {
      title: 'Best Price Guarantee',
      desc: 'Transparent bundled pricing with zero unexpected fees and verified fare matching.',
      icon: BadgePercent,
    },
    {
      title: '100% Verified Stays',
      desc: 'Hand-audited luxury resorts, heritage villas, and boutique riverside properties.',
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="px-4 py-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-4">
        <span className="text-[11px] font-bold font-heading tracking-widest text-[#4cd7f6] uppercase block mb-1">
          SEAMLESS TRAVEL
        </span>
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
          Why Book With Us
        </h2>
      </div>

      {/* 3 Value Proposition Cards */}
      <div className="space-y-3.5 mb-6">
        {reasons.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              onClick={item.onClick}
              className={`p-4 rounded-3xl bg-[#131a33] border border-white/[0.08] flex items-start gap-4 transition-all ${
                item.onClick ? 'cursor-pointer hover:border-[#6bd8cb]/50 hover:bg-[#171e37]' : ''
              }`}
            >
              <div className="w-11 h-11 rounded-2xl bg-[#0a122a] border border-[#6bd8cb]/20 flex items-center justify-center flex-shrink-0 text-[#6bd8cb] shadow-inner">
                <Icon className="w-5 h-5 text-[#6bd8cb]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-bold text-base text-white mb-1">
                    {item.title}
                  </h3>
                  {item.actionText && (
                    <span className="text-xs font-heading font-semibold text-[#6bd8cb] bg-[#29a195]/20 px-2 py-0.5 rounded-full">
                      {item.actionText}
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-[#bcc9c6] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Flight Configurator Promo Banner (matching screenshot) */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-[#131a33] via-[#171e37] to-[#131a33] border border-[#03b5d3]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#03b5d3] text-[#070d1e] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#03b5d3]/30">
            <Plane className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <h4 className="font-heading font-bold text-base text-white leading-tight">
              Need custom flights included?
            </h4>
            <p className="text-xs text-[#bcc9c6] mt-0.5">
              Add flights to any holiday instantly
            </p>
          </div>
        </div>

        <button
          onClick={onOpenFlightConfig}
          className="self-end sm:self-center px-6 py-2.5 rounded-full bg-[#1e2a4a] hover:bg-[#2c3d69] border border-white/[0.12] hover:border-[#4cd7f6] text-white font-heading font-semibold text-xs sm:text-sm tracking-wide transition-all shadow-md active:scale-95"
        >
          Configure
        </button>
      </div>
    </section>
  );
};
