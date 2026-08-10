import { useInView } from '../hooks/useInView';
import { SOCIAL_LINKS } from '../lib/constants';

interface Location {
  id: string;
  name: string;
  title: string;
  address: string;
  area: string;
  highlight: string;
  features: string[];
  tier: 'flagship' | 'junior' | 'gold';
  bookingMessage: string;
}

const locations: Location[] = [
  {
    id: 'flagship',
    name: 'The Flagship',
    title: 'Rack N Roll – Flagship',
    address: 'Civic Center, Bahria Town',
    area: 'Islamabad',
    highlight: 'Professional Tournament Grade Tables & Full Café',
    features: ['12 Tournament Tables', 'Full-Service Café', 'Pro Shop', 'Coaching Available'],
    tier: 'flagship',
    bookingMessage: 'I want to book at Bahria Flagship',
  },
  {
    id: 'junior',
    name: 'The Junior Arena',
    title: 'Rack N Roll Jr.',
    address: 'Civic Center, Bahria Town',
    area: 'Islamabad',
    highlight: 'Casual Play & Youth-Centric Ambiance',
    features: ['8 Standard Tables', 'Gaming Lounge', 'Snack Bar', 'Student Discounts'],
    tier: 'junior',
    bookingMessage: 'I want to book at Rack N Roll Jr.',
  },
  {
    id: 'gold',
    name: 'The Gold Standard',
    title: 'Rack N Roll GOLD',
    address: 'Sector J, DHA Phase 2',
    area: 'Islamabad',
    highlight: 'Ultra-Exclusive VVIP Suites & Premium Experience',
    features: ['6 VVIP Suites', 'Private Lounges', 'Concierge Service', '24/7 Access'],
    tier: 'gold',
    bookingMessage: 'I want to book at DHA GOLD',
  },
];

function LocationCard({ location, index }: { location: Location; index: number }) {
  const { ref, isInView } = useInView(0.1);
  
  const isGold = location.tier === 'gold';
  const isJunior = location.tier === 'junior';

  const bookingUrl = `https://wa.me/${SOCIAL_LINKS.whatsappNumber}?text=${encodeURIComponent(location.bookingMessage)}`;

  return (
    <div
      ref={ref}
      className={`opacity-0 ${isInView ? 'animate-fade-up' : ''}`}
      style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}
    >
      <div
        className={`relative h-full glass rounded-xl sm:rounded-2xl p-6 sm:p-8 border transition-all duration-500 hover:-translate-y-2 group flex flex-col ${
          isGold
            ? 'border-gold/40 shadow-[0_0_30px_rgba(197,160,89,0.15)] hover:shadow-[0_0_50px_rgba(197,160,89,0.25)] animate-border-glow'
            : 'border-white/[0.08] hover:border-gold/25'
        }`}
      >
        {/* Premium Badge for Gold */}
        {isGold && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gold text-void text-[9px] sm:text-[10px] font-body tracking-[0.2em] sm:tracking-[0.3em] uppercase rounded-full whitespace-nowrap">
            Most Exclusive
          </div>
        )}

        {/* Tier Icon */}
        <div className={`mb-4 sm:mb-6 ${isGold ? 'text-gold' : isJunior ? 'text-silver' : 'text-gold/70'}`}>
          {isGold ? (
            <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}>
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ) : isJunior ? (
            <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}>
              <circle cx="12" cy="12" r="10" />
              <path d="M8 14s1.5 2 4 2 4-2 4-2" />
              <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth={2} />
              <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth={2} />
            </svg>
          ) : (
            <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}>
              <path d="M2 4l3 12h14l3-12-6 7-4-9-4 9-6-7z" />
              <path d="M3 20h18" />
            </svg>
          )}
        </div>

        {/* Location Label */}
        <span className={`text-[9px] sm:text-[10px] font-body tracking-[0.3em] sm:tracking-[0.4em] uppercase ${
          isGold ? 'text-gold' : 'text-gold/60'
        }`}>
          {location.name}
        </span>

        {/* Title */}
        <h3 className={`font-display text-2xl sm:text-3xl font-light mt-2 mb-3 ${
          isGold ? 'text-gold-gradient' : 'text-white'
        }`}>
          {location.title}
        </h3>

        {/* Address */}
        <div className="flex items-start gap-2 mb-4">
          <svg className="w-4 h-4 text-gold/50 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <div>
            <p className="font-body text-sm text-white/60">{location.address}</p>
            <p className="font-body text-xs text-white/40">{location.area}</p>
          </div>
        </div>

        {/* Highlight */}
        <p className="font-body font-light text-sm sm:text-base text-white/50 leading-relaxed mb-6">
          {location.highlight}
        </p>

        {/* Features */}
        <ul className="space-y-2 mb-6 flex-1">
          {location.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2">
              <svg className={`w-4 h-4 shrink-0 ${isGold ? 'text-gold' : 'text-gold/50'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-body text-xs sm:text-sm text-white/50">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-auto w-full text-center py-3 sm:py-4 rounded-lg text-xs font-body tracking-[0.2em] sm:tracking-[0.25em] uppercase transition-all duration-300 min-h-[44px] flex items-center justify-center gap-2 ${
            isGold
              ? 'bg-gold text-void hover:bg-gold-light hover:shadow-lg hover:shadow-gold/30'
              : 'border border-gold/30 text-gold hover:bg-gold/10'
          }`}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          <span>Book at {location.name.replace('The ', '')}</span>
        </a>

        {/* Gold corner accents for Gold tier */}
        {isGold && (
          <>
            <div className="absolute top-3 left-3 w-6 h-6 border-l border-t border-gold/40" />
            <div className="absolute top-3 right-3 w-6 h-6 border-r border-t border-gold/40" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-l border-b border-gold/40" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-r border-b border-gold/40" />
          </>
        )}
      </div>
    </div>
  );
}

export default function Locations() {
  const { ref: headerRef, isInView: headerInView } = useInView();

  return (
    <section id="locations" className="relative py-20 sm:py-28 lg:py-36 px-4 sm:px-6 bg-void overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-baize/5 via-transparent to-baize/5 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div
            className={`opacity-0 ${headerInView ? 'animate-fade-up' : ''}`}
            style={{ animationFillMode: 'forwards' }}
          >
            <span className="text-[9px] sm:text-[10px] font-body tracking-[0.4em] sm:tracking-[0.5em] uppercase text-gold/60">
              Three Destinations, One Standard
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-white mt-3 sm:mt-4">
              Our Premier <span className="text-gold-gradient italic">Arenas</span>
            </h2>
            <p className="font-body font-light text-sm sm:text-base text-white/40 mt-4 sm:mt-6 max-w-md sm:max-w-lg mx-auto leading-relaxed px-4">
              From casual play to ultra-exclusive VVIP experiences, choose the arena that matches your game.
            </p>
          </div>
        </div>

        {/* Location Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {locations.map((location, i) => (
            <LocationCard key={location.id} location={location} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
