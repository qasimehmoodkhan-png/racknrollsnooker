import { useInView } from '../hooks/useInView';

const menuItems = [
  {
    image: '/images/rnr-1.png',
    title: 'Artisan Espresso',
    desc: 'Single-origin, precision-extracted',
    tall: true,
  },
  {
    image: '/images/rnr-2.png',
    title: 'Between the Frames',
    desc: 'Unwind with championship atmosphere',
    tall: false,
  },
  {
    image: '/images/rnr-3.png',
    title: 'The Ritual',
    desc: 'Chalk, focus, perfection',
    tall: true,
  },
  {
    image: './images/snooker-lounge-wide.jpg',
    title: 'The Lounge Experience',
    desc: 'Where luxury meets competition',
    tall: false,
  },
  {
    image: './images/snooker-player-shot.jpg',
    title: 'Precision in Play',
    desc: 'Tournament-grade tables, always',
    tall: false,
  },
  {
    image: './images/red-rack.jpg',
    title: 'The Perfect Rack',
    desc: '15 reds, zero compromise',
    tall: true,
  },
];

function BistroCard({ item, index }: { item: typeof menuItems[0]; index: number }) {
  const { ref, isInView } = useInView(0.05);

  return (
    <div
      ref={ref}
      className={`masonry-item opacity-0 ${isInView ? 'animate-scale-in' : ''}`}
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
    >
      <div className="group relative overflow-hidden rounded-lg sm:rounded-xl cursor-pointer border border-gold/10 hover:border-gold/30 transition-all duration-500">
        <img
          src={item.image}
          alt={item.title}
          className={`w-full object-cover object-center transition-transform duration-700 group-hover:scale-110 ${
            item.tall ? 'h-64 sm:h-80 lg:h-96' : 'h-48 sm:h-56 lg:h-64'
          }`}
          loading="lazy"
        />
        {/* Moody high-contrast overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          <h4 className="font-display text-lg sm:text-xl text-white">{item.title}</h4>
          <p className="font-body text-[10px] sm:text-xs text-gold/70 tracking-widest uppercase mt-1">{item.desc}</p>
        </div>

        {/* Gold corner accents */}
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 w-4 sm:w-6 h-4 sm:h-6 border-l border-t border-gold/0 group-hover:border-gold/40 transition-all duration-500" />
        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 w-4 sm:w-6 h-4 sm:h-6 border-r border-t border-gold/0 group-hover:border-gold/40 transition-all duration-500" />
        <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 w-4 sm:w-6 h-4 sm:h-6 border-l border-b border-gold/0 group-hover:border-gold/40 transition-all duration-500" />
        <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 w-4 sm:w-6 h-4 sm:h-6 border-r border-b border-gold/0 group-hover:border-gold/40 transition-all duration-500" />
      </div>
    </div>
  );
}

export default function Bistro() {
  const { ref: headerRef, isInView: headerInView } = useInView();

  return (
    <section id="bistro" className="relative py-20 sm:py-28 lg:py-36 px-4 sm:px-6 bg-void overflow-hidden">
      {/* Baize overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-baize/10 via-transparent to-baize/10 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div
            className={`opacity-0 ${headerInView ? 'animate-fade-up' : ''}`}
            style={{ animationFillMode: 'forwards' }}
          >
            <span className="text-[9px] sm:text-[10px] font-body tracking-[0.4em] sm:tracking-[0.5em] uppercase text-gold/60">
              The Signature Experience
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-white mt-3 sm:mt-4">
              The <span className="text-gold-gradient italic">Break</span>
            </h2>
            <p className="font-body font-light text-sm sm:text-base text-white/40 mt-4 sm:mt-6 max-w-md sm:max-w-lg mx-auto leading-relaxed px-4">
              A Social Hour Curated for the Elite.
              <br className="hidden sm:block" />Luxury lounge amenities between frames.
            </p>
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="masonry-grid">
          {menuItems.map((item, i) => (
            <BistroCard key={item.title} item={item} index={i} />
          ))}
        </div>

        {/* Bottom Note */}
        <div
          className={`text-center mt-10 sm:mt-16 opacity-0 ${headerInView ? 'animate-fade-up' : ''}`}
          style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}
        >
          <div className="inline-flex items-center gap-3 sm:gap-4">
            <div className="w-8 sm:w-12 h-px bg-gold/20" />
            <span className="text-[9px] sm:text-[10px] font-body tracking-[0.3em] sm:tracking-[0.4em] uppercase text-white/30 text-center">
              Full menu & gourmet refreshments available
            </span>
            <div className="w-8 sm:w-12 h-px bg-gold/20" />
          </div>
        </div>
      </div>
    </section>
  );
}
