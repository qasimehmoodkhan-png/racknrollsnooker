import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside or pressing escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const links = [
    { label: 'The Arena', href: '#hero' },
    { label: 'Memberships', href: '#vault' },
    { label: 'Tournaments', href: '#tournaments' },
    { label: 'Locations', href: '#locations' },
    { label: 'Reviews', href: '#testimonials' },
    { label: 'Concierge', href: '#concierge' },
  ];

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 w-[calc(100%-2rem)] max-w-4xl ${
          scrolled
            ? 'glass-nav rounded-full px-4 sm:px-8 py-3 shadow-2xl shadow-black/50'
            : 'bg-transparent px-4 sm:px-8 py-5'
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2 sm:gap-3 shrink-0">
            <img
              src="/images/logo.png"
              alt="Rack N Roll Logo"
              className="h-10 w-auto"
            />
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[10px] xl:text-xs font-body font-light tracking-[0.15em] xl:tracking-[0.2em] uppercase text-white/60 hover:text-gold transition-colors duration-300 whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#concierge"
            className="hidden lg:block px-4 xl:px-5 py-2 bg-gold/10 border border-gold/40 rounded-full text-gold text-[10px] xl:text-xs font-body tracking-widest uppercase hover:bg-gold hover:text-void transition-all duration-300 whitespace-nowrap"
          >
            Book Now
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 text-gold min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setMenuOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-void/95 backdrop-blur-md animate-fade-in" />
          
          {/* Menu Content */}
          <div 
            className="relative z-10 flex flex-col items-center justify-center h-full p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center gap-6">
              {links.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-lg font-display font-light tracking-[0.2em] uppercase text-white/70 hover:text-gold transition-colors duration-300 animate-fade-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#concierge"
                onClick={() => setMenuOpen(false)}
                className="mt-6 px-8 py-4 bg-gold text-void text-sm font-body tracking-widest uppercase rounded-full animate-fade-up min-h-[48px] flex items-center"
                style={{ animationDelay: '300ms' }}
              >
                Book Now
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
