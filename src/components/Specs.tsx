import { useInView } from '../hooks/useInView';

const specs = [
  {
    title: 'The Slate',
    subtitle: '45mm Italian Slate',
    description: 'Precision-machined for 100% flat play. The foundation of professional-grade performance.',
    icon: (
      <svg className="w-8 sm:w-10 h-8 sm:h-10" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={0.8}>
        <rect x="4" y="12" width="40" height="24" rx="2" />
        <line x1="4" y1="18" x2="44" y2="18" />
        <line x1="4" y1="30" x2="44" y2="30" />
        <circle cx="24" cy="24" r="3" />
      </svg>
    ),
  },
  {
    title: 'The Cloth',
    subtitle: 'Strachan 6811',
    description: 'West of England tournament-grade cloth. Engineered for unmatched ball roll consistency.',
    icon: (
      <svg className="w-8 sm:w-10 h-8 sm:h-10" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={0.8}>
        <path d="M8 8 L40 8 L44 16 L44 40 L4 40 L4 16 Z" />
        <line x1="4" y1="16" x2="44" y2="16" />
        <path d="M16 16 v24" strokeDasharray="2 2" />
        <path d="M32 16 v24" strokeDasharray="2 2" />
      </svg>
    ),
  },
  {
    title: 'The Rails',
    subtitle: 'Steel-Block Cushions',
    description: 'Maximum rebound accuracy with steel-block engineered cushions for true, predictable bounce.',
    icon: (
      <svg className="w-8 sm:w-10 h-8 sm:h-10" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={0.8}>
        <rect x="6" y="6" width="36" height="36" rx="1" />
        <rect x="10" y="10" width="28" height="28" rx="1" />
        <circle cx="24" cy="24" r="2" />
        <line x1="14" y1="14" x2="20" y2="20" />
        <circle cx="14" cy="14" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: 'The Balls',
    subtitle: 'Aramith Pro-Cup',
    description: 'Tournament-standard phenolic resin balls. Precision-weighted for flawless action.',
    icon: (
      <svg className="w-8 sm:w-10 h-8 sm:h-10" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={0.8}>
        <circle cx="18" cy="28" r="8" />
        <circle cx="30" cy="28" r="8" />
        <circle cx="24" cy="18" r="8" />
      </svg>
    ),
  },
  {
    title: 'The Lighting',
    subtitle: 'Tournament LED Arrays',
    description: 'Shadow-free, color-accurate illumination across every inch of the playing surface.',
    icon: (
      <svg className="w-8 sm:w-10 h-8 sm:h-10" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={0.8}>
        <path d="M24 4 L28 18 L42 18 L30 26 L34 40 L24 30 L14 40 L18 26 L6 18 L20 18 Z" />
      </svg>
    ),
  },
  {
    title: 'The Climate',
    subtitle: 'Precision HVAC',
    description: 'Constant 21°C and 45% humidity — lab-grade conditions for optimal cloth performance.',
    icon: (
      <svg className="w-8 sm:w-10 h-8 sm:h-10" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={0.8}>
        <rect x="18" y="6" width="12" height="30" rx="6" />
        <circle cx="24" cy="30" r="4" fill="currentColor" />
        <line x1="24" y1="30" x2="24" y2="14" strokeWidth={2} />
        <line x1="32" y1="14" x2="36" y2="14" />
        <line x1="32" y1="20" x2="36" y2="20" />
        <line x1="32" y1="26" x2="34" y2="26" />
      </svg>
    ),
  },
];

function SpecCard({ spec, index }: { spec: typeof specs[0]; index: number }) {
  const { ref, isInView } = useInView(0.1);

  return (
    <div
      ref={ref}
      className={`opacity-0 ${isInView ? 'animate-fade-up' : ''}`}
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
    >
      <div className="group relative p-5 sm:p-8 lg:p-10 border border-gold/[0.08] rounded-xl hover:border-gold/25 transition-all duration-500 bg-white/[0.01] hover:bg-white/[0.03]">
        {/* Number */}
        <span className="absolute top-3 sm:top-4 right-3 sm:right-4 text-[9px] sm:text-[10px] font-body tracking-widest text-gold/15">
          0{index + 1}
        </span>

        {/* Icon */}
        <div className="text-gold/40 group-hover:text-gold/90 transition-colors duration-500 mb-4 sm:mb-6">
          {spec.icon}
        </div>

        {/* Content */}
        <h3 className="font-display text-xl sm:text-2xl font-light text-white mb-1">{spec.title}</h3>
        <p className="text-[10px] sm:text-xs font-body tracking-[0.15em] sm:tracking-[0.2em] uppercase text-gold/70 mb-3 sm:mb-4">{spec.subtitle}</p>
        <p className="font-body font-light text-xs sm:text-sm text-white/40 leading-relaxed">{spec.description}</p>

        {/* Bottom accent */}
        <div className="absolute bottom-0 left-6 sm:left-10 right-6 sm:right-10 h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent group-hover:via-gold/30 transition-all duration-500" />
      </div>
    </div>
  );
}

export default function Specs() {
  const { ref: headerRef, isInView: headerInView } = useInView();
  const { ref: imageRef, isInView: imageInView } = useInView(0.1);

  return (
    <section id="specs" className="relative py-20 sm:py-28 lg:py-36 px-4 sm:px-6 bg-void overflow-hidden">
      {/* Background: Cue impact macro photo — very subtle */}
      <div className="absolute inset-0 opacity-[0.04]">
        <img
          src="./images/cue-impact.jpg"
          alt=""
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 bg-void/95" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-10 sm:mb-16">
          <div
            className={`opacity-0 ${headerInView ? 'animate-fade-up' : ''}`}
            style={{ animationFillMode: 'forwards' }}
          >
            <span className="text-[9px] sm:text-[10px] font-body tracking-[0.4em] sm:tracking-[0.5em] uppercase text-gold/60">
              Engineering Excellence
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-white mt-3 sm:mt-4">
              The <span className="text-gold-gradient italic">Engineering</span> Suite
            </h2>
            <p className="font-body font-light text-sm sm:text-base text-white/40 mt-4 sm:mt-6 max-w-md sm:max-w-lg mx-auto leading-relaxed px-4">
              Every component hand-selected. Every surface precision-calibrated.
              <br className="hidden sm:block" />This is transparency meets authority.
            </p>
          </div>
        </div>

        {/* Hero Image: Cue tip impacting white ball */}
        <div
          ref={imageRef}
          className={`mb-10 sm:mb-16 opacity-0 ${imageInView ? 'animate-scale-in' : ''}`}
          style={{ animationFillMode: 'forwards' }}
        >
          <div className="relative max-w-4xl mx-auto rounded-xl sm:rounded-2xl overflow-hidden border border-gold/15 shadow-2xl shadow-black/50">
            <img
              src="./images/cue-impact.jpg"
              alt="Macro shot of cue tip striking the white ball with chalk dust"
              className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover object-center"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
              <p className="font-display text-lg sm:text-xl md:text-2xl text-white/90">Precision at the Point of Impact</p>
              <p className="font-body text-[10px] sm:text-xs text-gold/60 tracking-[0.15em] sm:tracking-[0.2em] uppercase mt-1">
                High-speed photography · 1/10,000s
              </p>
            </div>
            {/* Gold corner accents */}
            <div className="absolute top-2 sm:top-3 left-2 sm:left-3 w-4 sm:w-6 h-4 sm:h-6 border-l border-t border-gold/30" />
            <div className="absolute top-2 sm:top-3 right-2 sm:right-3 w-4 sm:w-6 h-4 sm:h-6 border-r border-t border-gold/30" />
            <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 w-4 sm:w-6 h-4 sm:h-6 border-l border-b border-gold/30" />
            <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 w-4 sm:w-6 h-4 sm:h-6 border-r border-b border-gold/30" />
          </div>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {specs.map((spec, i) => (
            <SpecCard key={spec.title} spec={spec} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className={`text-center mt-10 sm:mt-16 opacity-0 ${headerInView ? 'animate-fade-up' : ''}`}
          style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}
        >
          <a
            href="#concierge"
            className="inline-flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs font-body tracking-[0.2em] sm:tracking-[0.3em] uppercase text-gold/60 hover:text-gold transition-colors duration-300 min-h-[44px]"
          >
            <span>Schedule a Private Tour</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
