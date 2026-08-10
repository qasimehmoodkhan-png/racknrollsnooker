import { SOCIAL_LINKS, LOCATIONS } from '../lib/constants';

export default function Footer() {
  return (
    <footer className="relative py-12 sm:py-16 px-4 sm:px-6 overflow-hidden">
      {/* Background: Dark desaturated baize cloth texture */}
      <div className="absolute inset-0 z-0">
        <img
          src="./images/baize-texture.jpg"
          alt=""
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
        {/* Heavy dark desaturation overlay */}
        <div className="absolute inset-0 bg-void/92" />
        <div className="absolute inset-0 bg-gradient-to-b from-void to-transparent opacity-80" />
      </div>
      
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-12 sm:mb-16">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full border border-gold/30 flex items-center justify-center">
                <span className="text-gold font-display text-base sm:text-lg font-bold">R</span>
              </div>
              <div>
                <span className="font-display text-lg sm:text-xl font-semibold tracking-wider text-white block">
                  RACK N ROLL
                </span>
                <span className="text-[8px] sm:text-[9px] font-body tracking-[0.3em] sm:tracking-[0.4em] uppercase text-gold/50">
                  Snooker Lounge
                </span>
              </div>
            </div>
            <p className="font-body font-light text-white/30 text-xs sm:text-sm leading-relaxed max-w-xs">
              Islamabad's premier cue sports destination. Where precision meets prestige.
            </p>
            
            {/* Social Icons Row */}
            <div className="flex items-center gap-3 mt-5">
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full border border-gold/30 flex items-center justify-center text-gold/60 hover:text-gold hover:border-gold/60 hover:bg-gold/10 hover:shadow-[0_0_15px_rgba(24,119,242,0.4)] transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-gold/30 flex items-center justify-center text-gold/60 hover:text-gold hover:border-gold/60 hover:bg-gold/10 hover:shadow-[0_0_15px_rgba(225,48,108,0.4)] transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full border border-gold/30 flex items-center justify-center text-gold/60 hover:text-gold hover:border-gold/60 hover:bg-gold/10 hover:shadow-[0_0_15px_rgba(37,211,102,0.4)] transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Visit Us - All Locations */}
          <div className="lg:col-span-1">
            <h4 className="text-[9px] sm:text-[10px] font-body tracking-[0.3em] sm:tracking-[0.4em] uppercase text-gold/60 mb-4 sm:mb-6">
              Visit Us
            </h4>
            <ul className="space-y-4">
              <li>
                <p className="font-body text-sm font-medium text-white/60">{LOCATIONS.flagship.name}</p>
                <p className="font-body text-xs text-white/40">{LOCATIONS.flagship.address}</p>
                <p className="font-body text-[10px] text-white/30">{LOCATIONS.flagship.area}</p>
              </li>
              <li>
                <p className="font-body text-sm font-medium text-white/60">{LOCATIONS.junior.name}</p>
                <p className="font-body text-xs text-white/40">{LOCATIONS.junior.address}</p>
                <p className="font-body text-[10px] text-white/30">{LOCATIONS.junior.area}</p>
              </li>
              <li>
                <p className="font-body text-sm font-medium text-gold">{LOCATIONS.gold.name}</p>
                <p className="font-body text-xs text-white/40">{LOCATIONS.gold.address}</p>
                <p className="font-body text-[10px] text-white/30">{LOCATIONS.gold.area}</p>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[9px] sm:text-[10px] font-body tracking-[0.3em] sm:tracking-[0.4em] uppercase text-gold/60 mb-4 sm:mb-6">
              Navigate
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { label: 'The Arena', href: '#hero' },
                { label: 'Memberships', href: '#vault' },
                { label: 'Locations', href: '#locations' },
                { label: 'Reviews', href: '#testimonials' },
                { label: 'Book a Table', href: '#concierge' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs sm:text-sm font-body font-light text-white/40 hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[9px] sm:text-[10px] font-body tracking-[0.3em] sm:tracking-[0.4em] uppercase text-gold/60 mb-4 sm:mb-6">
              Contact
            </h4>
            <ul className="space-y-3 sm:space-y-4">
              <li>
                <a href={`tel:${SOCIAL_LINKS.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-xs sm:text-sm font-body font-light text-white/40 hover:text-gold transition-colors duration-300">
                  <svg className="w-4 h-4 text-gold/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {SOCIAL_LINKS.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${SOCIAL_LINKS.email}`} className="flex items-center gap-2 text-xs sm:text-sm font-body font-light text-white/40 hover:text-gold transition-colors duration-300">
                  <svg className="w-4 h-4 text-gold/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {SOCIAL_LINKS.email}
                </a>
              </li>
              <li>
                <a 
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs sm:text-sm font-body font-light text-white/40 hover:text-gold transition-colors duration-300"
                >
                  <svg className="w-4 h-4 text-gold/50" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  /RackNRollSnooker
                </a>
              </li>
              <li>
                <a 
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs sm:text-sm font-body font-light text-white/40 hover:text-gold transition-colors duration-300"
                >
                  <svg className="w-4 h-4 text-gold/50" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                  </svg>
                  @racknrollsnooker
                </a>
              </li>
            </ul>
            
            {/* Hours */}
            <div className="mt-6">
              <p className="text-[9px] sm:text-[10px] font-body tracking-[0.2em] uppercase text-gold/40 mb-2">Hours</p>
              <p className="text-xs text-white/40">Mon – Sun: 12 PM – 2 AM</p>
              <p className="text-[10px] text-gold/40">Platinum: 24/7</p>
            </div>
          </div>
        </div>

        {/* Snooker balls decoration */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-8">
          <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-red-700/60 border border-red-600/40" />
          <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-yellow-500/60 border border-yellow-400/40" />
          <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-green-600/60 border border-green-500/40" />
          <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-amber-700/60 border border-amber-600/40" />
          <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-blue-600/60 border border-blue-500/40" />
          <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-pink-400/60 border border-pink-300/40" />
          <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-gray-900/80 border border-gray-700/40" />
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-[9px] sm:text-[10px] font-body tracking-widest text-white/20 uppercase text-center sm:text-left">
            © 2026 Rack N Roll. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4 sm:gap-6">
            <a href="/admin" className="text-[9px] sm:text-[10px] font-body tracking-widest text-white/20 uppercase hover:text-gold/50 transition-colors">
              Admin
            </a>
            <a href="#" className="text-[9px] sm:text-[10px] font-body tracking-widest text-white/20 uppercase hover:text-gold/50 transition-colors">
              Privacy
            </a>
            <a href="#" className="text-[9px] sm:text-[10px] font-body tracking-widest text-white/20 uppercase hover:text-gold/50 transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
