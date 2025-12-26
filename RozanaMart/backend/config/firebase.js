const firebase = require('firebase/app');
require('firebase/database');

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "AIzaSyAihxHDAeJbL2pGiVS4-XHLK9XS0EHJ6RM",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "auto-call-app-1a6d6.firebaseapp.com",
  databaseURL: process.env.FIREBASE_DATABASE_URL || "https://auto-call-app-1a6d6-default-rtdb.firebaseio.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "auto-call-app-1a6d6",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "auto-call-app-1a6d6.firebasestorage.app",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "248368014952",
  appId: process.env.FIREBASE_APP_ID || "1:248368014952:web:5d02e2a71c15f031863ddd",
};

// Initialize Firebase
try {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    console.log('✅ Firebase initialized');
  }
} catch (error) {
  console.error('Firebase initialization error:', error.message);
}

// Get Database Reference
const database = firebase.database();

module.exports = { firebase, database };
