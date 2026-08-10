import { useInView } from '../hooks/useInView';
import { SOCIAL_LINKS } from '../lib/constants';

const testimonials = [
  {
    name: 'Ahmed Khan',
    title: 'Gold Member',
    image: null,
    initials: 'AK',
    rating: 5,
    text: "The tables here are tournament-grade perfection. I've played at clubs across Pakistan, and Rack N Roll is simply unmatched. The Strachan cloth makes every shot feel like silk.",
  },
  {
    name: 'Bilal Rashid',
    title: 'Platinum Member',
    image: null,
    initials: 'BR',
    rating: 5,
    text: "24/7 access as a Platinum member has transformed my practice routine. The atmosphere at 2 AM is incredibly focused — just you, the table, and absolute silence. Worth every rupee.",
  },
  {
    name: 'Saad Malik',
    title: 'Tournament Champion',
    image: null,
    initials: 'SM',
    rating: 5,
    text: "Won my first century break here. The lighting, the climate control, the steel-block cushions — everything is calibrated for serious play. This isn't a pool hall, it's a proper arena.",
  },
  {
    name: 'Farhan Siddiqui',
    title: 'Gold Member',
    image: null,
    initials: 'FS',
    rating: 5,
    text: "The lounge experience is exceptional. Premium coffee between frames, leather seating, and a staff that understands the game. Brought international clients here — they were blown away.",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-gold' : 'text-white/10'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  const { ref, isInView } = useInView(0.1);

  return (
    <div
      ref={ref}
      className={`opacity-0 ${isInView ? 'animate-fade-up' : ''}`}
      style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}
    >
      <div className="glass rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-gold/10 h-full flex flex-col hover:border-gold/25 transition-all duration-500">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
            <span className="text-gold font-display text-sm font-semibold">{testimonial.initials}</span>
          </div>
          <div className="flex-1">
            <h4 className="font-display text-lg text-white">{testimonial.name}</h4>
            <p className="text-[10px] sm:text-xs font-body tracking-[0.15em] uppercase text-gold/60">{testimonial.title}</p>
          </div>
        </div>

        {/* Rating */}
        <div className="mb-4">
          <StarRating rating={testimonial.rating} />
        </div>

        {/* Quote */}
        <blockquote className="flex-1">
          <p className="font-body font-light text-sm sm:text-base text-white/50 leading-relaxed italic">
            "{testimonial.text}"
          </p>
        </blockquote>

        {/* Quote mark accent */}
        <div className="absolute top-4 right-6 text-gold/10 font-display text-6xl leading-none">"</div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const { ref: headerRef, isInView: headerInView } = useInView();
  const { ref: ctaRef, isInView: ctaInView } = useInView();

  const testimonialMessage = encodeURIComponent(
    "Hi Rack N Roll! I'd like to share my experience or inquire about featuring a testimonial on your site."
  );

  return (
    <section id="testimonials" className="relative py-20 sm:py-28 lg:py-36 px-4 sm:px-6 bg-void overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-baize/5 via-transparent to-baize/5 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div
            className={`opacity-0 ${headerInView ? 'animate-fade-up' : ''}`}
            style={{ animationFillMode: 'forwards' }}
          >
            <span className="text-[9px] sm:text-[10px] font-body tracking-[0.4em] sm:tracking-[0.5em] uppercase text-gold/60">
              What Our Members Say
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-white mt-3 sm:mt-4">
              The <span className="text-gold-gradient italic">Voices</span>
            </h2>
            <p className="font-body font-light text-sm sm:text-base text-white/40 mt-4 sm:mt-6 max-w-md sm:max-w-lg mx-auto leading-relaxed px-4">
              From first-time visitors to seasoned professionals, hear why Rack N Roll
              has become Islamabad's most prestigious cue sports destination.
            </p>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} index={i} />
          ))}
        </div>

        {/* Submit Testimonial CTA */}
        <div
          ref={ctaRef}
          className={`text-center mt-12 sm:mt-16 opacity-0 ${ctaInView ? 'animate-fade-up' : ''}`}
          style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}
        >
          <div className="inline-flex flex-col items-center gap-4">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
            <a
              href={`https://wa.me/${SOCIAL_LINKS.whatsappNumber}?text=${testimonialMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-xs sm:text-sm font-body text-gold/60 hover:text-gold transition-colors duration-300"
            >
              <span className="border-b border-gold/30 group-hover:border-gold/60 transition-colors duration-300">
                Have a story to share? Submit your testimonial or inquiry
              </span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
