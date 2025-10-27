import { initializeApp } from 'firebase/app';
import {
    getAuth,
    onAuthStateChanged,
    signInAnonymously, // Keep for initial load/fallback
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile, // Needed to set display name
    // GoogleAuthProvider, 
    // signInWithPopup   
} from 'firebase/auth';
import {
    getFirestore,
    collection,
    doc,
    addDoc,
    setDoc, // Needed for setting organizer role
    getDoc, // Needed for checking organizer role
    updateDoc,
    deleteDoc,
    onSnapshot,
    query,
    orderBy,
    limit, //
    serverTimestamp
} from 'firebase/firestore';

// --- Firebase Configuration ---
// Your web app's Firebase configuration
// IMPORTANT: Replace with your actual config from Firebase Console
// Store these in a .env.local file (see README)
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// --- Initialize Firebase ---
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// --- Hackathon App ID ---
// Custom ID for namespacing data in Firestore (from .env.local)
const hackathonAppId = process.env.REACT_APP_HACKATHON_APP_ID || 'default-hackathon-app';


// --- Exports ---
// Export the initialized services and necessary functions
export {
    auth,
    db,
    hackathonAppId, // Export the app ID for constructing paths
    // Firestore functions
    collection,
    doc,
    addDoc,
    setDoc,
    getDoc,
    updateDoc,
    deleteDoc,
    onSnapshot,
    query,
    orderBy,
    limit, 
    serverTimestamp,
    // Auth functions
    onAuthStateChanged,
    signInAnonymously, // Keep for potential fallback or initial state
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
};

