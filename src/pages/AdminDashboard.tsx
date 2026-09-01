import { useState, useEffect } from 'react';
import {
  Tournament,
  Pricing,
  subscribeTournaments,
  subscribePricing,
  addTournament,
  updateTournament,
  deleteTournament,
  addPricing,
  updatePricing,
  deletePricing,
  initializeDefaultPricing
} from '../lib/firestore';

const ADMIN_PASSCODE = '1234';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState('');
  const [firebaseBootReady, setFirebaseBootReady] = useState(false);
  
  const [activeTab, setActiveTab] = useState<'tournaments' | 'pricing'>('tournaments');
  
  // Tournaments state
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [tournamentForm, setTournamentForm] = useState<Omit<Tournament, 'id' | 'createdAt'>>({
    title: '',
    entryFee: 0,
    prizePool: 0,
    date: '',
    status: 'upcoming'
  });
  const [editingTournamentId, setEditingTournamentId] = useState<string | null>(null);
  
  // Pricing state
  const [pricing, setPricing] = useState<Pricing[]>([]);
  const [pricingForm, setPricingForm] = useState<Omit<Pricing, 'id'>>({
    category: 'hourly',
    name: '',
    price: 0,
    unit: '/hour',
    description: '',
    isActive: true,
    order: 0
  });
  const [editingPricingId, setEditingPricingId] = useState<string | null>(null);
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setFirebaseBootReady(true);
    }, 3000);

    return () => window.clearTimeout(timer);
  }, []);

  // Subscribe to Firestore updates
  useEffect(() => {
    if (!isAuthenticated) return;
    
    const unsubTournaments = subscribeTournaments(setTournaments);
    const unsubPricing = subscribePricing(setPricing);
    
    // Initialize default pricing if needed
    initializeDefaultPricing();
    
    return () => {
      unsubTournaments();
      unsubPricing();
    };
  }, [isAuthenticated]);

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === ADMIN_PASSCODE) {
      setIsAuthenticated(true);
      setPasscodeError('');
    } else {
      setPasscodeError('Invalid passcode. Access denied.');
    }
  };

  const showMessage = (text: string, type: 'success' | 'error') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  // Tournament handlers
  const handleTournamentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingTournamentId) {
        await updateTournament(editingTournamentId, tournamentForm);
        showMessage('Tournament updated successfully!', 'success');
        setEditingTournamentId(null);
      } else {
        await addTournament(tournamentForm);
        showMessage('Tournament added successfully!', 'success');
      }
      setTournamentForm({ title: '', entryFee: 0, prizePool: 0, date: '', status: 'upcoming' });
    } catch (error) {
      showMessage('Error saving tournament. Please try again.', 'error');
    }
    setLoading(false);
  };

  const handleEditTournament = (tournament: Tournament) => {
    setTournamentForm({
      title: tournament.title,
      entryFee: tournament.entryFee,
      prizePool: tournament.prizePool,
      date: tournament.date,
      status: tournament.status
    });
    setEditingTournamentId(tournament.id || null);
  };

  const handleDeleteTournament = async (id: string) => {
    if (!confirm('Are you sure you want to delete this tournament?')) return;
    try {
      await deleteTournament(id);
      showMessage('Tournament deleted successfully!', 'success');
    } catch (error) {
      showMessage('Error deleting tournament.', 'error');
    }
  };

  // Pricing handlers
  const handlePricingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingPricingId) {
        await updatePricing(editingPricingId, pricingForm);
        showMessage('Pricing updated successfully!', 'success');
        setEditingPricingId(null);
      } else {
        const newOrder = pricing.length + 1;
        await addPricing({ ...pricingForm, order: newOrder });
        showMessage('Pricing added successfully!', 'success');
      }
      setPricingForm({ category: 'hourly', name: '', price: 0, unit: '/hour', description: '', isActive: true, order: 0 });
    } catch (error) {
      showMessage('Error saving pricing. Please try again.', 'error');
    }
    setLoading(false);
  };

  const handleEditPricing = (item: Pricing) => {
    setPricingForm({
      category: item.category,
      name: item.name,
      price: item.price,
      unit: item.unit,
      description: item.description || '',
      isActive: item.isActive,
      order: item.order
    });
    setEditingPricingId(item.id || null);
  };

  const handleDeletePricing = async (id: string) => {
    if (!confirm('Are you sure you want to delete this pricing item?')) return;
    try {
      await deletePricing(id);
      showMessage('Pricing deleted successfully!', 'success');
    } catch (error) {
      showMessage('Error deleting pricing.', 'error');
    }
  };

  // Passcode screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-void flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="glass rounded-2xl p-8 border border-gold/20">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full border border-gold/30 flex items-center justify-center mx-auto mb-4">
                <span className="text-gold font-display text-2xl font-bold">R</span>
              </div>
              <h1 className="font-display text-3xl text-white">Admin Access</h1>
              <p className="font-body text-sm text-white/40 mt-2">Enter passcode to continue</p>
            </div>
            
            <form onSubmit={handlePasscodeSubmit}>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode"
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-4 text-center text-lg font-body text-white placeholder-white/20 focus:border-gold/40 focus:outline-none transition-colors tracking-[0.5em]"
                autoFocus
              />
              {passcodeError && (
                <p className="text-red-400 text-sm text-center mt-3">{passcodeError}</p>
              )}
              <button
                type="submit"
                className="w-full mt-6 py-4 bg-gold text-void font-body text-sm tracking-widest uppercase rounded-lg hover:bg-gold-light transition-all"
              >
                Unlock Dashboard
              </button>
            </form>
            
            <a
              href="/"
              className="block text-center mt-6 text-sm text-white/30 hover:text-gold transition-colors"
            >
              ← Back to Website
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-void">
      {/* Header */}
      <header className="border-b border-white/[0.06] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center">
              <span className="text-gold font-display font-bold">R</span>
            </div>
            <div>
              <h1 className="font-display text-xl text-white">Admin Dashboard</h1>
              <p className="text-[10px] text-gold/50 tracking-widest uppercase">Rack N Roll Management</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {!firebaseBootReady && (
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-gold">
                <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
                Syncing
              </div>
            )}
            <a
              href="/"
              className="px-4 py-2 border border-gold/30 rounded-lg text-gold text-xs tracking-widest uppercase hover:bg-gold/10 transition-all"
            >
              View Site
            </a>
          </div>
        </div>
      </header>

      {/* Message Toast */}
      {message.text && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg text-sm font-body animate-fade-in ${
          message.type === 'success' ? 'bg-green-500/20 border border-green-500/30 text-green-400' : 'bg-red-500/20 border border-red-500/30 text-red-400'
        }`}>
          {message.text}
        </div>
      )}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab('tournaments')}
            className={`px-6 py-3 rounded-lg font-body text-sm tracking-wider uppercase transition-all ${
              activeTab === 'tournaments'
                ? 'bg-gold text-void'
                : 'border border-gold/30 text-gold hover:bg-gold/10'
            }`}
          >
            Tournaments
          </button>
          <button
            onClick={() => setActiveTab('pricing')}
            className={`px-6 py-3 rounded-lg font-body text-sm tracking-wider uppercase transition-all ${
              activeTab === 'pricing'
                ? 'bg-gold text-void'
                : 'border border-gold/30 text-gold hover:bg-gold/10'
            }`}
          >
            Pricing & Rates
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Panel */}
          <div className="lg:col-span-1">
            <div className="glass rounded-xl p-6 border border-gold/10 sticky top-8">
              {activeTab === 'tournaments' ? (
                <>
                  <h2 className="font-display text-xl text-white mb-6">
                    {editingTournamentId ? 'Edit Tournament' : 'Add Tournament'}
                  </h2>
                  <form onSubmit={handleTournamentSubmit} className="space-y-4">
                    <div>
                      <label className="text-[10px] font-body tracking-widest uppercase text-white/40 block mb-2">Title</label>
                      <input
                        type="text"
                        value={tournamentForm.title}
                        onChange={(e) => setTournamentForm({ ...tournamentForm, title: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-sm font-body text-white focus:border-gold/40 focus:outline-none"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-body tracking-widest uppercase text-white/40 block mb-2">Entry Fee (PKR)</label>
                        <input
                          type="number"
                          value={tournamentForm.entryFee}
                          onChange={(e) => setTournamentForm({ ...tournamentForm, entryFee: Number(e.target.value) })}
                          className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-sm font-body text-white focus:border-gold/40 focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-body tracking-widest uppercase text-white/40 block mb-2">Prize Pool (PKR)</label>
                        <input
                          type="number"
                          value={tournamentForm.prizePool}
                          onChange={(e) => setTournamentForm({ ...tournamentForm, prizePool: Number(e.target.value) })}
                          className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-sm font-body text-white focus:border-gold/40 focus:outline-none"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-body tracking-widest uppercase text-white/40 block mb-2">Date</label>
                      <input
                        type="date"
                        value={tournamentForm.date}
                        onChange={(e) => setTournamentForm({ ...tournamentForm, date: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-sm font-body text-white focus:border-gold/40 focus:outline-none [color-scheme:dark]"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-body tracking-widest uppercase text-white/40 block mb-2">Status</label>
                      <select
                        value={tournamentForm.status}
                        onChange={(e) => setTournamentForm({ ...tournamentForm, status: e.target.value as Tournament['status'] })}
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-sm font-body text-white focus:border-gold/40 focus:outline-none appearance-none"
                      >
                        <option value="upcoming" className="bg-void">Upcoming</option>
                        <option value="ongoing" className="bg-void">Ongoing</option>
                        <option value="completed" className="bg-void">Completed</option>
                        <option value="cancelled" className="bg-void">Cancelled</option>
                      </select>
                    </div>
                    <div className="flex gap-3 pt-4">
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 py-3 bg-gold text-void font-body text-xs tracking-widest uppercase rounded-lg hover:bg-gold-light transition-all disabled:opacity-50"
                      >
                        {loading ? 'Saving...' : editingTournamentId ? 'Update' : 'Add Tournament'}
                      </button>
                      {editingTournamentId && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingTournamentId(null);
                            setTournamentForm({ title: '', entryFee: 0, prizePool: 0, date: '', status: 'upcoming' });
                          }}
                          className="px-4 py-3 border border-white/20 text-white/60 font-body text-xs tracking-widest uppercase rounded-lg hover:border-white/40 transition-all"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <h2 className="font-display text-xl text-white mb-6">
                    {editingPricingId ? 'Edit Pricing' : 'Add Pricing'}
                  </h2>
                  <form onSubmit={handlePricingSubmit} className="space-y-4">
                    <div>
                      <label className="text-[10px] font-body tracking-widest uppercase text-white/40 block mb-2">Category</label>
                      <select
                        value={pricingForm.category}
                        onChange={(e) => setPricingForm({ ...pricingForm, category: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-sm font-body text-white focus:border-gold/40 focus:outline-none appearance-none"
                      >
                        <option value="hourly" className="bg-void">Hourly Rates</option>
                        <option value="membership" className="bg-void">Membership</option>
                        <option value="vip" className="bg-void">VIP Services</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-body tracking-widest uppercase text-white/40 block mb-2">Name</label>
                      <input
                        type="text"
                        value={pricingForm.name}
                        onChange={(e) => setPricingForm({ ...pricingForm, name: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-sm font-body text-white focus:border-gold/40 focus:outline-none"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-body tracking-widest uppercase text-white/40 block mb-2">Price (PKR)</label>
                        <input
                          type="number"
                          value={pricingForm.price}
                          onChange={(e) => setPricingForm({ ...pricingForm, price: Number(e.target.value) })}
                          className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-sm font-body text-white focus:border-gold/40 focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-body tracking-widest uppercase text-white/40 block mb-2">Unit</label>
                        <select
                          value={pricingForm.unit}
                          onChange={(e) => setPricingForm({ ...pricingForm, unit: e.target.value })}
                          className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-sm font-body text-white focus:border-gold/40 focus:outline-none appearance-none"
                        >
                          <option value="/hour" className="bg-void">/hour</option>
                          <option value="/day" className="bg-void">/day</option>
                          <option value="/month" className="bg-void">/month</option>
                          <option value="/session" className="bg-void">/session</option>
                          <option value="one-time" className="bg-void">One-time</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-body tracking-widest uppercase text-white/40 block mb-2">Description</label>
                      <input
                        type="text"
                        value={pricingForm.description}
                        onChange={(e) => setPricingForm({ ...pricingForm, description: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-sm font-body text-white focus:border-gold/40 focus:outline-none"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="isActive"
                        checked={pricingForm.isActive}
                        onChange={(e) => setPricingForm({ ...pricingForm, isActive: e.target.checked })}
                        className="w-4 h-4 accent-gold"
                      />
                      <label htmlFor="isActive" className="text-sm text-white/60">Active</label>
                    </div>
                    <div className="flex gap-3 pt-4">
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 py-3 bg-gold text-void font-body text-xs tracking-widest uppercase rounded-lg hover:bg-gold-light transition-all disabled:opacity-50"
                      >
                        {loading ? 'Saving...' : editingPricingId ? 'Update' : 'Add Pricing'}
                      </button>
                      {editingPricingId && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingPricingId(null);
                            setPricingForm({ category: 'hourly', name: '', price: 0, unit: '/hour', description: '', isActive: true, order: 0 });
                          }}
                          className="px-4 py-3 border border-white/20 text-white/60 font-body text-xs tracking-widest uppercase rounded-lg hover:border-white/40 transition-all"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>

          {/* List Panel */}
          <div className="lg:col-span-2">
            {activeTab === 'tournaments' ? (
              <div className="space-y-4">
                <h2 className="font-display text-2xl text-white mb-4">All Tournaments</h2>
                {tournaments.length === 0 ? (
                  <div className="glass rounded-xl p-8 border border-white/[0.06] text-center">
                    <p className="text-white/40">No tournaments yet. Add your first tournament!</p>
                  </div>
                ) : (
                  tournaments.map((tournament) => (
                    <div
                      key={tournament.id}
                      className="glass rounded-xl p-6 border border-white/[0.06] hover:border-gold/20 transition-all"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-display text-xl text-white">{tournament.title}</h3>
                            <span className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider ${
                              tournament.status === 'upcoming' ? 'bg-blue-500/20 text-blue-400' :
                              tournament.status === 'ongoing' ? 'bg-green-500/20 text-green-400' :
                              tournament.status === 'completed' ? 'bg-gray-500/20 text-gray-400' :
                              'bg-red-500/20 text-red-400'
                            }`}>
                              {tournament.status}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-white/50">
                            <span>📅 {new Date(tournament.date).toLocaleDateString()}</span>
                            <span>🎫 Entry: PKR {tournament.entryFee.toLocaleString()}</span>
                            <span>🏆 Prize: PKR {tournament.prizePool.toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditTournament(tournament)}
                            className="p-2 border border-gold/30 rounded-lg text-gold hover:bg-gold/10 transition-all"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => tournament.id && handleDeleteTournament(tournament.id)}
                            className="p-2 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/10 transition-all"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <h2 className="font-display text-2xl text-white mb-4">All Pricing</h2>
                {pricing.length === 0 ? (
                  <div className="glass rounded-xl p-8 border border-white/[0.06] text-center">
                    <p className="text-white/40">No pricing items yet. Add your first item!</p>
                  </div>
                ) : (
                  pricing.map((item) => (
                    <div
                      key={item.id}
                      className={`glass rounded-xl p-6 border transition-all ${
                        item.isActive ? 'border-white/[0.06] hover:border-gold/20' : 'border-red-500/10 opacity-60'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-display text-xl text-white">{item.name}</h3>
                            <span className="px-2 py-0.5 rounded text-[10px] uppercase tracking-wider bg-gold/20 text-gold">
                              {item.category}
                            </span>
                            {!item.isActive && (
                              <span className="px-2 py-0.5 rounded text-[10px] uppercase tracking-wider bg-red-500/20 text-red-400">
                                Inactive
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm">
                            <span className="text-gold font-display text-xl">PKR {item.price.toLocaleString()}<span className="text-white/30 text-sm">{item.unit}</span></span>
                            {item.description && <span className="text-white/40">• {item.description}</span>}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditPricing(item)}
                            className="p-2 border border-gold/30 rounded-lg text-gold hover:bg-gold/10 transition-all"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => item.id && handleDeletePricing(item.id)}
                            className="p-2 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/10 transition-all"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
