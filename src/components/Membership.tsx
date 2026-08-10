import { useState, useEffect, type ReactNode } from 'react';
import { useInView } from '../hooks/useInView';
import { Pricing, subscribePricing } from '../lib/firestore';

const WHATSAPP_NUMBER = '923219696969';

interface Tier {
  name: string;
  tier: string;
  price: string;
  color: string;
  borderColor: string;
  glowColor: string;
  features: string[];
  icon: ReactNode;
  popular?: boolean;
}

const defaultTiers: Tier[] = [
  {
    name: 'The Player',
    tier: 'Silver',
    price: '5,000',
    color: 'text-silver',
    borderColor: 'border-silver/20',
    glowColor: 'hover:shadow-[0_0_40px_rgba(192,192,192,0.15)]',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    features: [
      'Priority table booking',
      '10% Lounge & café discount',
      'Member-only weekly events',
      'Digital membership card',
    ],
  },
  {
    name: 'The Professional',
    tier: 'Gold',
    price: '15,000',
    color: 'text-gold',
    borderColor: 'border-gold/30',
    glowColor: 'hover:shadow-[0_0_60px_rgba(197,160,89,0.2)]',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    popular: true,
    features: [
      'All Silver benefits',
      'Dedicated personal locker',
      '2 hours VVIP room access / month',
      'Guest passes (2/month)',
      'Priority tournament registration',
    ],
  },
  {
    name: 'The Royal',
    tier: 'Platinum',
    price: '35,000',
    color: 'text-platinum',
    borderColor: 'border-platinum/20',
    glowColor: 'hover:shadow-[0_0_60px_rgba(229,228,226,0.12)]',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}>
        <path d="M2 4l3 12h14l3-12-6 7-4-9-4 9-6-7z" />
        <path d="M3 20h18" />
      </svg>
    ),
    features: [
      'All Gold benefits',
      '24/7 key-card access',
      'Private event hosting',
      'Professional tournament entry',
      'Complimentary lounge service',
      'Personal cue storage',
    ],
  },
];

function TierCard({ tier, index, dynamicPrice }: { tier: Tier; index: number; dynamicPrice?: number }) {
  const { ref, isInView } = useInView(0.1);
  
  const displayPrice = dynamicPrice ? dynamicPrice.toLocaleString() : tier.price;

  const handleSelect = () => {
    const message = encodeURIComponent(
      `Hi! I'm interested in the ${tier.tier} membership (${tier.name}) at PKR ${displayPrice}/month.`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <div
      ref={ref}
      className={`opacity-0 ${isInView ? 'animate-fade-up' : ''}`}
      style={{ animationDelay: `${index * 200}ms`, animationFillMode: 'forwards' }}
    >
      <div
        className={`relative glass rounded-2xl p-6 sm:p-8 lg:p-10 transition-all duration-500 ${tier.borderColor} ${tier.glowColor} hover:-translate-y-2 group h-full flex flex-col border border-gold/[0.08]`}
      >
        {/* Popular Badge */}
        {tier.popular && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 sm:px-4 py-1 bg-gold text-void text-[9px] sm:text-[10px] font-body tracking-[0.2em] sm:tracking-[0.3em] uppercase rounded-full whitespace-nowrap">
            Most Popular
          </div>
        )}

        {/* Icon */}
        <div className={`${tier.color} mb-4 sm:mb-6 opacity-60 group-hover:opacity-100 transition-opacity duration-300`}>
          {tier.icon}
        </div>

        {/* Tier Label */}
        <span className={`text-[9px] sm:text-[10px] font-body tracking-[0.3em] sm:tracking-[0.4em] uppercase ${tier.color} opacity-70`}>
          {tier.tier} Tier
        </span>

        {/* Name */}
        <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-light text-white mt-2 mb-3 sm:mb-4">
          {tier.name}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-1 mb-6 sm:mb-8">
          <span className={`font-display text-3xl sm:text-4xl font-light ${tier.color}`}>
            PKR {displayPrice}
          </span>
          <span className="text-white/30 text-[10px] sm:text-xs font-body">/month</span>
        </div>

        {/* Divider */}
        <div className={`w-full h-px opacity-10 mb-6 sm:mb-8 bg-current ${tier.color}`} />

        {/* Features */}
        <ul className="space-y-3 sm:space-y-4 flex-1">
          {tier.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 sm:gap-3">
              <svg
                className={`w-4 h-4 mt-0.5 ${tier.color} opacity-60 shrink-0`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-xs sm:text-sm font-body font-light text-white/60">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          onClick={handleSelect}
          className={`mt-6 sm:mt-8 block w-full text-center py-3 sm:py-4 border ${tier.borderColor} ${tier.color} text-[10px] sm:text-xs font-body tracking-[0.2em] sm:tracking-[0.25em] uppercase rounded-lg hover:bg-white/5 transition-all duration-300 min-h-[44px] flex items-center justify-center`}
        >
          Select {tier.tier}
        </button>
      </div>
    </div>
  );
}

export default function Membership() {
  const { ref: headerRef, isInView: headerInView } = useInView();
  const [pricing, setPricing] = useState<Pricing[]>([]);

  useEffect(() => {
    const unsubscribe = subscribePricing((data) => {
      const membershipPricing = data.filter(p => p.category === 'membership' && p.isActive);
      setPricing(membershipPricing);
    });

    return () => unsubscribe();
  }, []);

  // Map dynamic pricing to tiers
  const getDynamicPrice = (tierName: string): number | undefined => {
    const match = pricing.find(p => p.name.toLowerCase().includes(tierName.toLowerCase()));
    return match?.price;
  };

  return (
    <section id="vault" className="relative py-20 sm:py-28 lg:py-36 px-4 sm:px-6 overflow-hidden">
      {/* Parallax Background: Luxury leather snooker club lounge */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(./images/lounge-leather.jpg)',
          }}
        />
        {/* Heavy dark overlay to keep cards readable */}
        <div className="absolute inset-0 bg-void/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-void via-transparent to-void" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div
            className={`opacity-0 ${headerInView ? 'animate-fade-up' : ''}`}
            style={{ animationFillMode: 'forwards' }}
          >
            <span className="text-[9px] sm:text-[10px] font-body tracking-[0.4em] sm:tracking-[0.5em] uppercase text-gold/60">
              Exclusive Access
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-white mt-3 sm:mt-4">
              The <span className="text-gold-gradient italic">Vault</span>
            </h2>
            <p className="font-body font-light text-sm sm:text-base text-white/40 mt-4 sm:mt-6 max-w-md sm:max-w-lg mx-auto leading-relaxed px-4">
              Three tiers of excellence. Choose the membership that matches your ambition.
            </p>
          </div>
        </div>

        {/* Tier Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {defaultTiers.map((tier, i) => (
            <TierCard 
              key={tier.tier} 
              tier={tier} 
              index={i} 
              dynamicPrice={getDynamicPrice(tier.tier)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
