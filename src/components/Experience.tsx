import { useInView } from '../hooks/useInView';

export default function Experience() {
  const { ref: headerRef, isInView: headerInView } = useInView();
  const { ref: imageRef, isInView: imageInView } = useInView(0.1);
  const { ref: statsRef, isInView: statsInView } = useInView(0.1);

  const stats = [
    { value: '12', label: 'Tournament Tables' },
    { value: '45mm', label: 'Italian Slate' },
    { value: '24/7', label: 'Platinum Access' },
    { value: '100%', label: 'Flat Play Surface' },
  ];

  return (
    <section id="experience" className="relative py-20 sm:py-28 lg:py-36 px-4 sm:px-6 bg-void overflow-hidden">
      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 xl:gap-20 items-center">
          {/* Image: Red balls rack */}
          <div
            ref={imageRef}
            className={`opacity-0 ${imageInView ? 'animate-scale-in' : ''} order-2 lg:order-1`}
            style={{ animationFillMode: 'forwards' }}
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-gold/15 shadow-2xl shadow-black/50">
                <img
                  src="./images/red-rack.jpg"
                  alt="15 red snooker balls perfectly racked on the baize"
                  className="w-full h-64 sm:h-80 md:h-96 lg:h-[450px] xl:h-[500px] object-cover object-center"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/40 via-transparent to-transparent" />
                {/* Gold corner accents */}
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 w-6 sm:w-8 h-6 sm:h-8 border-l border-t border-gold/30" />
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 w-6 sm:w-8 h-6 sm:h-8 border-r border-t border-gold/30" />
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 w-6 sm:w-8 h-6 sm:h-8 border-l border-b border-gold/30" />
                <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 w-6 sm:w-8 h-6 sm:h-8 border-r border-b border-gold/30" />
              </div>
              {/* Floating accent card */}
              <div className="absolute -bottom-4 sm:-bottom-6 right-2 sm:-right-4 md:-right-6 glass rounded-lg sm:rounded-xl p-3 sm:p-5 border border-gold/15 animate-border-glow">
                <p className="font-display text-2xl sm:text-3xl text-gold font-light">147</p>
                <p className="text-[8px] sm:text-[9px] font-body tracking-[0.2em] sm:tracking-[0.3em] uppercase text-white/40 mt-0.5 sm:mt-1">Maximum Break</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div ref={headerRef} className="order-1 lg:order-2">
            <div
              className={`opacity-0 ${headerInView ? 'animate-fade-up' : ''}`}
              style={{ animationFillMode: 'forwards' }}
            >
              <span className="text-[9px] sm:text-[10px] font-body tracking-[0.4em] sm:tracking-[0.5em] uppercase text-gold/60">
                The Rack N Roll Experience
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-light text-white mt-3 sm:mt-4 leading-tight">
                Where Symmetry
                <br />
                Meets <span className="text-gold-gradient italic">Precision</span>
              </h2>
              <div className="w-12 sm:w-16 h-px bg-gold/30 mt-6 sm:mt-8 mb-6 sm:mb-8" />
              <p className="font-body font-light text-sm sm:text-base text-white/50 leading-relaxed mb-4 sm:mb-6">
                Every rack is set with geometric precision. Every table is leveled to tournament specification.
                At Rack N Roll, we don't just offer a game — we curate an experience that honors
                the 150-year legacy of cue sports.
              </p>
              <p className="font-body font-light text-sm sm:text-base text-white/50 leading-relaxed mb-8 sm:mb-10">
                From the moment you enter our doors, the atmosphere shifts.
                Dim overhead lights cast a warm glow across pristine green baize.
                The quiet click of phenolic resin. The focused silence before a century break.
                This is the arena.
              </p>

              {/* CTA */}
              <a
                href="#concierge"
                className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gold/10 border border-gold/30 text-gold text-[10px] sm:text-xs font-body tracking-[0.2em] sm:tracking-[0.25em] uppercase rounded-lg hover:bg-gold hover:text-void transition-all duration-300 min-h-[44px]"
              >
                <span>Experience It</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            {/* Stats */}
            <div
              ref={statsRef}
              className={`grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-10 sm:mt-14 pt-8 sm:pt-10 border-t border-white/[0.04] opacity-0 ${
                statsInView ? 'animate-fade-up' : ''
              }`}
              style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}
            >
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-2xl sm:text-3xl text-gold font-light">{stat.value}</p>
                  <p className="text-[9px] sm:text-[10px] font-body tracking-[0.15em] sm:tracking-[0.2em] uppercase text-white/30 mt-0.5 sm:mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
