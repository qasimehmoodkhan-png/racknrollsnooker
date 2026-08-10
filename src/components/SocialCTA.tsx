import { useInView } from '../hooks/useInView';
import { SOCIAL_LINKS } from '../lib/constants';

export default function SocialCTA() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-void overflow-hidden">
      {/* Subtle border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />

      <div
        ref={ref}
        className={`relative max-w-4xl mx-auto text-center opacity-0 ${isInView ? 'animate-fade-up' : ''}`}
        style={{ animationFillMode: 'forwards' }}
      >
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-gold/20 bg-gold/5 mb-6">
          <svg className="w-8 h-8 text-gold/70" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
        </div>

        {/* Title */}
        <span className="text-[9px] sm:text-[10px] font-body tracking-[0.4em] sm:tracking-[0.5em] uppercase text-gold/60 block mb-3">
          Exclusive Community
        </span>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-4">
          Join the <span className="text-gold-gradient italic">Inner Circle</span>
        </h2>
        <p className="font-body font-light text-sm sm:text-base text-white/40 max-w-lg mx-auto leading-relaxed mb-8">
          Get exclusive tournament updates, live stream announcements, and member-only content.
          Be the first to know about championship events and special offers.
        </p>

        {/* Facebook CTA Button */}
        <a
          href={SOCIAL_LINKS.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 border border-gold/40 rounded-lg text-gold hover:bg-gold/10 transition-all duration-300 overflow-hidden"
        >
          {/* Pulse animation background */}
          <span className="absolute inset-0 rounded-lg animate-pulse-gold opacity-50" />
          
          {/* Facebook icon with blue glow on hover */}
          <span className="relative w-6 h-6 flex items-center justify-center group-hover:drop-shadow-[0_0_8px_rgba(24,119,242,0.8)] transition-all duration-300">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </span>
          
          <span className="relative text-xs sm:text-sm font-body tracking-[0.15em] sm:tracking-[0.2em] uppercase">
            Follow us for Tournament Live Streams
          </span>

          {/* Arrow */}
          <svg className="relative w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>

        {/* Social proof */}
        <p className="font-body text-[10px] sm:text-xs text-white/20 tracking-widest uppercase mt-6">
          Join 5,000+ snooker enthusiasts
        </p>
      </div>
    </section>
  );
}
