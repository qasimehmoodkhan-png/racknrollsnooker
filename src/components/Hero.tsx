import { useState, useEffect } from 'react';

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen min-h-[100dvh] w-full overflow-hidden">
      {/* Cinematic Snooker Table Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="./images/hero-snooker.jpg"
          alt="Professional snooker table under vintage canopy light"
          className="w-full h-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
        />
        {/* 40% darkness overlay so gold text pops */}
        <div className="absolute inset-0 bg-void/40" />
        {/* Gradient vignette for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-void/50 via-transparent to-void/50" />
        {/* Subtle animated shimmer */}
        <div className="absolute inset-0 animate-shimmer opacity-30" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full min-h-screen min-h-[100dvh] flex flex-col items-center justify-center px-4 sm:px-6 text-center pt-20 pb-24">
        {/* Decorative Line */}
        <div
          className={`transition-all duration-1000 ease-out ${
            loaded ? 'w-16 sm:w-20 opacity-100' : 'w-0 opacity-0'
          } h-px bg-gradient-to-r from-transparent via-gold to-transparent mb-6 sm:mb-8`}
        />

        {/* Overline */}
        <p
          className={`font-body text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase text-gold/90 mb-4 sm:mb-6 transition-all duration-700 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          Islamabad's Premier Cue Sports
        </p>

        {/* Main Headline */}
        <h1
          className={`font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-light tracking-tight leading-[0.95] text-white transition-all duration-1000 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          THE ART OF
          <br />
          <span className="text-gold-gradient font-medium italic">the Game</span>
        </h1>

        {/* Subtitle */}
        <p
          className={`font-body font-light text-sm sm:text-base lg:text-lg text-white/60 mt-6 sm:mt-8 max-w-md sm:max-w-lg leading-relaxed transition-all duration-700 px-4 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '900ms' }}
        >
          Precision in Every Stroke. Luxury in Every Detail.
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>Experience the pinnacle of cue sports.
        </p>

        {/* CTAs */}
        <div
          className={`flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 sm:mt-12 w-full sm:w-auto px-4 sm:px-0 transition-all duration-700 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '1200ms' }}
        >
          <a
            href="#concierge"
            className="px-8 sm:px-10 py-4 bg-gold text-void font-body text-xs font-medium tracking-[0.2em] sm:tracking-[0.25em] uppercase hover:bg-gold-light transition-all duration-300 hover:shadow-lg hover:shadow-gold/30 text-center min-h-[48px] flex items-center justify-center"
          >
            Book a Table
          </a>
          <a
            href="#vault"
            className="px-8 sm:px-10 py-4 border border-gold/50 text-gold font-body text-xs font-medium tracking-[0.2em] sm:tracking-[0.25em] uppercase hover:bg-gold/10 transition-all duration-300 text-center min-h-[48px] flex items-center justify-center"
          >
            View Memberships
          </a>
        </div>

        {/* Scroll Indicator - Hidden on very small screens */}
        <div
          className={`absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 sm:gap-3 transition-all duration-700 hidden sm:flex ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '1800ms' }}
        >
          <span className="text-[9px] sm:text-[10px] font-body tracking-[0.3em] uppercase text-white/30">
            Scroll to Explore
          </span>
          <div className="w-px h-8 sm:h-10 bg-gradient-to-b from-gold/60 to-transparent animate-float" />
        </div>
      </div>

      {/* Corner Accents - Smaller on mobile */}
      <div className="absolute top-4 sm:top-8 left-4 sm:left-8 w-8 sm:w-12 h-8 sm:h-12 border-l border-t border-gold/30 z-10" />
      <div className="absolute top-4 sm:top-8 right-4 sm:right-8 w-8 sm:w-12 h-8 sm:h-12 border-r border-t border-gold/30 z-10" />
      <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 w-8 sm:w-12 h-8 sm:h-12 border-l border-b border-gold/30 z-10" />
      <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 w-8 sm:w-12 h-8 sm:h-12 border-r border-b border-gold/30 z-10" />
    </section>
  );
}
