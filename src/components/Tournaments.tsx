import { useState, useEffect } from 'react';
import { useInView } from '../hooks/useInView';
import { Tournament, subscribeTournaments } from '../lib/firestore';

const WHATSAPP_NUMBER = '923219696969';

export default function Tournaments() {
  const { ref: headerRef, isInView: headerInView } = useInView();
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeTournaments((data) => {
      const activeTournaments = (data ?? []).filter((t) => t.status === 'upcoming' || t.status === 'ongoing');
      setTournaments(activeTournaments);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const getStatusBadge = (status: Tournament['status']) => {
    switch (status) {
      case 'upcoming':
        return { bg: 'bg-blue-500/20', text: 'text-blue-400', label: 'Upcoming' };
      case 'ongoing':
        return { bg: 'bg-green-500/20', text: 'text-green-400', label: 'Live Now' };
      default:
        return { bg: 'bg-gray-500/20', text: 'text-gray-400', label: status };
    }
  };

  const handleRegister = (tournament: Tournament) => {
    const message = encodeURIComponent(
      `Hi! I'd like to register for the tournament:\n\n` +
      `🏆 ${tournament.title}\n` +
      `📅 Date: ${new Date(tournament.date).toLocaleDateString()}\n` +
      `🎫 Entry Fee: PKR ${tournament.entryFee.toLocaleString()}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  if (loading) {
    return (
      <section className="py-20 sm:py-28 lg:py-36 px-4 sm:px-6 bg-void">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-white/5 rounded w-48 mx-auto mb-4"></div>
            <div className="h-12 bg-white/5 rounded w-64 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  // If no tournaments, don't render the section
  if (tournaments.length === 0) {
    return null;
  }

  return (
    <section id="tournaments" className="relative py-20 sm:py-28 lg:py-36 px-4 sm:px-6 bg-void overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-baize/10 via-transparent to-baize/10 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div
            className={`opacity-0 ${headerInView ? 'animate-fade-up' : ''}`}
            style={{ animationFillMode: 'forwards' }}
          >
            <span className="text-[9px] sm:text-[10px] font-body tracking-[0.4em] sm:tracking-[0.5em] uppercase text-gold/60">
              Compete With The Best
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-white mt-3 sm:mt-4">
              Live <span className="text-gold-gradient italic">Tournaments</span>
            </h2>
            <p className="font-body font-light text-sm sm:text-base text-white/40 mt-4 sm:mt-6 max-w-md sm:max-w-lg mx-auto leading-relaxed px-4">
              Test your skills against the finest players. Register now and claim your spot.
            </p>
          </div>
        </div>

        {/* Tournament Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tournaments.map((tournament, index) => {
            const status = getStatusBadge(tournament.status);
            const { ref, isInView } = useInView(0.1);
            
            return (
              <div
                key={tournament.id}
                ref={ref}
                className={`opacity-0 ${isInView ? 'animate-fade-up' : ''}`}
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                <div className="glass rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-gold/10 hover:border-gold/30 transition-all duration-500 h-full flex flex-col">
                  {/* Status Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] sm:text-xs uppercase tracking-wider ${status.bg} ${status.text}`}>
                      {status.label}
                    </span>
                    <span className="text-white/30 text-xs">
                      {new Date(tournament.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>

                  {/* Tournament Title */}
                  <h3 className="font-display text-2xl sm:text-3xl text-white mb-4">{tournament.title}</h3>

                  {/* Details */}
                  <div className="space-y-3 mb-6 flex-1">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                        <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[10px] text-white/40 uppercase tracking-wider">Entry Fee</p>
                        <p className="text-lg font-display text-white">PKR {tournament.entryFee.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                        <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[10px] text-white/40 uppercase tracking-wider">Prize Pool</p>
                        <p className="text-lg font-display text-gold">PKR {tournament.prizePool.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => handleRegister(tournament)}
                    className={`w-full py-3 sm:py-4 rounded-lg text-xs font-body tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
                      tournament.status === 'ongoing'
                        ? 'bg-green-500/20 border border-green-500/30 text-green-400 hover:bg-green-500/30'
                        : 'bg-gold text-void hover:bg-gold-light'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    {tournament.status === 'ongoing' ? 'Join Now' : 'Register via WhatsApp'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
