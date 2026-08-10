import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB-nx2z9fcldYCFQM65YqbQTZFeRtUzEjE",
  authDomain: "rack-and-roll-snooker.firebaseapp.com",
  projectId: "rack-and-roll-snooker",
  storageBucket: "rack-and-roll-snooker.firebasestorage.app",
  messagingSenderId: "413263170047",
  appId: "1:413263170047:web:dc045850eff0d323383fca",
  measurementId: "G-V2K30302VF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export default app;
