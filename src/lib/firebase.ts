import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const defaultFirebaseConfig = {
  apiKey: 'AIzaSyB-nx2z9fcldYCFQM65YqbQTZFeRtUzEjE',
  authDomain: 'rack-and-roll-snooker.firebaseapp.com',
  projectId: 'rack-and-roll-snooker',
  storageBucket: 'rack-and-roll-snooker.firebasestorage.app',
  messagingSenderId: '413263170047',
  appId: '1:413263170047:web:dc045850eff0d323383fca',
  measurementId: 'G-V2K30302VF'
};

const getFirebaseConfig = () => {
  if (typeof window !== 'undefined' && window.__RACK_N_ROLL_FIREBASE_CONFIG__) {
    return window.__RACK_N_ROLL_FIREBASE_CONFIG__;
  }

  return defaultFirebaseConfig;
};

let app;
try {
  app = getApps().length ? getApp() : initializeApp(getFirebaseConfig());
} catch (error) {
  console.warn('Firebase app initialization failed, using fallback config.', error);
  app = initializeApp(defaultFirebaseConfig);
}

export const db = (() => {
  try {
    return getFirestore(app);
  } catch (error) {
    console.warn('Firebase Firestore failed to initialize.', error);
    return null;
  }
})();

export const firebaseReady = Boolean(db);

export default app;
