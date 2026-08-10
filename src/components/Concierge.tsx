import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import { SOCIAL_LINKS } from '../lib/constants';

interface LocationData {
  id: string;
  name: string;
  shortName: string;
  address: string;
  area: string;
  mapSrc: string;
  bookingMessage: string;
}

const locationData: LocationData[] = [
  {
    id: 'bahria',
    name: 'Bahria Town',
    shortName: 'Bahria',
    address: 'Civic Center, Bahria Town',
    area: 'Islamabad',
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.846761263423!2d73.0479!3d33.5156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDMwJzU2LjIiTiA3M8KwMDInNTIuNCJF!5e0!3m2!1sen!2s!4v1',
    bookingMessage: 'I want to book at Bahria Flagship',
  },
  {
    id: 'dha',
    name: 'DHA Phase 2',
    shortName: 'DHA 2',
    address: 'Sector J, DHA Phase 2',
    area: 'Islamabad',
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.846761263423!2d73.1279!3d33.5356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDMyJzA4LjIiTiA3M8KwMDcnNDAuNCJF!5e0!3m2!1sen!2s!4v1',
    bookingMessage: 'I want to book at DHA GOLD',
  },
];

export default function Concierge() {
  const { ref: headerRef, isInView: headerInView } = useInView();
  const { ref: formRef, isInView: formInView } = useInView(0.05);
  const [activeLocation, setActiveLocation] = useState<string>('bahria');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    location: 'flagship',
    tier: 'standard',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getBookingMessage = () => {
    const locationNames: Record<string, string> = {
      flagship: 'Bahria Flagship',
      junior: 'Rack N Roll Jr.',
      gold: 'DHA GOLD',
    };
    const tierNames: Record<string, string> = {
      standard: 'Standard Table',
      vvip: 'VVIP Room',
      tournament: 'Tournament Table',
    };
    return encodeURIComponent(
      `Hello! I'd like to book a table at Rack N Roll.\n\n` +
      `Name: ${formData.name}\n` +
      `Phone: ${formData.phone}\n` +
      `Date: ${formData.date}\n` +
      `Time: ${formData.time}\n` +
      `Guests: ${formData.guests}\n` +
      `Location: ${locationNames[formData.location] || formData.location}\n` +
      `Table: ${tierNames[formData.tier] || formData.tier}`
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(`https://wa.me/${SOCIAL_LINKS.whatsappNumber}?text=${getBookingMessage()}`, '_blank');
  };

  const currentLocation = locationData.find(l => l.id === activeLocation) || locationData[0];

  return (
    <section id="concierge" className="relative py-20 sm:py-28 lg:py-36 px-4 sm:px-6 overflow-hidden">
      {/* Background: Subtle snooker lounge wide shot */}
      <div className="absolute inset-0 z-0">
        <img
          src="./images/snooker-lounge-wide.jpg"
          alt=""
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-void/90" />
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
              Reserve Your Experience
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-white mt-3 sm:mt-4">
              The <span className="text-gold-gradient italic">Concierge</span>
            </h2>
            <p className="font-body font-light text-sm sm:text-base text-white/40 mt-4 sm:mt-6 max-w-md sm:max-w-lg mx-auto leading-relaxed px-4">
              Your table awaits at any of our three premier locations.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
          {/* Booking Form */}
          <div
            ref={formRef}
            className={`opacity-0 ${formInView ? 'animate-fade-up' : ''}`}
            style={{ animationFillMode: 'forwards' }}
          >
            <form onSubmit={handleSubmit} className="glass rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12 border border-gold/10">
              <h3 className="font-display text-xl sm:text-2xl text-white mb-6 sm:mb-8">Book a Table</h3>

              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="text-[9px] sm:text-[10px] font-body tracking-[0.2em] sm:tracking-[0.3em] uppercase text-white/40 block mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-sm font-body font-light text-white placeholder-white/20 focus:border-gold/40 focus:outline-none transition-colors min-h-[44px]"
                    required
                  />
                </div>
                <div>
                  <label className="text-[9px] sm:text-[10px] font-body tracking-[0.2em] sm:tracking-[0.3em] uppercase text-white/40 block mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+92 300 000 0000"
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-sm font-body font-light text-white placeholder-white/20 focus:border-gold/40 focus:outline-none transition-colors min-h-[44px]"
                    required
                  />
                </div>
                <div>
                  <label className="text-[9px] sm:text-[10px] font-body tracking-[0.2em] sm:tracking-[0.3em] uppercase text-white/40 block mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-sm font-body font-light text-white focus:border-gold/40 focus:outline-none transition-colors [color-scheme:dark] min-h-[44px]"
                    required
                  />
                </div>
                <div>
                  <label className="text-[9px] sm:text-[10px] font-body tracking-[0.2em] sm:tracking-[0.3em] uppercase text-white/40 block mb-2">
                    Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-sm font-body font-light text-white focus:border-gold/40 focus:outline-none transition-colors [color-scheme:dark] min-h-[44px]"
                    required
                  />
                </div>
                <div>
                  <label className="text-[9px] sm:text-[10px] font-body tracking-[0.2em] sm:tracking-[0.3em] uppercase text-white/40 block mb-2">
                    Guests
                  </label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-sm font-body font-light text-white focus:border-gold/40 focus:outline-none transition-colors [color-scheme:dark] appearance-none min-h-[44px]"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n} value={n} className="bg-void text-white">
                        {n} {n === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[9px] sm:text-[10px] font-body tracking-[0.2em] sm:tracking-[0.3em] uppercase text-white/40 block mb-2">
                    Location
                  </label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-sm font-body font-light text-white focus:border-gold/40 focus:outline-none transition-colors [color-scheme:dark] appearance-none min-h-[44px]"
                  >
                    <option value="flagship" className="bg-void text-white">Flagship – Bahria Town</option>
                    <option value="junior" className="bg-void text-white">Junior Arena – Bahria Town</option>
                    <option value="gold" className="bg-void text-white">GOLD – DHA Phase 2</option>
                  </select>
                </div>
              </div>

              {/* Table Tier - Full Width */}
              <div className="mt-4 sm:mt-6">
                <label className="text-[9px] sm:text-[10px] font-body tracking-[0.2em] sm:tracking-[0.3em] uppercase text-white/40 block mb-2">
                  Table Tier
                </label>
                <select
                  name="tier"
                  value={formData.tier}
                  onChange={handleChange}
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-sm font-body font-light text-white focus:border-gold/40 focus:outline-none transition-colors [color-scheme:dark] appearance-none min-h-[44px]"
                >
                  <option value="standard" className="bg-void text-white">Standard Table</option>
                  <option value="vvip" className="bg-void text-white">VVIP Room</option>
                  <option value="tournament" className="bg-void text-white">Tournament Table</option>
                </select>
              </div>

              <button
                type="submit"
                className="mt-6 sm:mt-8 w-full py-4 bg-gold text-void text-xs font-body font-medium tracking-[0.2em] sm:tracking-[0.25em] uppercase hover:bg-gold-light transition-all duration-300 rounded-lg hover:shadow-lg hover:shadow-gold/20 min-h-[48px] flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>Confirm via WhatsApp</span>
              </button>
            </form>
          </div>

          {/* Map + Info */}
          <div
            className={`opacity-0 ${formInView ? 'animate-fade-up' : ''}`}
            style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
          >
            {/* Map with Tabs */}
            <div className="glass rounded-xl sm:rounded-2xl overflow-hidden border border-gold/10 mb-6 sm:mb-8">
              {/* Location Tabs */}
              <div className="flex border-b border-white/[0.06]">
                {locationData.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => setActiveLocation(loc.id)}
                    className={`flex-1 px-4 py-3 sm:py-4 text-xs sm:text-sm font-body tracking-[0.1em] sm:tracking-[0.15em] uppercase transition-all duration-300 min-h-[44px] ${
                      activeLocation === loc.id
                        ? 'text-gold bg-gold/10 border-b-2 border-gold'
                        : 'text-white/40 hover:text-white/60 hover:bg-white/[0.02]'
                    }`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {loc.shortName}
                    </span>
                  </button>
                ))}
              </div>

              {/* Map Embed */}
              <div className="relative h-56 sm:h-72 lg:h-80 bg-void-lighter">
                <iframe
                  title={`${currentLocation.name} Location`}
                  src={currentLocation.mapSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) saturate(0.3) brightness(0.6)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                {/* Gold pin overlay */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full z-10 pointer-events-none">
                  <div className="relative">
                    <div className="w-4 h-4 bg-gold rounded-full animate-pulse-gold" />
                    <div className="w-2 h-2 bg-gold/50 rounded-full mx-auto mt-0.5" />
                  </div>
                </div>
              </div>

              {/* Current Location Info */}
              <div className="p-4 bg-white/[0.02]">
                <p className="font-body text-sm text-white/70">{currentLocation.address}</p>
                <p className="font-body text-xs text-gold/50">{currentLocation.area}</p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="glass rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-gold/10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                <div>
                  <span className="text-[9px] sm:text-[10px] font-body tracking-[0.2em] sm:tracking-[0.3em] uppercase text-gold/60 block mb-2">
                    General Inquiries
                  </span>
                  <a href={`tel:${SOCIAL_LINKS.phone.replace(/\s/g, '')}`} className="font-body font-light text-white/60 text-sm hover:text-gold transition-colors">
                    {SOCIAL_LINKS.phone}
                  </a>
                </div>
                <div>
                  <span className="text-[9px] sm:text-[10px] font-body tracking-[0.2em] sm:tracking-[0.3em] uppercase text-gold/60 block mb-2">
                    Email
                  </span>
                  <a href={`mailto:${SOCIAL_LINKS.email}`} className="font-body font-light text-white/60 text-sm hover:text-gold transition-colors">
                    {SOCIAL_LINKS.email}
                  </a>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-[9px] sm:text-[10px] font-body tracking-[0.2em] sm:tracking-[0.3em] uppercase text-gold/60 block mb-2">
                    Hours
                  </span>
                  <p className="font-body font-light text-white/60 text-sm">
                    Mon – Sun: 12:00 PM – 2:00 AM
                    <span className="mx-2 text-gold/30">|</span>
                    <span className="text-gold/50">Platinum Members: 24/7 Access</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
