import { 
  collection, 
  doc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  orderBy,
  onSnapshot,
  Timestamp
} from 'firebase/firestore';
import { db } from './firebase';

// Types
export interface Tournament {
  id?: string;
  title: string;
  entryFee: number;
  prizePool: number;
  date: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  createdAt?: Timestamp;
}

export interface Pricing {
  id?: string;
  category: string;
  name: string;
  price: number;
  unit: string;
  description?: string;
  isActive: boolean;
  order: number;
}

// Collection references
const tournamentsCollection = collection(db, 'tournaments');
const pricingCollection = collection(db, 'pricing');

// Tournament functions
export const getTournaments = async (): Promise<Tournament[]> => {
  const q = query(tournamentsCollection, orderBy('date', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Tournament[];
};

export const subscribeTournaments = (callback: (tournaments: Tournament[]) => void) => {
  const q = query(tournamentsCollection, orderBy('date', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const tournaments = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Tournament[];
    callback(tournaments);
  });
};

export const addTournament = async (tournament: Omit<Tournament, 'id' | 'createdAt'>) => {
  return await addDoc(tournamentsCollection, {
    ...tournament,
    createdAt: Timestamp.now()
  });
};

export const updateTournament = async (id: string, tournament: Partial<Tournament>) => {
  const docRef = doc(db, 'tournaments', id);
  return await updateDoc(docRef, tournament);
};

export const deleteTournament = async (id: string) => {
  const docRef = doc(db, 'tournaments', id);
  return await deleteDoc(docRef);
};

// Pricing functions
export const getPricing = async (): Promise<Pricing[]> => {
  const q = query(pricingCollection, orderBy('order', 'asc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Pricing[];
};

export const subscribePricing = (callback: (pricing: Pricing[]) => void) => {
  const q = query(pricingCollection, orderBy('order', 'asc'));
  return onSnapshot(q, (snapshot) => {
    const pricing = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Pricing[];
    callback(pricing);
  });
};

export const addPricing = async (pricing: Omit<Pricing, 'id'>) => {
  return await addDoc(pricingCollection, pricing);
};

export const updatePricing = async (id: string, pricing: Partial<Pricing>) => {
  const docRef = doc(db, 'pricing', id);
  return await updateDoc(docRef, pricing);
};

export const deletePricing = async (id: string) => {
  const docRef = doc(db, 'pricing', id);
  return await deleteDoc(docRef);
};

// Initialize default pricing data if empty
export const initializeDefaultPricing = async () => {
  const existing = await getPricing();
  if (existing.length === 0) {
    const defaults: Omit<Pricing, 'id'>[] = [
      { category: 'hourly', name: 'Standard Table', price: 500, unit: '/hour', description: 'Regular snooker table', isActive: true, order: 1 },
      { category: 'hourly', name: 'Tournament Table', price: 800, unit: '/hour', description: 'Professional grade table', isActive: true, order: 2 },
      { category: 'hourly', name: 'VVIP Suite', price: 1500, unit: '/hour', description: 'Private room with premium service', isActive: true, order: 3 },
      { category: 'membership', name: 'Silver - The Player', price: 5000, unit: '/month', description: 'Priority booking + 10% discount', isActive: true, order: 4 },
      { category: 'membership', name: 'Gold - The Professional', price: 15000, unit: '/month', description: 'Locker + VVIP access', isActive: true, order: 5 },
      { category: 'membership', name: 'Platinum - The Royal', price: 35000, unit: '/month', description: '24/7 access + all benefits', isActive: true, order: 6 },
    ];
    
    for (const item of defaults) {
      await addPricing(item);
    }
  }
};
