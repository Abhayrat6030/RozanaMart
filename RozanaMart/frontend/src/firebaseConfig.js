import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAihxHDAeJbL2pGiVS4-XHLK9XS0EHJ6RM",
  authDomain: "auto-call-app-1a6d6.firebaseapp.com",
  databaseURL: "https://auto-call-app-1a6d6-default-rtdb.firebaseio.com",
  projectId: "auto-call-app-1a6d6",
  storageBucket: "auto-call-app-1a6d6.firebasestorage.app",
  messagingSenderId: "248368014952",
  appId: "1:248368014952:web:5d02e2a71c15f031863ddd",
  measurementId: "G-P6N8NF1S9T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase services
export const auth = getAuth(app);
export const database = getDatabase(app);

export default app;
