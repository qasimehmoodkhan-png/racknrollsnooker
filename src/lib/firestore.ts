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
  Timestamp,
  type Firestore
} from 'firebase/firestore';
import { db } from './firebase';

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

export const fallbackTournaments: Tournament[] = [
  {
    id: 'fallback-1',
    title: 'Premier League Cup',
    entryFee: 2500,
    prizePool: 150000,
    date: '2026-09-20',
    status: 'upcoming'
  },
  {
    id: 'fallback-2',
    title: 'Bahria Snooker Showdown',
    entryFee: 3500,
    prizePool: 220000,
    date: '2026-10-05',
    status: 'ongoing'
  }
];

export const fallbackPricing: Pricing[] = [
  { id: 'fallback-pricing-1', category: 'membership', name: 'Silver - The Player', price: 5000, unit: '/month', description: 'Priority booking + 10% discount', isActive: true, order: 1 },
  { id: 'fallback-pricing-2', category: 'membership', name: 'Gold - The Professional', price: 15000, unit: '/month', description: 'Locker + VVIP access', isActive: true, order: 2 },
  { id: 'fallback-pricing-3', category: 'membership', name: 'Platinum - The Royal', price: 35000, unit: '/month', description: '24/7 access + all benefits', isActive: true, order: 3 }
];

const tournamentsCollection = db ? collection(db, 'tournaments') : null;
const pricingCollection = db ? collection(db, 'pricing') : null;

const normalizeDocs = <T>(docs: Array<{ id: string; data: () => Record<string, any> }>): T[] =>
  docs.map((item) => ({
    id: item.id,
    ...item.data()
  })) as T[];

const toSafeArray = <T>(value: T[] | null | undefined): T[] => value ?? [];

export const getTournaments = async (): Promise<Tournament[]> => {
  if (!db || !tournamentsCollection) return fallbackTournaments;

  try {
    const q = query(tournamentsCollection, orderBy('date', 'desc'));
    const snapshot = await getDocs(q);
    const data = normalizeDocs<Tournament>(snapshot.docs);
    return data.length > 0 ? data : fallbackTournaments;
  } catch (error) {
    console.warn('Could not load tournaments from Firestore, using fallback data.', error);
    return fallbackTournaments;
  }
};

export const subscribeTournaments = (callback: (tournaments: Tournament[]) => void) => {
  callback(fallbackTournaments);

  if (!db || !tournamentsCollection) {
    return () => {};
  }

  try {
    const q = query(tournamentsCollection, orderBy('date', 'desc'));
    return onSnapshot(
      q,
      (snapshot) => {
        const tournaments = normalizeDocs<Tournament>(snapshot.docs);
        callback(tournaments.length > 0 ? tournaments : fallbackTournaments);
      },
      (error) => {
        console.warn('Tournament subscription error, using fallback data.', error);
        callback(fallbackTournaments);
      }
    );
  } catch (error) {
    console.warn('Could not subscribe to tournaments.', error);
    return () => {};
  }
};

export const addTournament = async (tournament: Omit<Tournament, 'id' | 'createdAt'>) => {
  if (!db || !tournamentsCollection) return null;

  try {
    return await addDoc(tournamentsCollection, {
      ...tournament,
      createdAt: Timestamp.now()
    });
  } catch (error) {
    console.warn('Could not add tournament to Firestore.', error);
    return null;
  }
};

export const updateTournament = async (id: string, tournament: Partial<Tournament>) => {
  if (!db) return null;

  try {
    const docRef = doc(db, 'tournaments', id);
    return await updateDoc(docRef, tournament);
  } catch (error) {
    console.warn('Could not update tournament in Firestore.', error);
    return null;
  }
};

export const deleteTournament = async (id: string) => {
  if (!db) return null;

  try {
    const docRef = doc(db, 'tournaments', id);
    return await deleteDoc(docRef);
  } catch (error) {
    console.warn('Could not delete tournament from Firestore.', error);
    return null;
  }
};

export const getPricing = async (): Promise<Pricing[]> => {
  if (!db || !pricingCollection) return fallbackPricing;

  try {
    const q = query(pricingCollection, orderBy('order', 'asc'));
    const snapshot = await getDocs(q);
    const data = normalizeDocs<Pricing>(snapshot.docs);
    return data.length > 0 ? data : fallbackPricing;
  } catch (error) {
    console.warn('Could not load pricing from Firestore, using fallback data.', error);
    return fallbackPricing;
  }
};

export const subscribePricing = (callback: (pricing: Pricing[]) => void) => {
  callback(fallbackPricing);

  if (!db || !pricingCollection) {
    return () => {};
  }

  try {
    const q = query(pricingCollection, orderBy('order', 'asc'));
    return onSnapshot(
      q,
      (snapshot) => {
        const pricing = normalizeDocs<Pricing>(snapshot.docs);
        callback( pricing.length > 0 ? pricing : fallbackPricing );
      },
      (error) => {
        console.warn('Pricing subscription error, using fallback data.', error);
        callback(fallbackPricing);
      }
    );
  } catch (error) {
    console.warn('Could not subscribe to pricing.', error);
    return () => {};
  }
};

export const addPricing = async (pricing: Omit<Pricing, 'id'>) => {
  if (!db || !pricingCollection) return null;

  try {
    return await addDoc(pricingCollection, pricing);
  } catch (error) {
    console.warn('Could not add pricing to Firestore.', error);
    return null;
  }
};

export const updatePricing = async (id: string, pricing: Partial<Pricing>) => {
  if (!db) return null;

  try {
    const docRef = doc(db, 'pricing', id);
    return await updateDoc(docRef, pricing);
  } catch (error) {
    console.warn('Could not update pricing in Firestore.', error);
    return null;
  }
};

export const deletePricing = async (id: string) => {
  if (!db) return null;

  try {
    const docRef = doc(db, 'pricing', id);
    return await deleteDoc(docRef);
  } catch (error) {
    console.warn('Could not delete pricing from Firestore.', error);
    return null;
  }
};

export const initializeDefaultPricing = async () => {
  if (!db || !pricingCollection) return;

  try {
    const existing = await getPricing();
    if (existing.length === 0 || existing.every((item) => item.id?.startsWith('fallback-'))) {
      const defaults: Omit<Pricing, 'id'>[] = [
        { category: 'hourly', name: 'Standard Table', price: 500, unit: '/hour', description: 'Regular snooker table', isActive: true, order: 1 },
        { category: 'hourly', name: 'Tournament Table', price: 800, unit: '/hour', description: 'Professional grade table', isActive: true, order: 2 },
        { category: 'hourly', name: 'VVIP Suite', price: 1500, unit: '/hour', description: 'Private room with premium service', isActive: true, order: 3 },
        { category: 'membership', name: 'Silver - The Player', price: 5000, unit: '/month', description: 'Priority booking + 10% discount', isActive: true, order: 4 },
        { category: 'membership', name: 'Gold - The Professional', price: 15000, unit: '/month', description: 'Locker + VVIP access', isActive: true, order: 5 },
        { category: 'membership', name: 'Platinum - The Royal', price: 35000, unit: '/month', description: '24/7 access + all benefits', isActive: true, order: 6 }
      ];

      for (const item of defaults) {
        await addPricing(item);
      }
    }
  } catch (error) {
    console.warn('Default pricing initialization failed.', error);
  }
};
